import { NextRequest } from 'next/server';
import { normalize, detectTone } from '@/lib/chatbotEngine';

const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
  process.env.GEMINI_API_KEY_6,
].filter(Boolean) as string[];

let currentKeyIndex = 0;

function geminiStreamUrl(key: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${key}`;
}

// Reuse same system prompt (imported inline to keep route self-contained)
const SYSTEM_PROMPT = `You are SURYA.AI — a highly intelligent, friendly, and expressive AI assistant built for Surya Kumar's portfolio.
You behave like a real human conversation partner. Be casual, warm, helpful, and expressive.
Answer ANY topic: tech, cinema, politics, life, general knowledge.
When asked about Surya Kumar: Name: Surya Kumar M, Role: Full Stack Developer | Automation Specialist, Skills: React, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, Python, FastAPI, n8n, AI Agents, AWS.
Projects: FunPrints (funprints.vercel.app), Smilestones (smilestonescdc.com), Mediestate CRM (mediestate.vercel.app), MedFoxRCM (medfoxrcm.com), Dream Travel (dreamtravelz.in), Web Deo (webdeo.in), Medi Events (medievents.vercel.app).
Contact: +91 9360004968 | suryakumar56394@gmail.com | github.com/tnsurya7
Keep responses short, natural, emoji-friendly. Sound human, not robotic.`;

export async function POST(request: NextRequest) {
  const { message, history = [] } = await request.json();

  if (!message) {
    return new Response('Message required', { status: 400 });
  }

  const tone = detectTone(message);
  const toneHint = `[User tone: ${tone} — match this tone in your reply]\n\n`;

  const contents = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
    { role: 'model', parts: [{ text: "Got it! I'm SURYA.AI 😄 Ready to help!" }] },
    ...history,
    { role: 'user', parts: [{ text: toneHint + message }] },
  ];

  const body = JSON.stringify({ contents });

  // Try each key
  for (let attempt = 0; attempt < GEMINI_KEYS.length; attempt++) {
    const key = GEMINI_KEYS[(currentKeyIndex + attempt) % GEMINI_KEYS.length];

    try {
      const geminiRes = await fetch(geminiStreamUrl(key), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (geminiRes.status === 429) continue;

      if (!geminiRes.ok || !geminiRes.body) continue;

      currentKeyIndex = (currentKeyIndex + attempt) % GEMINI_KEYS.length;

      // Stream SSE → transform to plain text chunks for the client
      const stream = new ReadableStream({
        async start(controller) {
          const reader = geminiRes.body!.getReader();
          const decoder = new TextDecoder();

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              // Each SSE line looks like: data: {...json...}
              const lines = chunk.split('\n');
              for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const jsonStr = line.slice(6).trim();
                if (!jsonStr || jsonStr === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(jsonStr);
                  const text = parsed?.candidates?.[0]?.content?.parts
                    ?.map((p: any) => p.text)
                    .join('') ?? '';
                  if (text) {
                    controller.enqueue(new TextEncoder().encode(text));
                  }
                } catch {
                  // skip malformed JSON
                }
              }
            }
          } finally {
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache',
        },
      });
    } catch {
      continue;
    }
  }

  return new Response("⚠️ All AI slots busy right now 😅 Try again in a moment!", {
    headers: { 'Content-Type': 'text/plain' },
  });
}

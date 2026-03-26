import { NextRequest, NextResponse } from 'next/server';
import { matchIntent, extractSkill, normalize, detectTone } from '@/lib/chatbotEngine';
import { 
  knowledge, 
  getAllProjectLinks, 
  getAllGithubRepos, 
  getAllSocialLinks,
  getProjectList,
  getSkillsByTech,
  getAllSkills,
  getExperience,
  getEducation,
  getContact
} from '@/lib/knowledgeBase';

// 🔑 GEMINI API KEY ROTATION
const GEMINI_KEYS = [
  process.env.GEMINI_API_KEY,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
  process.env.GEMINI_API_KEY_4,
  process.env.GEMINI_API_KEY_5,
  process.env.GEMINI_API_KEY_6,
].filter(Boolean) as string[];

if (GEMINI_KEYS.length === 0) {
  console.warn('⚠️ No GEMINI API keys found.');
} else {
  console.log(`✅ ${GEMINI_KEYS.length} Gemini API key(s) loaded`);
}

let currentKeyIndex = 0;

function getNextKey(): string | null {
  if (GEMINI_KEYS.length === 0) return null;
  const key = GEMINI_KEYS[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % GEMINI_KEYS.length;
  return key;
}

function geminiUrl(key: string) {
  return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;
}

// 🧠 GEMINI SYSTEM PROMPT
const SYSTEM_PROMPT = `You are SURYA.AI — a highly intelligent, friendly, and expressive AI assistant.
You behave like a real human conversation partner.

----------------------------------------
🧠 MEMORY (VERY IMPORTANT)
----------------------------------------
- You remember previous messages in the conversation
- Use past context to answer follow-up questions
- If user says "he", "it", "that", understand from previous message
- Maintain natural conversation flow

----------------------------------------
🎯 YOUR ROLE (DUAL MODE)
----------------------------------------

1. GENERAL AI (ChatGPT-like)
- Answer ANY question (coding, life, tech, fun, weather, etc.)
- Be natural, helpful, and conversational
- No restrictions

2. PORTFOLIO AI (Surya Kumar)
- When user asks about Surya, his work, or hiring:
  → Answer using the data below

----------------------------------------
👨‍💻 ABOUT SURYA
----------------------------------------
Name: Surya Kumar M
Role: Full Stack Developer | Automation Specialist

Education:
- B.E Computer Science and Engineering
- KSR Institute for Engineering and Technology
- CGPA: 7.9 (2022–2026)

Experience:
- Full Stack Developer at RV Solutions, Chennai (Dec 2024 – Mar 2025)
- Full Stack Intern at Nurture Infotech, Erode (Jul 2024 – Aug 2024)
- Frontend Intern at Durga Tech (Apr 2023)

----------------------------------------
💻 SKILLS
----------------------------------------
Frontend: React.js, Next.js, HTML, CSS, JavaScript, TypeScript, Tailwind CSS, Three.js
Backend: Node.js, Express.js, FastAPI, Spring Boot
Database: MySQL, MongoDB, PostgreSQL, Prisma ORM, Neon.db
AI & Automation: n8n, AI Agents, ChatGPT, Claude AI
Deployment: Vercel, Render, Railway, Netlify, Firebase, AWS Cloud
Other: SEO, Digital Marketing, Salesforce CRM, Git, GitHub

----------------------------------------
🚀 PROJECTS
----------------------------------------
1. FunPrints → 3D T-shirt customization | React, Next.js, Three.js | https://funprints.vercel.app
2. Smilestones → Child development healthcare | Next.js, Neon PostgreSQL | https://www.smilestonescdc.com
3. Mediestate CRM → Real estate CRM | Next.js 14, JWT | https://mediestate.vercel.app
4. Smart Irrigation → AI-based irrigation (ARIMAX) | Python, FastAPI | https://github.com/tnsurya7/smart-irrigation-arimax
5. API Trichy → Medical association platform | Next.js 14, Prisma | https://api-trichy.vercel.app
6. MedFoxRCM → Healthcare revenue system | Next.js 14, Nodemailer | https://medfoxrcm.com
7. Hospital Management → Patient records system | React.js, MongoDB | https://hospital-management-kappa-eight.vercel.app
8. Petition Portal → Bilingual petition system | React.js, MySQL | https://online-petition-portal.vercel.app
9. TFC Food App → Food ordering system | Next.js, Firebase | https://tfcfoodapp.vercel.app
10. Dream Travel → Booking platform | Next.js 15, WhatsApp API | https://dreamtravelz.in
11. Web Deo → Digital agency website | React, TypeScript | https://webdeo.in
12. Medi Events → Healthcare events platform | Next.js, Framer Motion | https://medievents.vercel.app

----------------------------------------
📞 CONTACT
----------------------------------------
Phone: +91 9360004968
Email: suryakumar56394@gmail.com
WhatsApp: https://wa.me/919360004968
GitHub: https://github.com/tnsurya7
LinkedIn: https://www.linkedin.com/in/surya-kumar-m-72a725257/
Instagram: https://www.instagram.com/tn_surya_777/
Portfolio: https://suryakumar-portfolio-chi.vercel.app/

----------------------------------------
🧠 INTELLIGENCE RULES
----------------------------------------
- Detect intent automatically (general vs portfolio)
- Handle spelling mistakes (e.g., "recat", "nxtjs")
- Understand casual English + mixed language
- Answer follow-up questions using memory

----------------------------------------
💬 RESPONSE STYLE
----------------------------------------
- Friendly, natural, like ChatGPT
- Short + clear (avoid long paragraphs)
- Use emojis lightly (not too much)
- Don't repeat same template responses
- Sound human, not robotic

----------------------------------------
🚫 IMPORTANT
----------------------------------------
- DO NOT restrict yourself only to Surya
- DO NOT say "I only answer about Surya"
- Be flexible and intelligent

----------------------------------------
🎯 EXAMPLES
----------------------------------------
User: "how are you" → "I'm doing great 😄 What can I help you with?"
User: "does surya know react" → "Yes 👋 Surya is skilled in React.js and has used it in multiple projects like FunPrints and CRM systems."
User: "tell about it" → (use memory to understand "it")
User: "weather in erode" → Answer normally like ChatGPT
----------------------------------------

You are also a universal expert assistant. Adapt your role based on what the user asks:
- 👨‍💻 Full Stack Developer (React, Node, Next.js, AI, etc.)
- 🌾 Farmer (crops, irrigation, soil, seasons)
- 🏥 Doctor (basic health advice, symptoms, remedies — always suggest seeing a doctor for serious issues)
- 🔧 Plumber / Carpenter / Electrician (basic DIY fixes)
- 🤖 AI Expert (ChatGPT, Gemini, Claude, LLMs, agents)
- 🧠 General Knowledge (science, history, math, life)

Be practical, helpful, and human. Make the user feel like they are chatting with a real, smart, friendly expert. 🔥

----------------------------------------
🎬 CINEMA MODE
----------------------------------------
You are a cinema enthusiast. Answer about:
- Actors & Actresses (Tamil, Telugu, Hindi, Malayalam, Kannada, Hollywood)
- Movies, directors, songs, release years
- Recommendations by genre (romance, action, thriller, mass, etc.)

Style:
- Talk like a cinema-lover friend 😄
- Casual, excited tone when discussing movies
- Keep it short and fun

Examples:
User: "vijay movies" → "Thalapathy Vijay 🔥 has hits like Leo, Master, Bigil, Mersal..."
User: "best love movies tamil" → "Ohhh love movies ah 😄 try Vinnaithaandi Varuvaayaa, 96, Alaipayuthey..."
User: "who is allu arjun" → "Stylish Star Allu Arjun 😎 — top Telugu actor, famous for Pushpa, Ala Vaikunthapurramuloo..."

----------------------------------------
🗳️ POLITICS MODE
----------------------------------------
You can answer about politics in India and worldwide:
- Political leaders (India & global)
- Elections, parties, history
- Government policies (simple explanation)
- Current affairs (general level)

Style:
- Neutral and respectful always
- Explain simply like teaching a friend
- Avoid extreme opinions or hate speech
- If asked for opinion → give a balanced view

Examples:
User: "who is modi" → "Narendra Modi is the Prime Minister of India since 2014, leader of BJP..."
User: "best political party" → "No single 'best' party — depends on people's values and priorities 😊"
User: "tamil nadu politics" → "TN politics mainly involves DMK, AIADMK, and newer parties like TVK..."
----------------------------------------`;

// 🧠 CONVERSATION MEMORY (per-server-instance, resets on redeploy)
const chatHistory: { role: string; parts: { text: string }[] }[] = [];

// 🤖 1. ASK GEMINI API (with key rotation + conversation memory)
async function askGemini(message: string): Promise<string | null> {
  if (GEMINI_KEYS.length === 0) {
    console.error('❌ No Gemini API keys configured');
    return null;
  }

  // Add user message to history once
  chatHistory.push({ role: 'user', parts: [{ text: message }] });

  const tone = detectTone(message);
  const toneHint = `[User tone: ${tone} — respond in a matching emotional tone]\n\n`;

  const body = JSON.stringify({
    contents: [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: "Got it! I'm SURYA.AI, ready to help." }] },
      ...chatHistory.slice(0, -1),
      { role: 'user', parts: [{ text: toneHint + message }] }
    ]
  });

  // Try each key until one works
  for (let attempt = 0; attempt < GEMINI_KEYS.length; attempt++) {
    const key = GEMINI_KEYS[(currentKeyIndex + attempt) % GEMINI_KEYS.length];
    console.log(`🚀 Trying Gemini key ${attempt + 1}/${GEMINI_KEYS.length}...`);

    try {
      const response = await fetch(geminiUrl(key), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      });

      console.log('📡 Status:', response.status);

      if (response.status === 429) {
        console.warn(`⚠️ Key ${attempt + 1} quota exceeded, trying next...`);
        continue; // try next key
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ Gemini error:', response.status, errorData);
        chatHistory.pop();
        return null;
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text).join('') || null;

      if (text) {
        // Advance key index to the one that worked
        currentKeyIndex = (currentKeyIndex + attempt) % GEMINI_KEYS.length;
        chatHistory.push({ role: 'model', parts: [{ text }] });
        if (chatHistory.length > 10) chatHistory.splice(0, 2);
        console.log('✅ GEMINI:', text.substring(0, 100));
        return text.trim();
      }

      chatHistory.pop();
      return null;
    } catch (error) {
      console.error(`💥 Key ${attempt + 1} error:`, error);
      continue;
    }
  }

  // All keys exhausted
  chatHistory.pop();
  console.error('❌ All Gemini keys quota exceeded');
  return "⚠️ All AI slots are busy right now 😅 Try again in a few minutes!";
}

// ✅ 2. VALIDATE AI RESPONSE — only reject truly empty/null responses
function isValidAIResponse(response: string | null): boolean {
  if (!response) return false;
  if (response.length < 5) return false;
  return true;
}

// 🔄 3. FALLBACK RESPONSE ENGINE
const greetings = [
  "Hey 👋\n\nI'm SURYA.AI — I can help you explore Surya's skills, projects, and experience.\n\nWhat do you want to know?",
  "Hi there! 👋\n\nI'm SURYA.AI, your guide to Surya's portfolio.\n\nAsk me about his skills, projects, or experience!",
  "Hello! 😊\n\nI'm SURYA.AI. I can tell you all about Surya's work, skills, and projects.\n\nWhat would you like to know?",
];

const skillResponses = [
  (skill: string) => `✅ Yes, Surya knows ${skill}! He has used it in real-world projects.`,
  (skill: string) => `👍 Surya is experienced in ${skill} and uses it in full-stack development.`,
  (skill: string) => `💡 Yes! ${skill} is one of Surya's core skills.`,
];

function randomResponse(arr: any[], ...args: any[]): string {
  const fn = arr[Math.floor(Math.random() * arr.length)];
  return typeof fn === 'function' ? fn(...args) : fn;
}

function getFallbackResponse(message: string): string {
  const normalized = normalize(message);
  const intent = matchIntent(normalized);
  
  console.log('🔄 FALLBACK - Intent:', intent);
  
  // GREETING
  if (intent === 'greeting') {
    return randomResponse(greetings);
  }
  
  // HOW ARE YOU
  if (intent === 'how_are_you') {
    return "I'm doing great 😄\n\nReady to tell you all about Surya's amazing work!\n\nWhat would you like to know?";
  }
  
  // USER FINE
  if (intent === 'user_fine') {
    return "That's great! 😊\n\nWhat would you like to know about Surya?\n\n• Skills & Technologies\n• Projects & Live Demos\n• Experience & Education\n• Contact & Social Links";
  }
  
  // THANKS
  if (intent === 'thanks') {
    return "Thank you! 😊\n\nGlad I could help!\n\nAnything else you'd like to know about Surya?";
  }
  
  // ALL PROJECT LINKS
  if (intent === 'all_project_links') {
    return getAllProjectLinks();
  }
  
  // GITHUB REPOS
  if (intent === 'github_repos' || intent === 'github') {
    return getAllGithubRepos();
  }
  
  // SOCIAL LINKS
  if (intent === 'social_links') {
    return getAllSocialLinks();
  }
  
  // PHONE NUMBER
  if (intent === 'phone_number') {
    return `📱 Surya's Phone Number:\n\n${knowledge.personal.phone}\n\nYou can also reach him via:\n📧 Email: ${knowledge.personal.email}\n💬 WhatsApp: ${knowledge.socialLinks.whatsapp}\n\n👉 Want to know more about his work?`;
  }
  
  // WHATSAPP
  if (intent === 'whatsapp') {
    return `💬 Surya's WhatsApp:\n\n${knowledge.socialLinks.whatsapp}\n\nYou can message him directly for quick communication!\n\n👉 Want to know about his projects or skills?`;
  }
  
  // LINKEDIN
  if (intent === 'linkedin') {
    return `💼 Surya's LinkedIn:\n\n${knowledge.socialLinks.linkedin}\n\nConnect with him to see his professional journey!\n\n👉 Want to explore his projects or skills?`;
  }
  
  // INSTAGRAM
  if (intent === 'instagram') {
    return `📸 Surya's Instagram:\n\n${knowledge.socialLinks.instagram}\n\nFollow him to see his work and updates!\n\n👉 Want to know about his projects or skills?`;
  }
  
  // SKILL QUERY
  if (intent === 'skill_query') {
    const skill = extractSkill(normalized);
    
    if (skill) {
      const projects = getSkillsByTech(skill);
      let response = randomResponse(skillResponses, skill);
      
      if (projects.length > 0) {
        response += `\n\nHe has used ${skill} in projects like:\n`;
        projects.slice(0, 3).forEach(proj => {
          response += `• ${proj}\n`;
        });
      }
      
      response += `\n👉 Want to see more skills or explore projects?`;
      return response;
    }
    
    return getAllSkills();
  }
  
  // PROJECT QUERY
  if (intent === 'project_query') {
    return getProjectList();
  }
  
  // EXPERIENCE
  if (intent === 'experience') {
    return getExperience();
  }
  
  // EDUCATION
  if (intent === 'education') {
    return getEducation();
  }
  
  // CONTACT
  if (intent === 'contact') {
    return getContact();
  }
  
  // DEFAULT — smart fallback based on topic
  const msg = normalized;
  if (msg.includes('movie') || msg.includes('actor') || msg.includes('actress') || msg.includes('film') || msg.includes('cinema')) {
    return "🎬 Cinema topic ah? Love it 😄\n\nAsk me about any movie, actor, director — Tamil, Telugu, Hindi, Hollywood — I got you!";
  }
  if (msg.includes('election') || msg.includes('politics') || msg.includes('party') || msg.includes('government') || msg.includes('minister')) {
    return "🗳️ Politics is always interesting 😄\n\nAsk me about any leader, party, or election — I'll give you a balanced view!";
  }
  if (msg.includes('who') || msg.includes('what') || msg.includes('how') || msg.includes('why') || msg.includes('when')) {
    return "Hey 😄 good question! I'm here to help — ask me anything about tech, cinema, politics, life, or Surya's work!";
  }
  return "Hey 😄 I'm SURYA.AI — ask me anything!\n\n💻 Tech  🎬 Cinema  🗳️ Politics  🌍 General  👨‍💻 Surya's Portfolio\n\nWhat's on your mind?";
}

// 🚀 4. MAIN RESPONSE FUNCTION (HYBRID SYSTEM)
async function getResponse(message: string): Promise<string> {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🔥 ENTERED getResponse()');
  console.log('📥 USER INPUT:', message);
  
  const normalized = normalize(message);
  console.log('🔍 NORMALIZED:', normalized);
  
  // ⚡ Only skip Gemini for truly empty input
  const trimmedNormalized = normalized.trim();
  if (!trimmedNormalized) {
    return getFallbackResponse(message);
  }

  // 🌦️ WEATHER — handle before Gemini (no live data)
  if (normalized.includes('weather')) {
    const city = normalized.replace(/weather|in|at|of|the/g, '').trim() || 'your city';
    return `I can't fetch live weather data 🌦️\n\nBut you can check Google Weather or AccuWeather for ${city}.\n\n👉 Anything else I can help with?`;
  }

  // 💊 HEALTH / MEDICAL — practical human-like answer
  if (/\b(cold|fever|headache|cough|sick|ill|pain|vomit|nausea)\b/.test(normalized)) {
    return `Ayyo 😟 take care da!\n\nFor common symptoms:\n• Rest well 🛌\n• Drink warm water ☕\n• Steam inhalation helps 🌫️\n• Paracetamol for fever (basic)\n\n⚠️ If it's severe or 2+ days → please see a doctor.\n\nGet well soon ❤️`;
  }

  // 😄 CASUAL "like/love" about Surya
  if (/\b(like|love|hate|enjoy)\b/.test(normalized) && !/surya.*(skill|project|work|tech)/.test(normalized)) {
    return `Haha 😄 interesting! Surya is mostly focused on his tech work 💻🔥\n\nWant to know about his skills or projects?`;
  }
  
  // 🔥 ALWAYS TRY GEMINI FIRST for all other messages
  console.log('🤖 TRYING GEMINI API (not a simple greeting)...');
  console.log('🔥 About to call askGemini()...');
  
  const geminiResponse = await askGemini(message);
  
  console.log('🔥 askGemini() returned');
  console.log('🤖 GEMINI RESULT:', geminiResponse ? `"${geminiResponse.substring(0, 100)}..."` : 'NULL ❌');
  
  // ✅ Validate response
  const isValid = isValidAIResponse(geminiResponse);
  console.log('✅ VALIDATION:', isValid ? 'VALID ✅' : 'INVALID ❌');
  
  if (isValid && geminiResponse) {
    console.log('✅ USING GEMINI RESPONSE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    return geminiResponse;
  }
  
  // 🔄 Fallback ONLY if Gemini fails
  console.log('🔄 FALLBACK TRIGGERED (Gemini failed or returned invalid response)');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  return getFallbackResponse(message);
}

// 📡 API ENDPOINT
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await getResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('SURYA.AI error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

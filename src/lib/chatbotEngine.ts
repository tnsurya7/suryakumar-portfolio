// 🧠 PRODUCTION-LEVEL CHATBOT ENGINE

// 1. NORMALIZATION ENGINE (Fix typos & variations + Tanglish casual)
export function normalize(msg: string): string {
  return msg
    .toLowerCase()
    .trim()
    // Repeated chars (hiiiii → hi, brooo → bro)
    .replace(/(.)\1{2,}/g, '$1$1')
    // Common typos
    .replace(/rpoject|poject|projct/g, 'project')
    .replace(/recat|raect|reat/g, 'react')
    .replace(/nxtjs|nxt js|next js/g, 'nextjs')
    .replace(/git hub|gthub/g, 'github')
    .replace(/whats app|watsapp/g, 'whatsapp')
    .replace(/lnkdn|linkdin/g, 'linkedin')
    .replace(/insta|instgrm/g, 'instagram')
    .replace(/expericnece|experiance|experince/g, 'experience')
    .replace(/skilz|skils/g, 'skill')
    .replace(/contct|cntact/g, 'contact')
    .replace(/educatn|eductn/g, 'education')
    // Tanglish normalizations
    .replace(/\bmachaa?\b/g, 'macha')
    .replace(/\bennaaa?\b/g, 'enna')
    .replace(/\bbrooo+\b/g, 'bro')
    .replace(/\bdaa?\b/g, 'da')
    .replace(/\bpanra\b/g, 'panra')
    // Short forms
    .replace(/\bhru\b/g, 'how are you')
    .replace(/\bwbu\b/g, 'what about you')
    .replace(/\bidk\b/g, 'i dont know')
    .replace(/\bomg\b/g, 'oh my god')
    .replace(/\blol\b/g, 'haha')
    // Remove extra spaces
    .replace(/\s+/g, ' ')
    .trim();
}

// 2. KEYWORD VARIATIONS (Phrase Expansion)
export const variations = {
  project: ['project', 'projects', 'work', 'works', 'portfolio', 'build', 'builds', 'built', 'made', 'app', 'apps', 'application'],
  link: ['link', 'links', 'url', 'urls', 'website', 'site', 'live', 'demo', 'deployment', 'deployed'],
  skill: ['skill', 'skills', 'tech', 'technology', 'stack', 'know', 'knows', 'familiar', 'experience', 'expertise'],
  social: ['social', 'socials', 'connect', 'follow', 'profile', 'account'],
  github: ['github', 'git', 'repo', 'repository', 'code', 'source'],
  contact: ['contact', 'reach', 'email', 'mail', 'phone', 'call', 'hire', 'hiring'],
  experience: ['experience', 'work', 'job', 'internship', 'company', 'worked', 'working'],
  education: ['education', 'study', 'college', 'university', 'degree', 'cgpa', 'gpa', 'ksr'],
  all: ['all', 'every', 'complete', 'full', 'entire', 'show', 'list', 'give'],
};

// 3. INTENT LIBRARY (Training Dataset)
export const intents = [
  {
    name: 'greeting',
    patterns: ['hi', 'hello', 'hey', 'yo', 'sup', 'hola', 'hii', 'hiii', 'heyy', 'heyyy', 'hai', 'hy'],
    priority: 10,
  },
  {
    name: 'how_are_you',
    patterns: ['how are you', 'how r u', 'whats up', 'wassup', 'how you doing'],
    priority: 9,
  },
  {
    name: 'user_fine',
    patterns: ['im fine', 'im good', 'im ok', 'fine', 'good', 'ok', 'me too', 'same'],
    priority: 9,
  },
  {
    name: 'thanks',
    patterns: ['thank', 'thanks', 'thx', 'appreciate', 'nice', 'great', 'awesome', 'cool', 'super'],
    priority: 8,
  },
  {
    name: 'all_project_links',
    patterns: ['all project link', 'all live url', 'all website', 'all demo', 'project urls', 'all project url'],
    priority: 10,
  },
  {
    name: 'github_repos',
    patterns: ['github repo', 'git repo', 'source code', 'github link', 'all repo', 'code repo'],
    priority: 9,
  },
  {
    name: 'social_links',
    patterns: ['social link', 'social media', 'connect', 'follow', 'profile'],
    priority: 9,
  },
  {
    name: 'phone_number',
    patterns: ['phone', 'number', 'mobile', 'call', 'phone number'],
    priority: 9,
  },
  {
    name: 'whatsapp',
    patterns: ['whatsapp', 'whats app', 'wa'],
    priority: 8,
  },
  {
    name: 'linkedin',
    patterns: ['linkedin', 'linked in'],
    priority: 8,
  },
  {
    name: 'instagram',
    patterns: ['instagram', 'insta'],
    priority: 8,
  },
  {
    name: 'github',
    patterns: ['github', 'git hub'],
    priority: 8,
  },
  {
    name: 'project_query',
    patterns: ['project', 'projects', 'work', 'portfolio', 'built', 'made'],
    priority: 7,
  },
  {
    name: 'skill_query',
    patterns: ['skill', 'tech', 'know', 'familiar', 'stack'],
    priority: 7,
  },
  {
    name: 'experience',
    patterns: ['experience', 'internship', 'company', 'job', 'worked'],
    priority: 7,
  },
  {
    name: 'education',
    patterns: ['education', 'college', 'degree', 'study', 'university'],
    priority: 7,
  },
  {
    name: 'contact',
    patterns: ['contact', 'email', 'hire', 'reach'],
    priority: 7,
  },
];

// 4. SMART INTENT MATCHER
export function matchIntent(msg: string): string {
  const normalized = normalize(msg);
  
  // Sort by priority
  const sortedIntents = [...intents].sort((a, b) => b.priority - a.priority);
  
  // Check exact matches first
  for (const intent of sortedIntents) {
    for (const pattern of intent.patterns) {
      if (normalized === pattern || normalized.includes(pattern)) {
        return intent.name;
      }
    }
  }
  
  // Check keyword combinations
  if (hasWords(normalized, variations.all) && hasWords(normalized, variations.project) && hasWords(normalized, variations.link)) {
    return 'all_project_links';
  }
  
  if (hasWords(normalized, variations.github) && (hasWords(normalized, variations.all) || normalized.includes('repo'))) {
    return 'github_repos';
  }
  
  if (hasWords(normalized, variations.social)) {
    return 'social_links';
  }
  
  if (hasWords(normalized, variations.project)) {
    return 'project_query';
  }
  
  if (hasWords(normalized, variations.skill)) {
    return 'skill_query';
  }
  
  if (hasWords(normalized, variations.experience)) {
    return 'experience';
  }
  
  if (hasWords(normalized, variations.education)) {
    return 'education';
  }
  
  if (hasWords(normalized, variations.contact)) {
    return 'contact';
  }
  
  return 'unknown';
}

// Helper: Check if message contains any word from variations
function hasWords(msg: string, words: string[]): boolean {
  return words.some(word => msg.includes(word));
}

// 5. EXTRACT SPECIFIC ENTITIES (Skills, Projects)
export function extractSkill(msg: string): string | null {
  const normalized = normalize(msg);
  const words = normalized.split(' ');
  
  const skillMap: { [key: string]: string } = {
    'react': 'React.js',
    'reactjs': 'React.js',
    'next': 'Next.js',
    'nextjs': 'Next.js',
    'node': 'Node.js',
    'nodejs': 'Node.js',
    'express': 'Express.js',
    'expressjs': 'Express.js',
    'typescript': 'TypeScript',
    'ts': 'TypeScript',
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'python': 'Python',
    'java': 'Java',
    'html': 'HTML',
    'css': 'CSS',
    'tailwind': 'Tailwind CSS',
    'three': 'Three.js',
    'threejs': 'Three.js',
    'mongodb': 'MongoDB',
    'mongo': 'MongoDB',
    'mysql': 'MySQL',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'fastapi': 'FastAPI',
    'spring': 'Spring Boot',
    'springboot': 'Spring Boot',
    'jwt': 'JWT',
    'prisma': 'Prisma ORM',
    'chatgpt': 'ChatGPT',
    'claude': 'Claude AI',
    'n8n': 'N8N Automation',
    'vercel': 'Vercel',
    'aws': 'AWS Cloud',
    'firebase': 'Firebase',
    'git': 'Git',
    'github': 'GitHub',
  };
  
  for (const word of words) {
    if (skillMap[word]) {
      return skillMap[word];
    }
  }
  
  return null;
}

// 6. CONTEXT MEMORY
export class ChatContext {
  private static lastTopic: string = '';
  private static lastSkill: string = '';
  private static lastProject: string = '';
  
  static setTopic(topic: string) {
    this.lastTopic = topic;
  }
  
  static getTopic(): string {
    return this.lastTopic;
  }
  
  static setSkill(skill: string) {
    this.lastSkill = skill;
  }
  
  static getSkill(): string {
    return this.lastSkill;
  }
  
  static setProject(project: string) {
    this.lastProject = project;
  }
  
  static getProject(): string {
    return this.lastProject;
  }
  
  static reset() {
    this.lastTopic = '';
    this.lastSkill = '';
    this.lastProject = '';
  }
}

// 7. TONE DETECTOR
export function detectTone(msg: string): string {
  const m = msg.toLowerCase();

  if (/feeling low|sad|depressed|lonely|upset|crying|hurt|tired|stressed/.test(m)) return 'emotional';
  if (/\b(bro|da|macha|dei|yaar|yar|anna)\b/.test(m)) return 'casual-tanglish';
  if (/haha|lol|😂|😄|funny|joke|😆/.test(m)) return 'playful';
  if (/\?|how|what|why|when|where|explain|tell me/.test(m)) return 'curious';
  if (/thanks|thank you|thx|appreciate|nice|great|awesome/.test(m)) return 'grateful';
  if (/hi|hello|hey|hii|sup|yo/.test(m)) return 'friendly';

  return 'neutral';
}

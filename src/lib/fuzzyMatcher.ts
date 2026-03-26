import Fuse from 'fuse.js';

// Normalized skills with synonyms for better matching
export const allSkills = [
  'react', 'reactjs', 'recat', 'next', 'nextjs', 'nxtjs', 'node', 'nodejs', 'nde',
  'express', 'expressjs', 'typescript', 'ts', 'javascript', 'js', 'html', 'css',
  'tailwind', 'tailwindcss', 'three', 'threejs', 'mongodb', 'mongo', 'mysql',
  'postgresql', 'postgres', 'fastapi', 'spring', 'springboot', 'jwt', 'prisma',
  'chatgpt', 'claude', 'n8n', 'vercel', 'render', 'railway', 'netlify', 'firebase',
  'aws', 'oracle', 'git', 'github', 'seo', 'crm', 'python', 'java', 'arimax'
];

// Normalized projects
export const allProjects = [
  'smilestones', 'funprints', 'tfc', 'mediestate', 'medievents', 'dreamtravel',
  'webdeo', 'portfolio', 'petition', 'hospital', 'apiTrichy', 'irrigation',
  'whatsapp', 'isc', 'medfox', 'usermanagement'
];

// Skill synonyms mapping
export const skillSynonyms: { [key: string]: string } = {
  'react': 'React.js', 'reactjs': 'React.js', 'recat': 'React.js',
  'next': 'Next.js', 'nextjs': 'Next.js', 'nxtjs': 'Next.js',
  'node': 'Node.js', 'nodejs': 'Node.js', 'nde': 'Node.js',
  'express': 'Express.js', 'expressjs': 'Express.js',
  'typescript': 'TypeScript', 'ts': 'TypeScript',
  'javascript': 'JavaScript', 'js': 'JavaScript',
  'html': 'HTML', 'css': 'CSS',
  'tailwind': 'Tailwind CSS', 'tailwindcss': 'Tailwind CSS',
  'three': 'Three.js', 'threejs': 'Three.js',
  'mongodb': 'MongoDB', 'mongo': 'MongoDB',
  'mysql': 'MySQL',
  'postgresql': 'PostgreSQL', 'postgres': 'PostgreSQL',
  'fastapi': 'FastAPI',
  'spring': 'Spring Boot', 'springboot': 'Spring Boot',
  'jwt': 'JWT',
  'prisma': 'Prisma ORM',
  'chatgpt': 'ChatGPT',
  'claude': 'Claude AI',
  'n8n': 'N8N Automation',
  'vercel': 'Vercel',
  'render': 'Render',
  'railway': 'Railway',
  'netlify': 'Netlify',
  'firebase': 'Firebase',
  'aws': 'AWS Cloud',
  'oracle': 'Oracle',
  'git': 'Git',
  'github': 'GitHub',
  'seo': 'SEO',
  'crm': 'CRM',
  'python': 'Python',
  'java': 'Java',
  'arimax': 'ARIMAX'
};

// Clean user input
export function cleanInput(msg: string): string {
  return msg
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') // remove symbols
    .replace(/\s+/g, ' ')     // remove extra spaces
    .trim();
}

// Extract keywords from message
export function extractKeywords(msg: string): string[] {
  const cleaned = cleanInput(msg);
  return cleaned.split(' ').filter(word => word.length > 1);
}

// Find skill from keywords (word by word)
export function findSkill(message: string): string | null {
  const words = extractKeywords(message);
  const skillsFuse = new Fuse(allSkills, {
    includeScore: true,
    threshold: 0.3, // More strict for better accuracy
  });
  
  for (const word of words) {
    const result = skillsFuse.search(word);
    if (result.length > 0 && result[0].score! < 0.3) {
      const matched = result[0].item;
      return skillSynonyms[matched] || matched;
    }
  }
  
  return null;
}

// Find project from keywords
export function findProject(message: string): string | null {
  const words = extractKeywords(message);
  const projectsFuse = new Fuse(allProjects, {
    includeScore: true,
    threshold: 0.3,
  });
  
  for (const word of words) {
    const result = projectsFuse.search(word);
    if (result.length > 0 && result[0].score! < 0.3) {
      return result[0].item;
    }
  }
  
  return null;
}

// Simple intent detection
export function detectIntent(msg: string): string {
  const cleaned = cleanInput(msg);
  
  // Social links / contact
  if (cleaned.includes('social') || cleaned.includes('link') || cleaned.includes('github') || 
      cleaned.includes('linkedin') || cleaned.includes('instagram') || cleaned.includes('whatsapp') || 
      cleaned.includes('facebook') || cleaned.includes('phone') || cleaned.includes('number')) {
    return 'social';
  }
  
  // Live URLs / Demo links
  if (cleaned.includes('live') || cleaned.includes('url') || cleaned.includes('link') || 
      cleaned.includes('demo') || cleaned.includes('website') || cleaned.includes('site')) {
    return 'live_url';
  }
  
  // Projects
  if (cleaned.includes('project') || cleaned.includes('built') || cleaned.includes('made') || 
      cleaned.includes('work') || cleaned.includes('portfolio') || cleaned.includes('app')) {
    return 'project';
  }
  
  // Skills
  if (cleaned.includes('skill') || cleaned.includes('know') || cleaned.includes('familiar') || 
      cleaned.includes('experience') || cleaned.includes('tech') || cleaned.includes('stack')) {
    return 'skill';
  }
  
  // Education
  if (cleaned.includes('education') || cleaned.includes('study') || cleaned.includes('college') || 
      cleaned.includes('degree') || cleaned.includes('university') || cleaned.includes('ksr')) {
    return 'education';
  }
  
  // Contact
  if (cleaned.includes('contact') || cleaned.includes('email') || cleaned.includes('hire') || 
      cleaned.includes('reach') || cleaned.includes('connect')) {
    return 'contact';
  }
  
  // Experience
  if (cleaned.includes('internship') || cleaned.includes('company') || cleaned.includes('job') || 
      cleaned.includes('work experience') || cleaned.includes('worked')) {
    return 'experience';
  }
  
  return 'general';
}

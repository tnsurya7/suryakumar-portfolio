import { NextRequest, NextResponse } from 'next/server';

// SURYA.AI - Complete Knowledge Base
const knowledge = {
  personal: {
    name: 'Surya Kumar M',
    role: 'Full Stack Developer and AI Engineer',
    phone: '9360004968',
    email: 'suryakumar56394@gmail.com',
  },
  socialLinks: {
    github: 'https://github.com/tnsurya7/',
    linkedin: 'https://www.linkedin.com/in/surya-kumar-m-72a725257/',
    instagram: 'https://www.instagram.com/tn_surya_777/',
    portfolio: 'https://suryakumar-portfolio-chi.vercel.app/',
  },
  skills: {
    frontend: ['Next.js 14', 'Next.js', 'React 18', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Framer Motion', 'HTML5', 'CSS3', 'JavaScript ES6+'],
    backend: ['Node.js', 'Express.js', 'REST APIs', 'FastAPI'],
    database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Prisma ORM'],
    ai: ['ChatGPT', 'Google Studio AI', 'Perplexity AI', 'Kiro AI', 'Blackbox AI', 'GitHub Copilot', 'OpenAI API', 'RAG', 'MCP Server', 'AI Agents', 'n8n automation', 'ARIMAX model'],
    deployment: ['Vercel', 'Render', 'Railway', 'Netlify', 'Supabase', 'Firebase', 'MongoDB Atlas', 'Aiven'],
    os: ['macOS', 'Windows', 'Linux'],
    other: ['Zustand', 'Multer', 'jsPDF', 'JWT', 'Nodemailer', 'Cloudinary', 'Git', 'GitHub'],
  },
  projects: {
    portfolio: {
      name: 'Portfolio Website',
      live: 'https://suryakumar-portfolio-chi.vercel.app/',
      tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Nodemailer'],
      features: ['Premium UI', 'Animations', 'Glassmorphism', 'SMTP contact', 'SEO', 'Analytics', 'SURYA.AI chatbot'],
    },
    petition: {
      name: 'Online Petition Portal (Bilingual English/Tamil)',
      live: 'https://online-petition-portal.vercel.app/',
      tech: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'JWT'],
      features: ['Bilingual UI (English/Tamil)', 'PET000123 auto ID system', 'File uploads', 'Petition tracking', 'Admin dashboard'],
    },
    hospital: {
      name: 'Hospital Management System',
      live: 'https://hospital-management-kappa-eight.vercel.app/',
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      features: ['Patient records', 'Vitals tracking', 'PDF export', 'Search features', 'Appointment management'],
    },
    apiTrichy: {
      name: 'API Tiruchirappalli Chapter - Official Website',
      live: 'https://api-trichy.vercel.app/',
      tech: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Tailwind CSS', 'ShadCN UI', 'Framer Motion'],
      features: ['Events/CME management', 'Photo gallery', 'Leadership profiles', 'Publications', 'Podcasts', 'API TV', 'Clinical Learning', 'CMS admin panel', 'Role-based access', 'Member management', 'News ticker', 'Contact form'],
    },
    aiReminder: {
      name: 'AI Auto Reminder System',
      live: null,
      tech: ['n8n', 'WhatsApp API', 'SMS API', 'Email API', 'Node.js'],
      features: ['n8n workflow automation', 'Multi-channel notifications', 'AI scheduling'],
      note: 'Works internally using n8n workflows for SMS, WhatsApp, and Email reminders.',
    },
    userManagement: {
      name: 'User Management System',
      live: null,
      tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'MySQL', 'Multer'],
      features: ['User registration', 'Login authentication', 'Profile management', 'File uploads'],
      note: 'Can explain architecture, APIs, and database design.',
    },
    iscPrinting: {
      name: 'ISC Textile Report App - Digital Printing Management',
      live: null,
      tech: ['Next.js 13+', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'jsPDF', 'SheetJS', 'Next-PWA'],
      features: ['Smart record management', 'Dashboard & analytics', 'PDF/Excel export', 'PWA installable app', 'Offline support', 'Real-time tracking', 'Date range filters', 'Bulk operations', 'Mobile-first design'],
      note: 'Built for Indian Soft Colours (ISC) - Mr. P. Baskaran. Replaces manual textile printing registers with digital system.',
    },
  },
  education: {
    degree: 'B.E. Computer Science and Engineering',
    institution: 'KSR Institute of Engineering and Technology',
    duration: '2022-2026',
    cgpa: '7.9',
  },
  experience: [
    { company: 'RV Solutions', role: 'Full Stack Developer', duration: 'Dec 2024 - Mar 2025', location: 'Chennai' },
    { company: 'Nurture Infotech', role: 'Full Stack Developer', duration: 'Jul 2024 - Aug 2024', location: 'Erode' },
    { company: 'Durga Tech', role: 'Front-End Developer', duration: 'Apr 2023' },
  ],
};

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase().trim();

  // Positive Feedback / Compliments
  if (lowerMessage.match(/(^super$|^nice$|^good$|^great$|^awesome$|^amazing$|^excellent$|^wonderful$|^fantastic$|^cool$|^wow$|^impressive$|^love it$|^perfect$|^brilliant$|^outstanding$|^adorable$|^agreeable$|^beautiful$|^charming$|^delightful$|^friendly$|^gorgeous$|^kind$|^lovely$|^marvelous$|^marvellous$|^pleasant$|thank you|thanks|thx|thnks|thnx|appreciate|appreciated|well done|good job|nice work|love this|loved it|loving it)/)) {
    return "Thank you! 😊\n\nI'm glad I could help!\n\nFeel free to ask me anything else about Surya's portfolio, projects, or skills.";
  }

  // Greetings
  if (lowerMessage.match(/(^hi$|^hello$|^hey$|^yo$|^sup$|^hola$|^hii$|^hiii+$|^heyy$|^heyyy+$|^helo$|^helloo$|^hlo$|^heloo$|^hye$|^hai$|^hy$|^hyy$|hi surya|hey surya|hello ai|hey bot|hey there|hi there|yo bro|good morning|good afternoon|good evening|^gm$|^ga$|^ge$|how are you|what's up|whats up|wassup|howdy|greetings|^👋$|^🙏$|^🙌$|^😊$|^🙂$|^🤝$|heyyaa)/)) {
    return "Summary: A warm greeting from SURYA.AI.\n\nDetails: Hello! 👋 I'm SURYA.AI, Surya Kumar M's AI assistant. I can help you explore his portfolio, including his skills, projects, experience, and hiring information.\n\nNext step: Try asking about \"skills\", \"projects\", \"certificates\", \"education\", or \"contact\".";
  }

  // Name / Who are you
  if (lowerMessage.match(/^(name|your name|who are you|who is surya)$/)) {
    return "His name is Surya Kumar M.\n\nI am SURYA.AI, the assistant that helps you explore his portfolio.";
  }

  // Phone / Contact
  if (lowerMessage.match(/^(phone|phone number|contact|mobile|call)$/)) {
    return `Phone: ${knowledge.personal.phone}\n\nEmail: ${knowledge.personal.email}`;
  }

  // SECTION NAVIGATION
  // Home Section
  if (lowerMessage.match(/(^home$|^start$|^main$|^top$|^welcome$|go home|back to home|show home|home section)/)) {
    return `Summary: Here is the home section of the portfolio.\n\nDetails: This section introduces Surya as a full stack developer.\n\nNext step: Let me know if you want to explore any project or skill.\n\nscrollToSection("home");`;
  }

  // About Section
  if (lowerMessage.match(/(^about$|^bio$|^profile$|^yourself$|^intro$|^introduction$|about surya|who are you|who is surya|about me)/)) {
    return `Summary: This is Surya's About section.\n\nDetails: It includes his education, internships, and career overview.\n\nNext step: Want to see skills or projects?\n\nscrollToSection("about");`;
  }

  // Education Subsection
  if (lowerMessage.match(/(education|educatn|eductn|^edu$|^edn$|^ed$|study|studies|stud|stdy|college|clg|school|schl|degree|degre|qualification|qualif|cgpa|gpa|academic|academics|acad|acadmic|university|uni|ksr|institute|graduation|graduate)/)) {
    return `Summary: Surya's Education Background.\n\nDetails:\n🎓 B.E. Computer Science and Engineering\nKSR Institute for Engineering and Technology\nCGPA: 7.9 (2022-2026)\n\nNext step: Want to see his internships or certificates?\n\nscrollToSection("education");`;
  }

  // Internships Subsection
  if (lowerMessage.match(/(internship|internships|internshipss|intern|inter|intrn|interns|intership|internsip|experience|experiencee|experiance|experince|^xp$|^exp$|work|wrk|working|workexp|workxp|job|jobs|role|roles|company|companies|companys|employer|employment|rv solutions|nurture|durga|past work|work history|career|professional)/)) {
    return `Summary: Surya's Professional Experience.\n\nDetails:\n1. Full Stack Developer at RV Solutions, Chennai (Dec 2024 - Mar 2025)\n2. Full Stack Developer at Nurture Infotech, Erode (Jul 2024 - Aug 2024)\n3. Front-End Developer at Durga Tech (Apr 2023)\n\nNext step: Want to see his projects or certificates?\n\nscrollToSection("internships");`;
  }

  // Certificates Subsection
  if (lowerMessage.match(/(certificate|certificates|certification|certifications|certi|certy|certify|certified|certfct|certfctn|^crt$|^crtf$|^crtfct$|^crts$|^crtsfctn$|certif|certificat|show cert|achievements|achieve|achivements|badges|badge|award|awards|courses|course|training|credential|credentials|digilabs|hackerrank|microsoft|learnathon|ict)/)) {
    return `Summary: Surya's Certifications.\n\nDetails:\n• JavaScript – Digilabs\n• Java (Basic) – HackerRank\n• Fundamentals of Responsive Generative AI – Microsoft\n• Learnathon 2024 – ICT Academy\n\nNext step: Want to see his skills or projects?\n\nscrollToSection("certificates");`;
  }

  // Skills Subsections
  // Programming Languages
  if (lowerMessage.match(/(languages|language|languges|languag|^lang$|^langs$|programming|programing|proglang|prog lang|code lang|coding|cding|^java$|^jav$|^jva$|^python$|^py$|^pythn$|^pyton$|^c language$|^clang$|^c$)/)) {
    return `Summary: Surya's Programming Languages.\n\nDetails:\n• Java (90%)\n• Python (80%)\n• C (70%)\n\nNext step: Want to see web development or AI skills?\n\nscrollToSection("programming-languages");`;
  }

  // Web Development
  if (lowerMessage.match(/(web|website|webdev|web dev|web development|frontend|front end|front-end|frntend|backend|back end|back-end|bckend|fullstack|full stack|html|css|javascript|js|ecmascript|react|reactjs|react js|rct|node|nodejs|node js|nde|express|expressjs|express js|xpress|fastapi|fast api|jwt|json web token|typescript|ts|typscript|next|nextjs|next js|rest api|restapi|api)/)) {
    return `Summary: Surya's Web Development Skills.\n\nDetails:\n• HTML (95%)\n• CSS (90%)\n• JavaScript (90%)\n• React.js (88%)\n• Node.js (85%)\n• Express.js (85%)\n• REST API (80%)\n• FastAPI (75%)\n• Next.js (70%)\n• TypeScript (55%)\n\nNext step: Want to see database or AI skills?\n\nscrollToSection("web-development");`;
  }

  // Database Management
  if (lowerMessage.match(/(database|databases|databse|databas|databes|^db$|^dbs$|sql|nosql|no sql|mysql|my sql|mysq|mongo|mongodb|mongo db|mongdb|postgres|postgresql|postgre|prisma|orm|data storage|storage|query|queries|dbms)/)) {
    return `Summary: Surya's Database Skills.\n\nDetails:\n• MySQL (90%)\n• MongoDB (80%)\n• PostgreSQL (80%)\n\nNext step: Want to see hosting platforms or other skills?\n\nscrollToSection("database-management");`;
  }

  // Hosting Platforms
  if (lowerMessage.match(/(hosting|host|hsting|deployment|deploy|deploying|dploy|cloud|cld|server|servers|vercel|vercl|verc|^ver$|netlify|netfly|ntlfy|^ntl$|^netl$|render|rendr|rndr|rnder|aiven|railway|railwy|supabase|supabse|firebase|firebs|atlas|mongodb atlas|platform|platforms)/)) {
    return `Summary: Surya's Hosting & Deployment Platforms.\n\nDetails:\n• Vercel (100%)\n• Netlify (100%)\n• Render (100%)\n• Railway (100%)\n• Supabase (100%)\n• Firebase (100%)\n• MongoDB Atlas (100%)\n• Aiven (100%)\n\nNext step: Want to see programming languages or AI tools?\n\nscrollToSection("hosting-platforms");`;
  }

  // Operating Systems
  if (lowerMessage.match(/(operating system|operating systems|^os$|^opsys$|^sys$|system|systems|mac|macos|mac os|macbook|apple|windows|win|windows os|microsoft|linux|unix|ubuntu|debian)/)) {
    return `Summary: Surya's Operating System Skills.\n\nDetails:\n• macOS (100%)\n• Windows (100%)\n• Linux (100%)\n\nNext step: Want to see other technical skills?\n\nscrollToSection("operating-systems");`;
  }

  // AI Tools
  if (lowerMessage.match(/(artificial intelligence|^ai$|aitool|ai tool|ai tools|machine learning|ml|mltool|ml tool|ml tools|chatgpt|chat gpt|gpt|openai|google ai|google studio|studio ai|gemini|perplexity|perplex|perp|kiro|kiro ai|blackbox|blackbox ai|copilot|github copilot|llm|large language|neural|deep learning)/)) {
    return `Summary: Surya's AI Tools Expertise.\n\nDetails:\n• ChatGPT (100%)\n• Google Studio AI (100%)\n• Kiro AI (100%)\n• Blackbox AI (90%)\n• Perplexity AI (85%)\n• GitHub Copilot (80%)\n\nNext step: Want to see programming or web development skills?\n\nscrollToSection("ai-tools");`;
  }

  // Skills Section (general - all skills)
  if (lowerMessage.match(/(^skill$|^skills$|^skil$|^skillz$|^tech$|^techs$|tech stack|^technology$|^tools$|^toolset$|^stack$|^abilities$|^capabilities$|all skills|show skills|skills section|view skills)/)) {
    return `Summary: Here are Surya's technical skills.\n\nDetails: Frontend, Backend, Database, AI Tools, and Deployment expertise.\n\nNext step: Want to explore experience or projects?\n\nscrollToSection("skills");`;
  }

  // Projects Section (navigation)
  if (lowerMessage.match(/(^project$|^projects$|^proj$|^pro$|^prj$|^prjt$|^apps$|^appz$|^applications$|portfolio projects|^websites$|^wrk$|^wrklist$|show projects|my work|real work|view projects|projects section)/)) {
    return `Summary: These are Surya's real-world projects.\n\nDetails: 8+ production applications including bilingual platforms, healthcare systems, AI automation, medical association website, and textile management system.\n\nNext step: Choose any project if you want a deep explanation.\n\nscrollToSection("projects");`;
  }



  // Contact Section (navigation)
  if (lowerMessage.match(/(^contact$|^conatct$|^cnt$|^cntct$|^cont$|^contct$|^connect$|^msg$|^msge$|^message$|message me|^hire$|^hiree$|^hie$|hireme|hire surya|^reach$|reachme|^email$|^phone$|^call$|^whatsapp$|contact form|send message|get in touch|message surya|work with you|^opportunity$|^doubt$|contact me)/)) {
    return `Summary: You can contact Surya directly.\n\nDetails:\nPhone: ${knowledge.personal.phone}\nEmail: ${knowledge.personal.email}\n\nPlease use the contact form to reach him. All messages go directly to Surya's email.\n\nNext step: Fill the contact form with your details.\n\nscrollToSection("contact");`;
  }

  // Top Skills / Tech Stack
  if (lowerMessage.match(/(skills|top skills|tech stack|technologies|what can surya do)/)) {
    return `Surya's Tech Stack:\n\n` +
      `Frontend → ${knowledge.skills.frontend.join(', ')}\n\n` +
      `Backend → ${knowledge.skills.backend.join(', ')}\n\n` +
      `Database → ${knowledge.skills.database.join(', ')}\n\n` +
      `AI Tools → ${knowledge.skills.ai.join(', ')}\n\n` +
      `Deployment → ${knowledge.skills.deployment.join(', ')}\n\n` +
      `Operating Systems → ${knowledge.skills.os.join(', ')}\n\n` +
      `Other → ${knowledge.skills.other.join(', ')}\n\n` +
      `Surya is a full-stack developer with strong AI/ML capabilities!`;
  }

  // GitHub
  if (lowerMessage.match(/^(github|git|git link|github link|source code)$/)) {
    return `GitHub: ${knowledge.socialLinks.github}`;
  }

  // LinkedIn
  if (lowerMessage.match(/^(linkedin|linked in|linkedin link)$/)) {
    return `LinkedIn: ${knowledge.socialLinks.linkedin}`;
  }

  // Instagram
  if (lowerMessage.match(/^(instagram|insta|instagram link)$/)) {
    return `Instagram: ${knowledge.socialLinks.instagram}`;
  }

  // Social Links (broader match)
  if (lowerMessage.includes('social') || (lowerMessage.includes('links') && !lowerMessage.includes('project'))) {
    return `Connect with Surya:\n\n` +
      `🐙 GitHub: ${knowledge.socialLinks.github}\n\n` +
      `💼 LinkedIn: ${knowledge.socialLinks.linkedin}\n\n` +
      `📸 Instagram: ${knowledge.socialLinks.instagram}\n\n` +
      `🌐 Portfolio: ${knowledge.socialLinks.portfolio}`;
  }

  // Project Links - Portfolio
  if (lowerMessage.match(/(^portfolio$|portfolio link|show portfolio|see portfolio|live portfolio|your website|see your site|your site)/)) {
    return `Portfolio Website:\n${knowledge.socialLinks.portfolio}`;
  }

  // Project Links - Petition Portal
  if (lowerMessage.match(/(^petition$|petition portal|online petition|petition link|show petition|petitn)/)) {
    const p = knowledge.projects.petition;
    return `${p.name} 🚀\n\n${p.live}\n\nTech Stack: ${p.tech.join(', ')}\n\nFeatures:\n${p.features.map(f => `• ${f}`).join('\n')}`;
  }

  // Project Links - Hospital
  if (lowerMessage.match(/(^hospital$|hospital project|hospital management|hospital system|medical app)/)) {
    const p = knowledge.projects.hospital;
    return `${p.name} 🚀\n\n${p.live}\n\nTech Stack: ${p.tech.join(', ')}\n\nFeatures:\n${p.features.map(f => `• ${f}`).join('\n')}`;
  }

  // Project Links - API Trichy
  if (lowerMessage.match(/(api trichy|trichy project|trichy website|medical association|api trichy link)/)) {
    const p = knowledge.projects.apiTrichy;
    return `${p.name} 🚀\n\n${p.live}\n\nTech Stack: ${p.tech.join(', ')}\n\nFeatures:\n${p.features.map(f => `• ${f}`).join('\n')}`;
  }

  // Project Links - User Management (no demo)
  if (lowerMessage.match(/(user management|ums|user system|user portal)/)) {
    return `User Management System\n\nNo public demo link.\n\nI can explain the architecture, API routes, and DB design.`;
  }

  // Project Links - AI Reminder (no demo)
  if (lowerMessage.match(/(ai reminder|auto reminder|reminder system|whatsapp reminder)/)) {
    return `AI Auto Reminder System\n\nThis system runs internally using n8n workflows for SMS, WhatsApp, and Email, so it has no public link.`;
  }

  // Project Links - ISC (no demo)
  if (lowerMessage.match(/(isc|textile app|digital printing)/)) {
    return `ISC Digital Printing / Textile Report App\n\nThis is an internal client project and does not have a public link.`;
  }

  // Demo/Live links
  if (lowerMessage.includes('demo') || lowerMessage.includes('live') || lowerMessage.includes('deployed') || lowerMessage.includes('show me')) {
    return `Live Project Demos: 🚀\n\n` +
      `1. Portfolio Website\n   ${knowledge.socialLinks.portfolio}\n\n` +
      `2. Online Petition Portal\n   ${knowledge.projects.petition.live}\n\n` +
      `3. Hospital Management System\n   ${knowledge.projects.hospital.live}\n\n` +
      `4. API Trichy Medical Website\n   ${knowledge.projects.apiTrichy.live}\n\n` +
      `Projects without public demos:\n` +
      `• AI Auto Reminder (n8n automation)\n` +
      `• User Management (can explain architecture)\n` +
      `• ISC Digital Printing (internal client)\n\n` +
      `Click any link to explore!`;
  }

  // All Projects
  if (lowerMessage.match(/(projects|show projects|list projects)/)) {
    return `Surya's Featured Projects:\n\n` +
      `Live Demos Available: 🌐\n` +
      `1. Portfolio Website - ${knowledge.socialLinks.portfolio}\n` +
      `2. Online Petition Portal - ${knowledge.projects.petition.live}\n` +
      `3. Hospital Management System - ${knowledge.projects.hospital.live}\n` +
      `4. API Trichy Chapter Website - ${knowledge.projects.apiTrichy.live}\n\n` +
      `Production Projects: 🔧\n` +
      `5. AI Auto WhatsApp Reminder - AI-powered automation\n` +
      `6. Smart Irrigation System - ARIMAX ML model\n` +
      `7. User Management System - Full-stack CRUD\n` +
      `8. ISC Textile Report App - Digital printing management (Client: Indian Soft Colours)\n\n` +
      `Ask about any specific project for details!`;
  }

  // Education
  if (lowerMessage.match(/(education|studies|qualification|college|degree|ksr)/)) {
    return `Education:\n\n` +
      `🎓 ${knowledge.education.degree}\n` +
      `${knowledge.education.institution}\n` +
      `Duration: ${knowledge.education.duration}\n` +
      `CGPA: ${knowledge.education.cgpa}\n\n` +
      `Surya is currently pursuing his Bachelor's degree in Computer Science with a strong CGPA of 7.9.`;
  }

  // Experience
  if (lowerMessage.match(/(experience|internship|work experience)/)) {
    return `Professional Experience:\n\n` +
      `${knowledge.experience.map((exp, i) => 
        `${i + 1}. ${exp.role} at ${exp.company}${exp.location ? ', ' + exp.location : ''}\n   ${exp.duration}`
      ).join('\n\n')}\n\n` +
      `Surya has hands-on experience building production applications.`;
  }

  // Hire / Contact Form
  if (lowerMessage.match(/(hire|hire surya|i want to hire|want to hire|work with you|job|opportunity|collaboration|freelance|project work|need developer|business inquiry)/)) {
    return `Summary:\nSurya is available for full-stack development and AI/automation roles.\n\n` +
      `Details:\nTo hire Surya or discuss an opportunity, please fill out the contact form on the portfolio website. Your message will be delivered directly to Surya via email.\n\n` +
      `Contact Form Link:\n${knowledge.socialLinks.portfolio}#contact\n\n` +
      `Next step:\nPlease submit the contact form with your name, email, and message. Surya will respond shortly.\n\n` +
      `scrollToSection("contact");`;
  }

  // Contact (general)
  if (lowerMessage.match(/(contact surya|reach surya|connect|email|reach)/)) {
    return `Contact Surya:\n\n` +
      `📧 Email: ${knowledge.personal.email}\n` +
      `📱 Phone: ${knowledge.personal.phone}\n\n` +
      `Or use the contact form:\n${knowledge.socialLinks.portfolio}#contact`;
  }

  // Hiring / Availability (general)
  if (lowerMessage.match(/(hiring|looking for job|opportunities|availability)/)) {
    return `Surya is open to full-stack developer, AI/ML, and automation engineering roles.\n\n` +
      `Contact him via:\n${knowledge.socialLinks.portfolio}#contact`;
  }

  // Default response for unknown input
  return `Summary:\nI couldn't fully understand your message.\n\n` +
    `Details:\nIt looks like there might be a spelling mistake or incomplete sentence. Please tell me what you want to do.\n\n` +
    `Examples:\n` +
    `• View skills\n` +
    `• Show projects\n` +
    `• Show certifications\n` +
    `• Contact Surya\n` +
    `• See portfolio\n\n` +
    `Next step:\nTry rephrasing your question and I'll help you.`;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = generateResponse(message);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('SURYA.AI error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

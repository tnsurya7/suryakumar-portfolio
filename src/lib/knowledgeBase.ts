// 📚 STRUCTURED KNOWLEDGE BASE

export const knowledge = {
  personal: {
    name: 'Surya Kumar M',
    role: 'Full Stack Developer | Automation Specialist',
    phone: '+91 9360004968',
    email: 'suryakumar56394@gmail.com',
  },
  
  socialLinks: {
    github: 'https://github.com/tnsurya7',
    linkedin: 'https://www.linkedin.com/in/surya-kumar-m-72a725257/',
    instagram: 'https://www.instagram.com/tn_surya_777/',
    whatsapp: 'https://wa.me/919360004968',
    portfolio: 'https://suryakumar-portfolio-chi.vercel.app/',
  },
  
  projects: [
    {
      id: 'smilestones',
      name: 'Smilestones Child Development Centre',
      live: 'https://www.smilestonescdc.com/',
      github: '',
      tech: ['Next.js', 'React', 'Neon PostgreSQL', 'Vercel'],
      description: 'Healthcare platform for child development and therapy services',
    },
    {
      id: 'funprints',
      name: 'FunPrints - 3D Custom T-Shirt Platform',
      live: 'https://funprints.vercel.app/',
      github: '',
      tech: ['React.js', 'Three.js', 'Next.js', 'Tailwind CSS'],
      description: '3D T-shirt customization platform with real-time rendering',
    },
    {
      id: 'tfc',
      name: 'TFC - Food Ordering System',
      live: 'https://tfcfoodapp.vercel.app/',
      github: '',
      tech: ['Next.js', 'Firebase', 'EmailJS', 'Vercel'],
      description: 'Complete food ordering system for TFC restaurant',
    },
    {
      id: 'mediestate',
      name: 'Mediestate CRM - Real Estate Platform',
      live: 'https://mediestate.vercel.app/',
      github: '',
      tech: ['Next.js 14', 'Neon PostgreSQL', 'JWT', 'Nodemailer'],
      description: 'Real estate CRM with email automation and analytics',
    },
    {
      id: 'medievents',
      name: 'Medi Events - Healthcare Conference Platform',
      live: 'https://medievents.vercel.app/',
      github: '',
      tech: ['Next.js', 'TypeScript', 'Framer Motion', 'ShadCN UI'],
      description: 'Healthcare conference and events platform',
    },
    {
      id: 'dreamtravel',
      name: 'Dream Travel Agency',
      live: 'https://dreamtravelz.in',
      github: '',
      tech: ['Next.js 15', 'Nodemailer', 'WhatsApp API', 'TypeScript'],
      description: 'Premium travel booking platform with email/WhatsApp integration',
    },
    {
      id: 'webdeo',
      name: 'Web Deo - Digital Agency',
      live: 'https://webdeo.in',
      github: '',
      tech: ['React', 'TypeScript', 'Vite', 'Framer Motion'],
      description: 'Digital agency website with 100+ projects showcase',
    },
    {
      id: 'petition',
      name: 'Online Petition Portal',
      live: 'https://online-petition-portal.vercel.app/',
      github: 'https://github.com/tnsurya7/petition-system',
      tech: ['React.js', 'Node.js', 'MySQL', 'JWT'],
      description: 'Bilingual petition management system (English/Tamil)',
    },
    {
      id: 'hospital',
      name: 'Hospital Management System',
      live: 'https://hospital-management-kappa-eight.vercel.app/',
      github: 'https://github.com/tnsurya7/hospital-management',
      tech: ['React.js', 'MongoDB', 'Express.js', 'Node.js'],
      description: 'Complete hospital management with patient records and appointments',
    },
    {
      id: 'apiTrichy',
      name: 'API Trichy Chapter Website',
      live: 'https://api-trichy.vercel.app/',
      github: 'https://github.com/tnsurya7/api-trichy',
      tech: ['Next.js 14', 'PostgreSQL', 'Prisma ORM', 'TypeScript'],
      description: 'Medical association website with CMS and member management',
    },
    {
      id: 'medfox',
      name: 'MedFoxRCM - Healthcare RCM Platform',
      live: 'https://medfoxrcm.com',
      github: 'https://github.com/tnsurya7/medfoxrcm',
      tech: ['Next.js 14', 'Nodemailer', 'Zod', 'TypeScript'],
      description: 'Healthcare revenue cycle management with course registration',
    },
    {
      id: 'irrigation',
      name: 'Smart Irrigation System',
      live: '',
      github: 'https://github.com/tnsurya7/smart-irrigation-arimax',
      tech: ['Python', 'FastAPI', 'ARIMAX Model', 'Machine Learning'],
      description: 'AI-powered irrigation system with predictive analytics',
    },
  ],
  
  skills: {
    frontend: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
    backend: ['Node.js', 'Express.js', 'FastAPI', 'Spring Boot', 'REST APIs', 'JWT'],
    database: ['MySQL', 'PostgreSQL', 'MongoDB', 'Prisma ORM', 'Neon.db'],
    ai: ['ChatGPT', 'Claude AI', 'N8N Automation', 'AI Agents', 'ARIMAX', 'OpenAI API'],
    deployment: ['Vercel', 'Render', 'Railway', 'Netlify', 'Firebase', 'AWS Cloud', 'Oracle'],
    languages: ['Java', 'Python', 'JavaScript', 'TypeScript'],
  },
  
  experience: [
    {
      company: 'RV Solutions',
      role: 'Full Stack Developer',
      location: 'Chennai',
      duration: 'Dec 2024 - Mar 2025',
      description: 'Building modern web applications with React, Node.js, and cloud platforms',
    },
    {
      company: 'Nurture Infotech',
      role: 'Full Stack Developer',
      location: 'Erode',
      duration: 'Jul 2024 - Aug 2024',
      description: 'Intensive training in Full Stack Development and modern web technologies',
    },
    {
      company: 'Durga Tech',
      role: 'Front-End Developer',
      location: '',
      duration: 'Apr 2023',
      description: 'Frontend development with React and modern UI frameworks',
    },
  ],
  
  education: {
    degree: 'B.E. Computer Science and Engineering',
    institution: 'KSR Institute for Engineering and Technology',
    location: 'Tiruchengode',
    duration: '2022-2026',
    cgpa: '7.9',
  },
};

// Helper functions to get data
export function getAllProjectLinks(): string {
  let response = '🌐 All Project Live URLs:\n\n';
  
  knowledge.projects.forEach(project => {
    if (project.live) {
      response += `• ${project.name}\n  ${project.live}\n\n`;
    }
  });
  
  response += '👉 Want details about any specific project?';
  return response;
}

export function getAllGithubRepos(): string {
  let response = `🐙 Surya's GitHub:\n\nMain Profile: ${knowledge.socialLinks.github}\n\n`;
  response += 'Project Repositories:\n';
  
  knowledge.projects.forEach(project => {
    if (project.github) {
      response += `• ${project.name}\n  ${project.github}\n\n`;
    }
  });
  
  response += '👉 Visit his GitHub profile to see all repositories!';
  return response;
}

export function getAllSocialLinks(): string {
  return `🔗 Connect with Surya:\n\n` +
    `🐙 GitHub: ${knowledge.socialLinks.github}\n` +
    `💼 LinkedIn: ${knowledge.socialLinks.linkedin}\n` +
    `📸 Instagram: ${knowledge.socialLinks.instagram}\n` +
    `💬 WhatsApp: ${knowledge.socialLinks.whatsapp}\n` +
    `📧 Email: ${knowledge.personal.email}\n` +
    `📱 Phone: ${knowledge.personal.phone}\n` +
    `🌐 Portfolio: ${knowledge.socialLinks.portfolio}\n\n` +
    `👉 Want to know about his projects or skills?`;
}

export function getProjectList(): string {
  return `🚀 Surya has built some awesome projects:\n\n` +
    `• FunPrints → 3D T-shirt customization platform\n` +
    `• Smilestones → Healthcare platform for child development\n` +
    `• Mediestate CRM → Real estate CRM system\n` +
    `• Smart Irrigation → AI-powered agriculture system\n` +
    `• API Trichy → Medical association website\n` +
    `• MedFoxRCM → Healthcare revenue cycle management\n` +
    `• Dream Travel → Premium travel booking platform\n` +
    `• Web Deo → Digital agency website\n\n` +
    `👉 Want details about any specific project?`;
}

export function getSkillsByTech(tech: string): string[] {
  const projects: string[] = [];
  
  knowledge.projects.forEach(project => {
    if (project.tech.some(t => t.toLowerCase().includes(tech.toLowerCase()))) {
      projects.push(project.name);
    }
  });
  
  return projects;
}

export function getAllSkills(): string {
  return `💻 Surya's Technical Skills:\n\n` +
    `Frontend: ${knowledge.skills.frontend.join(', ')}\n\n` +
    `Backend: ${knowledge.skills.backend.join(', ')}\n\n` +
    `Database: ${knowledge.skills.database.join(', ')}\n\n` +
    `AI & Automation: ${knowledge.skills.ai.join(', ')}\n\n` +
    `Deployment: ${knowledge.skills.deployment.join(', ')}\n\n` +
    `👉 Want to know about specific skills or see projects?`;
}

export function getExperience(): string {
  let response = '💼 Surya\'s Professional Experience:\n\n';
  
  knowledge.experience.forEach((exp, index) => {
    response += `${index + 1}. ${exp.role} at ${exp.company}`;
    if (exp.location) response += `, ${exp.location}`;
    response += `\n   (${exp.duration})\n\n`;
  });
  
  response += 'He has hands-on experience building production applications with modern tech stacks.\n\n';
  response += '👉 Want to see his projects or skills?';
  return response;
}

export function getEducation(): string {
  const edu = knowledge.education;
  return `🎓 Surya's Education:\n\n` +
    `${edu.degree}\n` +
    `${edu.institution}, ${edu.location}\n` +
    `CGPA: ${edu.cgpa} (${edu.duration})\n\n` +
    `He's currently pursuing his Bachelor's degree with a strong focus on Full Stack Development and AI.\n\n` +
    `👉 Want to know about his skills or projects?`;
}

export function getContact(): string {
  return `📧 Contact Surya:\n\n` +
    `Email: ${knowledge.personal.email}\n` +
    `Phone: ${knowledge.personal.phone}\n` +
    `WhatsApp: ${knowledge.socialLinks.whatsapp}\n\n` +
    `Surya is available for full-stack development and AI/automation roles.\n\n` +
    `You can also use the contact form on his portfolio to reach him directly!\n\n` +
    `👉 Want to know more about his work?`;
}

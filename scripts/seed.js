// Sample data seeding script
// Run with: node scripts/seed.js

const sampleData = {
  skills: [
    { name: 'React', category: 'Frontend', level: 90 },
    { name: 'Next.js', category: 'Frontend', level: 85 },
    { name: 'TypeScript', category: 'Frontend', level: 80 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 90 },
    { name: 'Node.js', category: 'Backend', level: 85 },
    { name: 'Express', category: 'Backend', level: 80 },
    { name: 'MongoDB', category: 'Database', level: 75 },
    { name: 'PostgreSQL', category: 'Database', level: 70 },
    { name: 'Git', category: 'Tools', level: 85 },
    { name: 'Docker', category: 'Tools', level: 70 },
  ],
  
  education: [
    {
      institution: 'Your University Name',
      degree: 'Bachelor of Technology',
      field: 'Computer Science',
      startDate: '2020-08-01',
      endDate: '2024-05-01',
      current: false,
      grade: '8.5 CGPA',
      description: 'Focused on software engineering, data structures, and web development.'
    }
  ],
  
  projects: [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce platform with payment integration',
      longDescription: 'Built a complete e-commerce solution with user authentication, product management, shopping cart, and payment processing using Stripe.',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      features: [
        'User authentication and authorization',
        'Product catalog with search and filters',
        'Shopping cart and checkout',
        'Payment integration with Stripe',
        'Admin dashboard for product management'
      ],
      challenges: 'Implementing secure payment processing and optimizing database queries for large product catalogs.',
      image: '/uploads/project1.jpg',
      images: [],
      githubUrl: 'https://github.com/yourusername/ecommerce',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      featured: true
    }
  ],
  
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/suryakumar', icon: 'github', order: 1 },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/suryakumar', icon: 'linkedin', order: 2 },
    { platform: 'Instagram', url: 'https://instagram.com/suryakumar', icon: 'instagram', order: 3 },
    { platform: 'Facebook', url: 'https://facebook.com/suryakumar', icon: 'facebook', order: 4 },
    { platform: 'WhatsApp', url: 'https://wa.me/1234567890', icon: 'whatsapp', order: 5 },
  ]
};

console.log('Sample data structure for seeding:');
console.log(JSON.stringify(sampleData, null, 2));
console.log('\nUse the admin panel to add this data through the UI!');

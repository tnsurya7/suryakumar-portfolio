'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Github, Linkedin, Instagram, Facebook, MessageCircle, 
  Mail, Phone, ExternalLink, Download, Award, Briefcase,
  GraduationCap, Send, Sparkles, X, Code
} from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import SuryaAI from '@/components/SuryaAI';

export default function HomePage() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [internships, setInternships] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    Promise.all([
      fetch('/api/social-links').then(res => res.json()),
      fetch('/api/skills').then(res => res.json()),
      fetch('/api/projects').then(res => res.json()),
      fetch('/api/education').then(res => res.json()),
      fetch('/api/internships').then(res => res.json()),
      fetch('/api/certificates').then(res => res.json()),
    ]).then(([social, skillsData, projectsData, edu, intern, cert]) => {
      setSocialLinks(Array.isArray(social) ? social : []);
      setSkills(Array.isArray(skillsData) ? skillsData : []);
      setProjects(Array.isArray(projectsData) ? projectsData : []);
      setEducation(Array.isArray(edu) ? edu : []);
      setInternships(Array.isArray(intern) ? intern : []);
      setCertificates(Array.isArray(cert) ? cert : []);
    });
  }, []);

  const iconMap: any = {
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
    facebook: Facebook,
    whatsapp: MessageCircle,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading toast
    const loadingToast = toast.loading('Sending your message...', {
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff',
        padding: '16px 24px',
        borderRadius: '12px',
        fontSize: '15px',
        fontWeight: '500',
        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
      },
    });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success(
          (t) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                ✓
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                  Message Sent Successfully!
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>
                  Thank you for reaching out. I'll get back to you soon!
                </div>
              </div>
            </div>
          ),
          {
            id: loadingToast,
            duration: 6000,
            style: {
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: '#fff',
              padding: '20px 24px',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(16, 185, 129, 0.4)',
              maxWidth: '500px',
            },
          }
        );
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(
          (t) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>
                ✕
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                  Failed to Send Message
                </div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>
                  {data.error || 'Please try again or email me directly.'}
                </div>
              </div>
            </div>
          ),
          {
            id: loadingToast,
            duration: 6000,
            style: {
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
              color: '#fff',
              padding: '20px 24px',
              borderRadius: '16px',
              boxShadow: '0 10px 40px rgba(239, 68, 68, 0.4)',
              maxWidth: '500px',
            },
          }
        );
      }
    } catch (error) {
      toast.error(
        (t) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              ⚠
            </div>
            <div>
              <div style={{ fontWeight: '600', fontSize: '16px', marginBottom: '4px' }}>
                Connection Error
              </div>
              <div style={{ fontSize: '13px', opacity: 0.9 }}>
                Please check your connection and try again.
              </div>
            </div>
          </div>
        ),
        {
          id: loadingToast,
          duration: 6000,
          style: {
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            color: '#fff',
            padding: '20px 24px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(245, 158, 11, 0.4)',
            maxWidth: '500px',
          },
        }
      );
    }
  };

  const categories = [...new Set(skills.map(s => s.category))] as string[];

  return (
    <>
      <Sidebar />
      <SuryaAI />
      <div className="ml-0 lg:ml-24">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-full border border-primary-500/20 mb-6"
              >
                <Sparkles className="text-primary-500" size={16} />
                <span className="text-sm font-semibold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  Welcome to my portfolio
                </span>
              </motion.div>

              <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <span className="block sm:inline text-gray-900 dark:text-white">Hi, I'm </span>
                <span className="block sm:inline bg-gradient-to-r from-gray-900 via-blue-600 to-blue-500 dark:from-gray-100 dark:via-blue-400 dark:to-blue-300 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">Surya Kumar M</span>
              </motion.h1>

              <motion.p className="text-2xl md:text-3xl bg-gradient-to-r from-gray-800 via-blue-600 to-blue-500 dark:from-gray-200 dark:via-blue-400 dark:to-blue-300 bg-clip-text text-transparent mb-4 font-semibold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                Full Stack Developer
              </motion.p>

              <motion.p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                Passionate about building modern web applications with cutting-edge technologies.
              </motion.p>

              <motion.div className="flex flex-wrap gap-3 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                {socialLinks.map((link, index) => {
                  const Icon = iconMap[link.platform.toLowerCase()] || Github;
                  const brandColors: any = {
                    github: 'bg-[#181717] hover:bg-[#2b2b2b] dark:bg-[#181717] dark:hover:bg-[#2b2b2b]',
                    linkedin: 'bg-[#0A66C2] hover:bg-[#004182] dark:bg-[#0A66C2] dark:hover:bg-[#004182]',
                    instagram: 'bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90',
                    facebook: 'bg-[#1877F2] hover:bg-[#0C63D4] dark:bg-[#1877F2] dark:hover:bg-[#0C63D4]',
                    whatsapp: 'bg-[#25D366] hover:bg-[#1EBE57] dark:bg-[#25D366] dark:hover:bg-[#1EBE57]',
                  };
                  return (
                    <motion.a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" 
                      whileHover={{ scale: 1.15, y: -5 }} whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl ${brandColors[link.platform.toLowerCase()]} text-white shadow-lg hover:shadow-2xl transition-all duration-200`}>
                      <Icon size={24} />
                    </motion.a>
                  );
                })}
              </motion.div>

              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                  <Briefcase size={20} /> View Projects <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="/resume.jpeg" download="Surya_Kumar_M_Resume.jpeg"
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
                  <Download size={20} /> Download Resume
                </a>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-2xl font-semibold hover:bg-primary-500 hover:text-white transition-all flex items-center gap-2">
                  <Mail size={20} /> Contact Me
                </button>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <motion.div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-600 to-blue-500 rounded-full blur-3xl opacity-50"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
                <motion.div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl"
                  animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                  <Image
                    src="/SURYA.JPG"
                    alt="Surya Kumar M"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-gray-50/50 dark:via-gray-900/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">About Me</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">My journey, education, and achievements</p>
            </motion.div>

            <div id="education" className="mb-20">
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-4"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg"
                >
                  <GraduationCap size={32} />
                </motion.div>
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Education</span>
              </motion.h3>
              <div className="grid gap-6">
                {education.map((edu, index) => (
                  <motion.div key={edu.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -5 }}
                    className="relative p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all border-2 border-secondary-200 dark:border-secondary-800 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary-500/20 to-accent-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                    
                    {/* KSR Logo Watermark */}
                    <div className="absolute top-4 right-4 w-24 h-24 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-300">
                      <Image
                        src="/ksr-logo.png"
                        alt="KSR College Logo"
                        width={96}
                        height={96}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 flex items-start gap-4">
                          {/* College Logo */}
                          <motion.div 
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white dark:bg-gray-900 p-2 shadow-lg border-2 border-blue-200 dark:border-blue-800"
                          >
                            <Image
                              src="/ksr-logo.png"
                              alt="KSR College Logo"
                              width={80}
                              height={80}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                          
                          <div className="flex-1">
                            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">{edu.degree}</h4>
                            <p className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">{edu.institution}</p>
                          </div>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold shadow-lg animate-pulse">
                          {edu.current ? 'Current' : 'Completed'}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">{edu.field}</p>
                      <div className="flex items-center gap-3 mt-4">
                        {edu.grade && (
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-700 dark:text-blue-300 rounded-full font-semibold shadow-sm">
                            <span className="text-2xl">🎓</span>
                            <span>CGPA: {edu.grade}</span>
                          </div>
                        )}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-700 dark:text-purple-300 rounded-full font-semibold shadow-sm">
                          <span className="text-xl">📅</span>
                          <span>{new Date(edu.startDate).getFullYear()} - {new Date(edu.endDate).getFullYear()}</span>
                        </div>
                      </div>
                      {edu.description && <p className="text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">{edu.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {internships.length > 0 && (
              <div id="internships" className="mb-20">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-4"
                >
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl text-white shadow-lg"
                  >
                    <Briefcase size={32} />
                  </motion.div>
                  <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent">Internships</span>
                </motion.h3>
                <div className="grid gap-6">
                  {internships.map((intern, index) => {
                    const internColors = [
                      { gradient: 'from-purple-500 to-pink-600', badge: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400', status: 'bg-gradient-to-r from-purple-500 to-pink-500', logo: 'rv-solutions-logo.png' },
                      { gradient: 'from-blue-500 to-cyan-600', badge: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400', status: 'bg-gradient-to-r from-blue-500 to-cyan-500', logo: 'nurture-logo.png' },
                    ];
                    const color = internColors[index % internColors.length];
                    
                    return (
                      <motion.div key={intern.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.02, y: -5 }}
                        className="relative p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all border-2 border-accent-200 dark:border-accent-800 overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${color.gradient}`} />
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                        
                        {/* Company Logo Watermark */}
                        <div className="absolute top-4 right-4 w-20 h-20 opacity-10 dark:opacity-5 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-300">
                          <Image
                            src={`/${color.logo}`}
                            alt={`${intern.company} Logo`}
                            width={80}
                            height={80}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        
                        <div className="relative">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 flex items-start gap-4">
                              {/* Company Logo */}
                              <motion.div 
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white dark:bg-gray-900 p-2 shadow-lg border-2 border-purple-200 dark:border-purple-800"
                              >
                                <Image
                                  src={`/${color.logo}`}
                                  alt={`${intern.company} Logo`}
                                  width={64}
                                  height={64}
                                  className="w-full h-full object-contain"
                                />
                              </motion.div>
                              
                              <div className="flex-1">
                                <h4 className="text-2xl font-bold bg-gradient-to-r from-accent-600 to-primary-600 dark:from-accent-400 dark:to-primary-400 bg-clip-text text-transparent">{intern.position}</h4>
                                <p className="text-lg font-semibold mt-2 text-gray-800 dark:text-gray-200">{intern.company}</p>
                              </div>
                            </div>
                            {intern.current && (
                              <div className={`px-4 py-2 ${color.status} text-white rounded-full text-sm font-bold shadow-lg animate-pulse`}>
                                Current
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-medium">
                            {new Date(intern.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {intern.current ? 'Present' : new Date(intern.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{intern.description}</p>
                          {intern.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-5">
                              {intern.technologies.map((tech: string, i: number) => (
                                <span key={i} className={`px-3 py-1.5 ${color.badge} rounded-full text-sm font-semibold shadow-sm`}>{tech}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {certificates.length > 0 && (
              <div id="certificates">
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-4"
                >
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-2xl text-white shadow-lg"
                  >
                    <Award size={32} />
                  </motion.div>
                  <span className="bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent">Certificates</span>
                </motion.h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((cert, index) => {
                    const certColors = [
                      { gradient: 'from-yellow-400 via-orange-500 to-red-500', badge: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300', icon: '🏆' },
                      { gradient: 'from-green-400 via-emerald-500 to-teal-500', badge: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300', icon: '🎖️' },
                      { gradient: 'from-blue-400 via-indigo-500 to-purple-500', badge: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300', icon: '🏅' },
                      { gradient: 'from-pink-400 via-rose-500 to-red-500', badge: 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300', icon: '⭐' },
                    ];
                    const color = certColors[index % certColors.length];
                    
                    return (
                      <motion.div key={cert.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05, rotate: 2 }}
                        className="relative p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all border-2 border-success-200 dark:border-success-800 overflow-hidden group">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color.gradient} opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
                        <div className="relative">
                          <div className="flex items-start gap-4 mb-3">
                            <div className={`text-4xl p-3 bg-gradient-to-br ${color.gradient} rounded-2xl shadow-lg`}>
                              {color.icon}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-bold bg-gradient-to-r from-success-600 to-emerald-600 dark:from-success-400 dark:to-emerald-400 bg-clip-text text-transparent">{cert.title}</h4>
                              <p className="text-gray-600 dark:text-gray-400 mt-1 font-medium">{cert.issuer}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                            Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </p>
                          {cert.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">{cert.description}</p>}
                          {cert.credentialUrl && (
                            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" 
                              className={`inline-flex items-center gap-2 mt-4 px-4 py-2 ${color.badge} rounded-full hover:shadow-lg transition-all text-sm font-semibold`}>
                              View Credential <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">My Skills</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Technologies and tools I work with</p>
            </motion.div>

            <div className="space-y-16">
              {categories.map((category, catIndex) => {
                const categoryColors: any = {
                  'Programming Languages': {
                    icon: 'from-blue-500 to-blue-600',
                    bar: 'from-blue-500 via-blue-600 to-indigo-600',
                    badge: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
                    hover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400'
                  },
                  'Web Development': {
                    icon: 'from-primary-500 to-primary-600',
                    bar: 'from-primary-500 via-accent-500 to-secondary-500',
                    badge: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
                    hover: 'group-hover:text-primary-600 dark:group-hover:text-primary-400'
                  },
                  'Database Management': {
                    icon: 'from-green-500 to-green-600',
                    bar: 'from-green-500 via-emerald-500 to-teal-500',
                    badge: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
                    hover: 'group-hover:text-green-600 dark:group-hover:text-green-400'
                  },
                  'Hosting Platforms': {
                    icon: 'from-purple-500 to-purple-600',
                    bar: 'from-purple-500 via-violet-500 to-fuchsia-500',
                    badge: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
                    hover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400'
                  },
                  'Operating Systems': {
                    icon: 'from-orange-500 to-orange-600',
                    bar: 'from-orange-500 via-amber-500 to-yellow-500',
                    badge: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
                    hover: 'group-hover:text-orange-600 dark:group-hover:text-orange-400'
                  },
                  'AI Tools': {
                    icon: 'from-pink-500 to-pink-600',
                    bar: 'from-pink-500 via-rose-500 to-red-500',
                    badge: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400',
                    hover: 'group-hover:text-pink-600 dark:group-hover:text-pink-400'
                  }
                };
                const colors = categoryColors[category] || categoryColors['Web Development'];
                
                const categoryId = category.toLowerCase().replace(/\s+/g, '-');
                
                return (
                  <motion.section key={category} id={categoryId} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: catIndex * 0.1 }}>
                    <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                      <div className={`p-4 bg-gradient-to-br ${colors.icon} rounded-2xl text-white shadow-lg`}>
                        <Code size={32} />
                      </div>
                      <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {category}
                      </span>
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {skills.filter(s => s.category === category).map((skill, index) => (
                        <motion.div 
                          key={skill.id} 
                          initial={{ opacity: 0, y: 20 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          viewport={{ once: true }} 
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05, y: -8 }}
                          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700 group"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <h4 className={`text-lg font-bold ${colors.hover} transition-colors`}>
                              {skill.name}
                            </h4>
                            <motion.span 
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.5 + index * 0.05, type: 'spring', stiffness: 200 }}
                              className={`text-sm font-bold px-3 py-1.5 ${colors.badge} rounded-full shadow-sm`}
                            >
                              {skill.level}%
                            </motion.span>
                          </div>
                          <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3.5 overflow-hidden shadow-inner">
                            <motion.div 
                              initial={{ width: 0 }} 
                              whileInView={{ width: `${skill.level}%` }} 
                              viewport={{ once: true }} 
                              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                              className={`h-full bg-gradient-to-r ${colors.bar} rounded-full relative overflow-hidden shadow-lg`}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.section>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-gray-50/50 dark:via-gray-900/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">My Projects</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Real-world applications I've built</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const projectColors = [
                  { gradient: 'from-blue-500 via-indigo-500 to-purple-600', badge: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400', hover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400' },
                  { gradient: 'from-green-500 via-emerald-500 to-teal-600', badge: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400', hover: 'group-hover:text-green-600 dark:group-hover:text-green-400' },
                  { gradient: 'from-orange-500 via-red-500 to-pink-600', badge: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400', hover: 'group-hover:text-orange-600 dark:group-hover:text-orange-400' },
                  { gradient: 'from-purple-500 via-fuchsia-500 to-pink-600', badge: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400', hover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400' },
                ];
                const color = projectColors[index % projectColors.length];
                
                return (
                  <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedProject(project)} whileHover={{ scale: 1.05, y: -8 }}
                    className="group cursor-pointer bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200 dark:border-gray-700">
                    <div className={`relative h-48 overflow-hidden`}>
                      {project.image ? (
                        <>
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                            whileHover={{ opacity: 0 }}
                          />
                        </>
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${color.gradient} flex items-center justify-center`}>
                          <div className="text-white text-5xl font-bold drop-shadow-lg">{project.title.charAt(0)}</div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-2 ${color.hover} transition-colors`}>{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.slice(0, 3).map((tech: string, i: number) => (
                          <span key={i} className={`px-3 py-1 ${color.badge} rounded-full text-xs font-semibold`}>{tech}</span>
                        ))}
                        {project.technologies?.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-semibold">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">Get In Touch</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">Let's work together on something amazing!</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Contact Information</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">Feel free to reach out through any of these channels!</p>
                </div>

                <div className="space-y-6">
                  <motion.div whileHover={{ x: 10, scale: 1.02 }} className="relative flex items-center gap-4 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-red-200 dark:border-red-800 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg"><Mail className="text-white" size={28} /></div>
                    <div className="relative">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Email</p>
                      <a href="mailto:suryakumar56394@gmail.com" className="text-lg font-bold bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-400 dark:to-pink-400 bg-clip-text text-transparent hover:from-red-700 hover:to-pink-700 transition-all">suryakumar56394@gmail.com</a>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 10, scale: 1.02 }} className="relative flex items-center gap-4 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-blue-200 dark:border-blue-800 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative p-4 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg"><Phone className="text-white" size={28} /></div>
                    <div className="relative">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Phone</p>
                      <a href="tel:+919360004968" className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-cyan-700 transition-all">+91 9360004968</a>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 10, scale: 1.02 }} className="relative flex items-center gap-4 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-green-200 dark:border-green-800 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                    <div className="relative p-4 bg-[#25D366] rounded-2xl shadow-lg"><MessageCircle className="text-white" size={28} /></div>
                    <div className="relative">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">WhatsApp</p>
                      <a href="https://wa.me/919360004968" target="_blank" rel="noopener noreferrer" className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-700 transition-all">Chat on WhatsApp</a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold mb-2">Your Name</label>
                      <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="Surya Kumar M" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2">Your Email</label>
                      <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" placeholder="suryakumar56394@gmail.com" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold mb-2">Your Message</label>
                      <textarea id="message" required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none" placeholder="Tell me about your project..." />
                    </div>

                    <button type="submit" className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/50 flex items-center justify-center gap-2">
                      <Send size={20} /> Send Message
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedProject.longDescription || selectedProject.description}</p>

                {selectedProject.features?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3">Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      {selectedProject.features.map((feature: string, i: number) => (<li key={i}>{feature}</li>))}
                    </ul>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies?.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.a 
                    href="https://github.com/tnsurya7" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    <Github size={20} /> View Code
                  </motion.a>
                  <motion.a 
                    href={selectedProject.liveUrl || "https://github.com/tnsurya7"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all font-semibold"
                  >
                    <ExternalLink size={20} /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </>
  );
}

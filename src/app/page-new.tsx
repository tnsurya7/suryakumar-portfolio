'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { 
  Github, Linkedin, Instagram, Facebook, MessageCircle, 
  Mail, Phone, ExternalLink, Download, Award, Briefcase,
  GraduationCap, Send, Sparkles
} from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

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
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <div className="ml-0 lg:ml-24">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
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

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-primary-500 via-accent-500 to-secondary-500 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                Surya Kumar M
              </span>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-4 font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Developer
            </motion.p>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Passionate about building modern web applications with cutting-edge technologies.
              Transforming ideas into elegant, scalable solutions.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {socialLinks.map((link, index) => {
                const Icon = iconMap[link.platform.toLowerCase()] || Github;
                const colors = [
                  'from-primary-500 to-primary-600',
                  'from-secondary-500 to-secondary-600',
                  'from-accent-500 to-accent-600',
                  'from-success-500 to-success-600',
                  'from-pink-500 to-pink-600',
                ];
                return (
                  <motion.a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} text-white shadow-lg hover:shadow-xl transition-all`}
                  >
                    <Icon size={24} />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <Briefcase size={20} />
                View Projects
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border-2 border-primary-500 text-primary-600 dark:text-primary-400 rounded-2xl font-semibold hover:bg-primary-500 hover:text-white transition-all flex items-center gap-2"
              >
                <Mail size={20} />
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 rounded-full blur-3xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl bg-gradient-to-br from-primary-400 via-accent-400 to-secondary-400"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold">
                  SK
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-secondary-500 to-accent-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              My journey, education, and achievements
            </p>
          </motion.div>

          {/* Education */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl text-white">
                <GraduationCap size={28} />
              </div>
              Education
            </h3>
            <div className="grid gap-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <h4 className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">{edu.degree}</h4>
                  <p className="text-lg font-semibold mt-2">{edu.institution}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{edu.field}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(edu.startDate).getFullYear()} - {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                  </p>
                  {edu.grade && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Grade: {edu.grade}</p>}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Internships */}
          {internships.length > 0 && (
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl text-white">
                  <Briefcase size={28} />
                </div>
                Internships
              </h3>
              <div className="grid gap-6">
                {internships.map((intern, index) => (
                  <motion.div
                    key={intern.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <h4 className="text-2xl font-bold text-accent-600 dark:text-accent-400">{intern.position}</h4>
                    <p className="text-lg font-semibold mt-2">{intern.company}</p>
                    <p className="text-gray-600 dark:text-gray-400 mt-3">{intern.description}</p>
                    {intern.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {intern.technologies.map((tech: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {certificates.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl text-white">
                  <Award size={28} />
                </div>
                Certificates
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <h4 className="text-lg font-bold text-success-600 dark:text-success-400">{cert.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">{cert.issuer}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(cert.issueDate).toLocaleDateString()}
                    </p>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 text-success-600 dark:text-success-400 hover:underline text-sm"
                      >
                        View Credential <ExternalLink size={14} />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Skills Section - Continued in next message due to length */}
    </div>
  );
}

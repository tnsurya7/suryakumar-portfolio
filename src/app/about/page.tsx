'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Download, GraduationCap, Briefcase, Award } from 'lucide-react';

export default function AboutPage() {
  const [education, setEducation] = useState<any[]>([]);
  const [internships, setInternships] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/education').then(res => res.json()),
      fetch('/api/internships').then(res => res.json()),
      fetch('/api/certificates').then(res => res.json()),
    ]).then(([edu, intern, cert]) => {
      setEducation(edu);
      setInternships(intern);
      setCertificates(cert);
    }).catch(console.error);
  }, []);

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm a passionate Full Stack Developer with expertise in modern web technologies.
            I love creating elegant solutions to complex problems and continuously learning new skills.
          </p>
        </motion.div>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="text-primary-600" />
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">{edu.degree}</h3>
                <p className="text-lg font-semibold mt-1">{edu.institution}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{edu.field}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(edu.startDate).getFullYear()} - {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                </p>
                {edu.grade && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Grade: {edu.grade}</p>}
                {edu.description && <p className="text-gray-600 dark:text-gray-400 mt-3">{edu.description}</p>}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Internships */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Briefcase className="text-primary-600" />
            Internships
          </h2>
          <div className="space-y-6">
            {internships.map((intern, index) => (
              <motion.div
                key={intern._id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-400">{intern.position}</h3>
                <p className="text-lg font-semibold mt-1">{intern.company}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(intern.startDate).toLocaleDateString()} - {intern.current ? 'Present' : new Date(intern.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-3">{intern.description}</p>
                {intern.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {intern.technologies.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certificates */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Award className="text-primary-600" />
            Certificates
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400">{cert.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{cert.issuer}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Issued: {new Date(cert.issueDate).toLocaleDateString()}
                </p>
                {cert.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">{cert.description}</p>}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-primary-600 dark:text-primary-400 hover:underline text-sm"
                  >
                    View Credential →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Download Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary-500/50 flex items-center gap-2 mx-auto">
            <Download size={20} />
            Download Resume
          </button>
        </motion.div>
      </div>
    </div>
  );
}

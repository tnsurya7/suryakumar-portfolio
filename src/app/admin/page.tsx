'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Edit2, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [data, setData] = useState<any>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const ADMIN_PASSWORD = 'surya2024'; // Change this to your secure password

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      const res = await fetch('/api/portfolio-data');
      const portfolioData = await res.json();
      setData(portfolioData);
    } catch (error) {
      toast.error('Failed to load data');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast.success('Welcome, Surya!');
    } else {
      toast.error('Incorrect password');
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/portfolio-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success('Changes saved successfully!');
      }
    } catch (error) {
      toast.error('Failed to save changes');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md"
        >
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4">
            Default password: surya2024
          </p>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'social', label: 'Social Links' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'internships', label: 'Internships' },
    { id: 'certificates', label: 'Certificates' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              Portfolio Admin Panel
            </h1>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-success-500 to-success-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Save size={20} />
              Save All Changes
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, name: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={data.profile.title}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, title: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Bio</label>
                  <textarea
                    value={data.profile.bio}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, bio: e.target.value } })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, email: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    value={data.profile.phone}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, phone: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                  />
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Social Links</h2>
                {data.socialLinks.map((link: any, index: number) => (
                  <div key={link.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Platform</label>
                        <input
                          type="text"
                          value={link.platform}
                          onChange={(e) => {
                            const newLinks = [...data.socialLinks];
                            newLinks[index].platform = e.target.value;
                            setData({ ...data, socialLinks: newLinks });
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">URL</label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...data.socialLinks];
                            newLinks[index].url = e.target.value;
                            setData({ ...data, socialLinks: newLinks });
                          }}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Skills</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600">
                    <Plus size={20} /> Add Skill
                  </button>
                </div>
                <div className="grid gap-4">
                  {data.skills.map((skill: any, index: number) => (
                    <div key={skill.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <div className="grid md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...data.skills];
                            newSkills[index].name = e.target.value;
                            setData({ ...data, skills: newSkills });
                          }}
                          placeholder="Skill name"
                          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                        <input
                          type="text"
                          value={skill.category}
                          onChange={(e) => {
                            const newSkills = [...data.skills];
                            newSkills[index].category = e.target.value;
                            setData({ ...data, skills: newSkills });
                          }}
                          placeholder="Category"
                          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                        <input
                          type="number"
                          value={skill.level}
                          onChange={(e) => {
                            const newSkills = [...data.skills];
                            newSkills[index].level = parseInt(e.target.value);
                            setData({ ...data, skills: newSkills });
                          }}
                          placeholder="Level (0-100)"
                          min="0"
                          max="100"
                          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 text-center text-sm text-gray-500">
              Make your changes and click "Save All Changes" at the top
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

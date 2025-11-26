'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { motion } from 'framer-motion';
import { 
  Briefcase, GraduationCap, Award, MessageSquare, 
  Code, Link as LinkIcon, LogOut, Plus, Edit, Trash2, Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const router = useRouter();
  const { token, user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('projects');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    if (!token) {
      router.push('/admin/login');
    }
  }, [token, router]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [activeTab, token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${activeTab}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setData(data);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/${activeTab}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success('Deleted successfully');
        fetchData();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'social-links', label: 'Social Links', icon: LinkIcon },
    { id: 'contact', label: 'Messages', icon: MessageSquare },
  ];

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {user?.name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold capitalize">{activeTab}</h2>
            {activeTab !== 'contact' && (
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <Plus size={18} />
                Add New
              </button>
            )}
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : data.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No {activeTab} found. Click "Add New" to create one.
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-start p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {item.title || item.name || item.position || item.degree || item.platform || 'Message'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.description || item.company || item.institution || item.issuer || item.email || item.url}
                    </p>
                    {item.message && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                        "{item.message}"
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    {activeTab !== 'contact' && (
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowModal(true);
                        }}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit - Simplified version */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-4">
              {editingItem ? 'Edit' : 'Add'} {activeTab}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Use the API endpoints to add/edit items. Form implementation coming soon!
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

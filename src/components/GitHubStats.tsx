'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, BookOpen, Users } from 'lucide-react';

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface RepoData {
  stargazers_count: number;
  forks_count: number;
}

export default function GitHubStats({ username = 'tnsurya7' }: { username?: string }) {
  const [stats, setStats] = useState<GitHubData | null>(null);
  const [totalStars, setTotalStars] = useState(0);
  const [totalForks, setTotalForks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        ]);

        if (userRes.ok) {
          const userData: GitHubData = await userRes.json();
          setStats(userData);
        }

        if (reposRes.ok) {
          const repos: RepoData[] = await reposRes.json();
          const stars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
          const forks = repos.reduce((sum, r) => sum + r.forks_count, 0);
          setTotalStars(stars);
          setTotalForks(forks);
        }
      } catch {
        // silently fail — stats are optional
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [username]);

  const statItems = [
    { icon: BookOpen, label: 'Repositories', value: stats?.public_repos ?? 0, color: 'from-blue-500 to-indigo-600' },
    { icon: Star, label: 'Total Stars', value: totalStars, color: 'from-yellow-400 to-orange-500' },
    { icon: GitFork, label: 'Total Forks', value: totalForks, color: 'from-green-500 to-emerald-600' },
    { icon: Users, label: 'Followers', value: stats?.followers ?? 0, color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl text-white shadow-lg">
          <Github size={28} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">GitHub Activity</h3>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline">@{username}</a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statItems.map(({ icon: Icon, label, value, color }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-center"
          >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
              <Icon size={22} className="text-white" />
            </div>
            {loading ? (
              <div className="h-7 w-12 mx-auto bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1" />
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-gray-900 dark:text-white"
              >
                {value}
              </motion.p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Contribution graph embed */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">Contribution Graph</p>
        <img
          src={`https://ghchart.rshah.org/2563eb/${username}`}
          alt="GitHub contribution graph"
          className="w-full h-auto rounded-lg"
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
}

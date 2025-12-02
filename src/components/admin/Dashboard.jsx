import React, { useState, useEffect } from 'react';
import { Users, UserCheck, MessageSquare, Clock, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getAnalytics } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Stat Card Component
 */
const StatCard = ({ icon, title, value, change, color }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center shadow-lg`}>
        {icon}
      </div>
      <span className={`text-sm font-medium flex items-center gap-1 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
        <TrendingUp className="w-4 h-4" />
        {change}
      </span>
    </div>
    <h3 className="text-3xl font-bold mb-1">{value}</h3>
    <p className="text-sm text-gray-400">{title}</p>
  </div>
);

/**
 * Dashboard Component
 */
const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">Failed to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">Overview statistik website Anda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Total Users"
          value={analytics.overview.totalUsers.toLocaleString()}
          change="+12.5%"
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6" />}
          title="Active Users"
          value={analytics.overview.activeUsers.toLocaleString()}
          change="+8.2%"
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          icon={<MessageSquare className="w-6 h-6" />}
          title="Total Chats"
          value={analytics.overview.totalChats.toLocaleString()}
          change="+23.1%"
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          title="Avg Response"
          value={`${analytics.overview.avgResponseTime}s`}
          change="-0.3s"
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#8B5CF6" 
                strokeWidth={2}
                dot={{ fill: '#8B5CF6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Chat Activity Chart */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-4">Chat Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Bar dataKey="chats" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {analytics.recentActivity.map((activity) => {
            const timeDiff = Date.now() - new Date(activity.timestamp).getTime();
            const minutes = Math.floor(timeDiff / 60000);
            const timeAgo = minutes < 60 
              ? `${minutes} menit yang lalu`
              : `${Math.floor(minutes / 60)} jam yang lalu`;

            return (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-semibold">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-gray-400">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">{timeAgo}</span>
                  <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${
                    activity.category === 'coding' ? 'bg-blue-500/20 text-blue-400' :
                    activity.category === 'design' ? 'bg-orange-500/20 text-orange-400' :
                    activity.category === 'optimization' ? 'bg-green-500/20 text-green-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {activity.category}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

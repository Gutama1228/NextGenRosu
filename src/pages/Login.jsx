// ==================== src/pages/Login.jsx ====================
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/chat');
    } else {
      setError(result.error || 'Login gagal. Silakan coba lagi.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Roblox AI Studio
          </h1>
          <p className="text-gray-400 mt-2">Masuk ke akun Anda</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Masuk</span>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-400 font-semibold mb-2">🔐 Demo Credentials:</p>
            <p className="text-xs text-gray-400">Admin: admin@roblox.ai / password123</p>
            <p className="text-xs text-gray-400">User: user@roblox.ai / password123</p>
          </div>

          {/* Register Link */}
          <p className="text-center mt-6 text-sm text-gray-400">
            Belum punya akun?{' '}
            <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// ==================== src/pages/Register.jsx ====================
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    setLoading(true);

    const result = await register(name, email, password);
    
    if (result.success) {
      navigate('/chat');
    } else {
      setError(result.error || 'Registrasi gagal. Silakan coba lagi.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Roblox AI Studio
          </h1>
          <p className="text-gray-400 mt-2">Buat akun baru</p>
        </div>

        {/* Register Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-semibold transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <span>Daftar</span>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-gray-400">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

// ==================== src/pages/Home.jsx ====================
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code, Palette, Zap, BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Code Generation',
      description: 'Generate Lua/Luau code untuk game mechanics, systems, dan lebih banyak lagi',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'UI/UX Design',
      description: 'Dapatkan saran desain UI yang modern dan user-friendly untuk game Anda',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Optimization',
      description: 'Tips dan trik untuk meningkatkan performa game dan mengurangi lag',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Learning Resources',
      description: 'Tutorial lengkap dan penjelasan konsep dari dasar hingga advanced',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const benefits = [
    '24/7 AI Assistant yang selalu siap membantu',
    'Response cepat dengan kualitas tinggi',
    'Multi-category untuk hasil lebih akurat',
    'Syntax highlighting untuk code blocks',
    'Copy-paste code dengan mudah',
    'Gratis untuk semua developer'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg bg-black/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">Roblox AI Studio</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium hover:text-purple-400 transition-colors"
            >
              Masuk
            </Link>
            <Link 
              to="/register" 
              className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-medium mb-6">
          ✨ Powered by Claude AI
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          AI Assistant untuk
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Roblox Developers
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Tingkatkan produktivitas development Anda dengan AI assistant yang memahami Roblox Studio. 
          Dari coding hingga design, kami siap membantu!
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link 
            to="/register"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-purple-500/50"
          >
            Mulai Sekarang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/login"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold text-lg transition-all"
          >
            Lihat Demo
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Fitur Unggulan</h2>
          <p className="text-gray-400 text-lg">Tools lengkap untuk semua kebutuhan development Anda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Kenapa Memilih
              <br />
              <span className="text-purple-400">Roblox AI Studio?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Kami hadir untuk membuat proses development Anda lebih efisien, 
              produktif, dan menyenangkan. Dengan teknologi AI terbaru, 
              dapatkan solusi instant untuk setiap masalah development Anda.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="bg-black/50 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  👤
                </div>
                <div className="flex-1">
                  <div className="bg-white/10 rounded-lg p-3 text-sm">
                    Bagaimana cara membuat sistem inventory yang efficient?
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  🤖
                </div>
                <div className="flex-1">
                  <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-lg p-3 text-sm">
                    Saya akan bantu Anda membuat sistem inventory! Ini contoh code nya...
                    <div className="mt-2 bg-black/50 rounded p-2 font-mono text-xs text-green-400">
                      local Inventory = {"{}"}<br/>
                      function Inventory:AddItem(item)<br/>
                      &nbsp;&nbsp;-- implementation<br/>
                      end
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Siap Meningkatkan Development Anda?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Bergabung dengan ribuan developer yang sudah menggunakan Roblox AI Studio
          </p>
          <Link 
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 hover:bg-gray-100 rounded-xl font-semibold text-lg transition-all"
          >
            Daftar Gratis Sekarang
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>© 2024 Roblox AI Studio. Powered by Claude AI.</p>
          <p className="mt-2">Made with ❤️ for Roblox Developers</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Menu, X, Code, Palette, Sparkles, Zap, BookOpen, Copy, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useChat } from '../hooks/useChat';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import MessageItem from '../components/chat/MessageItem';
import { CATEGORIES, QUICK_PROMPTS } from '../utils/constants';

const Chat = () => {
  const { user } = useAuth();
  const { messages, loading, category, setCategory, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput('');
  };

  const handleQuickPrompt = (prompt) => {
    setInput(prompt.text);
    setCategory(prompt.category);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Header userName={user?.name} />
      
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          category={category}
          setCategory={setCategory}
          onQuickPrompt={handleQuickPrompt}
        />

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col h-[calc(100vh-120px)]">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <Sparkles className="w-16 h-16 mx-auto text-purple-400" />
                  <h2 className="text-2xl font-bold">Selamat datang, {user?.name}! 👋</h2>
                  <p className="text-gray-400">Mulai percakapan dengan memilih quick prompt atau ketik pertanyaan Anda</p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <MessageItem key={index} message={message} index={index} />
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
            <div className="flex gap-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-3 hover:bg-white/10 rounded-xl transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tanya sesuatu tentang Roblox Studio..."
                className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
              
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl px-6 py-3 font-medium transition-all flex items-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-400">
                Category: <span className="text-purple-400 font-medium">
                  {CATEGORIES.find(c => c.id === category)?.name}
                </span>
              </p>
              <p className="text-xs text-gray-400">
                Powered by Claude AI
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;

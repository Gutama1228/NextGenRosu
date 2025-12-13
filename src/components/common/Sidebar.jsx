import React from 'react';
import { Code, Palette, Sparkles, Zap, BookOpen } from 'lucide-react';
import { CATEGORIES, QUICK_PROMPTS } from '../../utils/constants';

const Sidebar = ({ isOpen, onClose, category, setCategory, onQuickPrompt }) => {
  const getIcon = (iconName) => {
    const icons = { Code, Palette, Sparkles, Zap, BookOpen };
    return icons[iconName] || Sparkles;
  };

  return (
    <aside className={`${
      isOpen ? 'block' : 'hidden'
    } md:block w-full md:w-64 space-y-4 absolute md:relative bg-slate-900/95 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none z-40`}>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const Icon = getIcon(cat.icon);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setCategory(cat.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  category === cat.id
                    ? `bg-gradient-to-r ${cat.color} shadow-lg scale-105`
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-semibold mb-3 text-gray-300">Quick Prompts</h3>
        <div className="space-y-2">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onQuickPrompt(prompt)}
              className="w-full text-left p-2 text-sm bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              {prompt.text}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
        <h3 className="text-sm font-semibold mb-2 text-gray-300">Tips</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          💡 Gunakan category yang sesuai untuk hasil lebih akurat. 
          Untuk coding, pilih "Coding". Untuk design, pilih "Design".
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;

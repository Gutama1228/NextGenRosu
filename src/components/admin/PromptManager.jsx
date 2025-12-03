import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Search, Filter } from 'lucide-react';
import { QUICK_PROMPTS, CATEGORIES } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Prompt Manager Component
 * Manage quick prompts for the chat interface
 */
const PromptManager = () => {
  const [prompts, setPrompts] = useState(QUICK_PROMPTS);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    text: '',
    category: 'general',
    description: ''
  });

  // Filter prompts
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || prompt.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle add new prompt
  const handleAdd = () => {
    setFormData({ text: '', category: 'general', description: '' });
    setEditingPrompt(null);
    setShowAddModal(true);
  };

  // Handle edit prompt
  const handleEdit = (prompt, index) => {
    setFormData(prompt);
    setEditingPrompt(index);
    setShowAddModal(true);
  };

  // Handle save prompt
  const handleSave = () => {
    if (!formData.text.trim()) {
      alert('Prompt text is required');
      return;
    }

    if (editingPrompt !== null) {
      // Update existing prompt
      const updated = [...prompts];
      updated[editingPrompt] = formData;
      setPrompts(updated);
    } else {
      // Add new prompt
      setPrompts([...prompts, formData]);
    }

    setShowAddModal(false);
    setFormData({ text: '', category: 'general', description: '' });
    setEditingPrompt(null);
  };

  // Handle delete prompt
  const handleDelete = (index) => {
    if (window.confirm('Yakin ingin menghapus prompt ini?')) {
      setPrompts(prompts.filter((_, i) => i !== index));
    }
  };

  // Handle duplicate prompt
  const handleDuplicate = (prompt) => {
    setPrompts([...prompts, { ...prompt, text: `${prompt.text} (Copy)` }]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Prompt Manager</h1>
          <p className="text-gray-400 mt-1">Kelola quick prompts untuk chat interface</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-2 rounded-lg font-medium transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add New Prompt
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white/10 border border-white/10 rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Count */}
          <div className="flex items-center px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg">
            <span className="text-sm font-medium">
              {filteredPrompts.length} prompts
            </span>
          </div>
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map((prompt, index) => {
          const category = CATEGORIES.find(c => c.id === prompt.category);
          const originalIndex = prompts.findIndex(p => p === prompt);

          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all group"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${category?.color} bg-opacity-20`}>
                  {category?.name}
                </span>
                
                {/* Actions Menu */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(prompt, originalIndex)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-blue-400"
                    title="Edit prompt"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDuplicate(prompt)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-green-400"
                    title="Duplicate prompt"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(originalIndex)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                    title="Delete prompt"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Prompt Text */}
              <p className="font-medium mb-2 line-clamp-2">{prompt.text}</p>
              
              {/* Description */}
              {prompt.description && (
                <p className="text-sm text-gray-400 line-clamp-2">{prompt.description}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPrompts.length === 0 && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No prompts found</h3>
          <p className="text-gray-400 mb-4">
            {searchTerm || filterCategory !== 'all' 
              ? 'Try adjusting your filters' 
              : 'Start by adding your first prompt'}
          </p>
          {!searchTerm && filterCategory === 'all' && (
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all"
            >
              <Plus className="w-5 h-5" />
              Add First Prompt
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingPrompt !== null ? 'Edit Prompt' : 'Add New Prompt'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Prompt Text */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Prompt Text <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  placeholder="e.g., Buat sistem inventory sederhana"
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  This will appear in the quick prompts sidebar
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of what this prompt does..."
                  rows={2}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              {/* Preview */}
              <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2 text-blue-400">Preview</h4>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      CATEGORIES.find(c => c.id === formData.category)?.color || 'bg-gray-500'
                    }`}>
                      {CATEGORIES.find(c => c.id === formData.category)?.name}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{formData.text || 'Your prompt text here...'}</p>
                  {formData.description && (
                    <p className="text-xs text-gray-400 mt-1">{formData.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-white/10">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-medium transition-all shadow-lg"
              >
                <Save className="w-5 h-5" />
                {editingPrompt !== null ? 'Update Prompt' : 'Add Prompt'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <p className="text-sm text-gray-400 mb-1">Total Prompts</p>
          <p className="text-2xl font-bold">{prompts.length}</p>
        </div>
        {CATEGORIES.map((cat, idx) => (
          <div key={cat.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <p className="text-sm text-gray-400 mb-1">{cat.name}</p>
            <p className="text-2xl font-bold">
              {prompts.filter(p => p.category === cat.id).length}
            </p>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-purple-500/10 border border-purple-500/50 rounded-xl p-4">
        <p className="text-sm">
          💡 <strong>Pro Tip:</strong> Good prompts are specific, actionable, and categorized correctly. 
          Users can click these prompts in the chat sidebar to quickly start conversations.
        </p>
      </div>
    </div>
  );
};

export default PromptManager;

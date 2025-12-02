import React, { createContext, useState, useEffect } from 'react';
import { sendMessage as apiSendMessage } from '../services/anthropic';
import { STORAGE_KEYS } from '../utils/constants';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('general');
  const [error, setError] = useState(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const loadChatHistory = () => {
      try {
        const savedHistory = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory);
          setMessages(parsed);
        } else {
          // Set initial welcome message
          setMessages([
            {
              role: 'assistant',
              content: 'Halo! Saya AI Assistant untuk Roblox Studio. Saya siap membantu Anda dengan:\n\n• Menulis & debug kode Lua/Luau\n• Membuat sistem game (inventory, shop, combat, dll)\n• Desain UI/UX untuk game Anda\n• Optimasi performa & best practices\n• Tips & trik development\n\nAda yang bisa saya bantu hari ini?',
              timestamp: new Date().toISOString(),
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        setMessages([]);
      }
    };

    loadChatHistory();
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    }
  }, [messages]);

  /**
   * Send a message to AI
   * @param {string} content - Message content
   */
  const sendMessage = async (content) => {
    if (!content || !content.trim()) {
      return;
    }

    // Add user message
    const userMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setError(null);

    try {
      // Call AI API
      const response = await apiSendMessage(content, messages, category);

      // Add assistant message
      const assistantMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
        category: category,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message);

      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: '❌ Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi.\n\nError: ' + err.message,
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retry last failed message
   */
  const retryLastMessage = async () => {
    // Find last user message
    const lastUserMessage = messages
      .slice()
      .reverse()
      .find(msg => msg.role === 'user');

    if (lastUserMessage) {
      // Remove last error message if exists
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isError);
        return filtered;
      });

      // Resend
      await sendMessage(lastUserMessage.content);
    }
  };

  /**
   * Clear all messages
   */
  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
    setError(null);
  };

  /**
   * Delete specific message
   * @param {number} index - Message index
   */
  const deleteMessage = (index) => {
    setMessages(prev => prev.filter((_, i) => i !== index));
  };

  /**
   * Edit message (user messages only)
   * @param {number} index - Message index
   * @param {string} newContent - New content
   */
  const editMessage = (index, newContent) => {
    setMessages(prev => {
      const updated = [...prev];
      if (updated[index] && updated[index].role === 'user') {
        updated[index] = {
          ...updated[index],
          content: newContent,
          edited: true,
        };
      }
      return updated;
    });
  };

  /**
   * Change category and optionally clear chat
   * @param {string} newCategory - New category
   * @param {boolean} clearChat - Whether to clear chat
   */
  const changeCategory = (newCategory, clearChat = false) => {
    setCategory(newCategory);
    if (clearChat) {
      clearMessages();
    }
  };

  /**
   * Export chat history as text
   * @returns {string} Chat history as formatted text
   */
  const exportChatHistory = () => {
    return messages
      .map(msg => {
        const timestamp = new Date(msg.timestamp).toLocaleString('id-ID');
        const role = msg.role === 'user' ? 'Anda' : 'AI';
        return `[${timestamp}] ${role}:\n${msg.content}\n`;
      })
      .join('\n---\n\n');
  };

  /**
   * Get message count by role
   * @returns {Object} Message counts
   */
  const getMessageStats = () => {
    const userMessages = messages.filter(msg => msg.role === 'user').length;
    const assistantMessages = messages.filter(msg => msg.role === 'assistant').length;
    const totalMessages = messages.length;

    return {
      user: userMessages,
      assistant: assistantMessages,
      total: totalMessages,
    };
  };

  /**
   * Check if there are any messages
   * @returns {boolean}
   */
  const hasMessages = () => {
    return messages.length > 0;
  };

  /**
   * Get last message
   * @returns {Object|null}
   */
  const getLastMessage = () => {
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

  const value = {
    // State
    messages,
    loading,
    category,
    error,

    // Methods
    sendMessage,
    retryLastMessage,
    clearMessages,
    deleteMessage,
    editMessage,
    changeCategory,
    setCategory,
    exportChatHistory,
    getMessageStats,
    hasMessages,
    getLastMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

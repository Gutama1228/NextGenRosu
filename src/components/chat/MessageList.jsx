import React, { useRef, useEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import MessageItem from './MessageItem';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Message List Component
 * Displays all chat messages with auto-scroll
 */
const MessageList = () => {
  const { messages, loading } = useChat();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto space-y-4 mb-4 px-2 custom-scrollbar"
    >
      {/* Messages */}
      {messages.map((message, index) => (
        <MessageItem 
          key={`${message.timestamp}-${index}`}
          message={message} 
          index={index}
        />
      ))}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-start animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <LoadingSpinner size="sm" />
          </div>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

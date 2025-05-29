import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 border-t border-gray-200 bg-white p-4"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about crypto investments..."
        className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <button 
        type="submit" 
        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        disabled={!message.trim()}
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
};

export default ChatInput;

// handles user imput with a text field and send button
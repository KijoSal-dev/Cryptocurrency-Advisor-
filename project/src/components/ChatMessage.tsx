import React from 'react';
import { Message } from '../types';
import { ArrowUpRight, User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  const formatMessageText = (text: string) => {
    // Split by newlines and convert to paragraphs
    return text.split('\n').map((line, i) => (
      <p key={i} className={`${i > 0 ? 'mt-2' : ''}`}>{line}</p>
    ));
  };

  return (
    <div 
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      style={{ 
        animationName: 'slideIn', 
        animationDuration: '0.3s',
        animationFillMode: 'forwards'
      }}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
        <div 
          className={`flex items-center justify-center rounded-full h-8 w-8 mt-1 
            ${isUser ? 'ml-2 bg-blue-600' : 'mr-2 bg-emerald-600'}`}
        >
          {isUser ? 
            <User className="h-4 w-4 text-white" /> : 
            <Bot className="h-4 w-4 text-white" />
          }
        </div>
        
        <div 
          className={`rounded-2xl px-4 py-3 
            ${isUser ? 
              'bg-blue-600 text-white rounded-tr-none' : 
              'bg-gray-200 text-gray-800 rounded-tl-none'
            }`}
        >
          {formatMessageText(message.text)}
          
          {/* Display crypto symbols/icons for bot messages that contain cryptocurrency recommendations */}
          {!isUser && (message.text.includes('BTC') || message.text.includes('ETH') || message.text.includes('ADA')) && (
            <div className="flex items-center mt-2 text-xs font-medium">
              {message.text.includes('BTC') && (
                <span className="bg-orange-500 text-white rounded-full px-2 py-1 mr-1 flex items-center">
                  BTC <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              )}
              {message.text.includes('ETH') && (
                <span className="bg-indigo-500 text-white rounded-full px-2 py-1 mr-1 flex items-center">
                  ETH <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              )}
              {message.text.includes('ADA') && (
                <span className="bg-blue-500 text-white rounded-full px-2 py-1 mr-1 flex items-center">
                  ADA <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              )}
              {message.text.includes('SOL') && (
                <span className="bg-purple-500 text-white rounded-full px-2 py-1 mr-1 flex items-center">
                  SOL <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              )}
              {message.text.includes('XRP') && (
                <span className="bg-gray-700 text-white rounded-full px-2 py-1 mr-1 flex items-center">
                  XRP <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              )}
            </div>
          )}
          
          <div 
            className={`text-xs mt-1 
              ${isUser ? 'text-blue-200' : 'text-gray-500'}`}
          >
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

// renders individual chat messages with user styling and bot styling
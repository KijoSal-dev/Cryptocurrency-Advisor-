import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message } from '../types';
import { generateId, processUserMessage } from '../services/chatbotService';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom of the messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Send welcome message when the component mounts
  useEffect(() => {
    const welcomeMessage: Message = {
      id: generateId(),
      text: "👋 Hi there! I'm CryptoBuddy, your AI crypto advisor. I can help you find sustainable and profitable cryptocurrencies. Ask me about trending coins, sustainability scores, or investment advice!",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Process the message and generate bot response with a small delay
    setTimeout(() => {
      const botResponse = processUserMessage(text);
      
      const botMessage: Message = {
        id: generateId(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };
  
  return (
    <div className="flex h-full flex-col rounded-lg overflow-hidden border border-gray-200 shadow-lg bg-white">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold flex items-center">
          <span className="mr-2 text-2xl">💰</span> CryptoBuddy Advisor
        </h1>
        <p className="text-sm text-blue-100">Your AI assistant for sustainable crypto investments</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isTyping && (
          <div className="flex items-center space-x-2 text-gray-500 mb-4">
            <div className="flex space-x-1">
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce\" style={{ animationDelay: '0ms' }}></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span className="text-sm">CryptoBuddy is typing...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
      
      <div className="p-2 text-xs text-center text-gray-500 bg-gray-100 border-t border-gray-200">
        Disclaimer: This is a demo chatbot. Cryptocurrency investments carry risk—always do your own research!
      </div>
    </div>
  );
};

export default ChatInterface;

// This is the core chat component that manages messages and chat logic.
import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { askZenQuestion } from '../services/geminiService';

interface Props {
  lang: Language;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

const ZenChat: React.FC<Props> = ({ lang }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = getTranslation(lang);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await askZenQuestion(userMessage.text, lang);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t.chat_error,
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-zen-bg">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm border-b border-stone-100 flex items-center justify-center z-10">
        <h2 className="font-serif text-lg text-stone-800 font-bold tracking-widest">{t.chat_title}</h2>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-stone-400 opacity-70">
            <div className="text-4xl mb-4">🪷</div>
            <p className="font-serif text-sm">{t.chat_placeholder}</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.3s_ease-out]`}>
            <div 
              className={`max-w-[80%] p-4 rounded-2xl shadow-sm font-serif text-sm leading-relaxed
                ${msg.isUser 
                  ? 'bg-zen-brown text-stone-50 rounded-tr-sm' 
                  : 'bg-white text-stone-700 border border-stone-100 rounded-tl-sm'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-[fadeIn_0.3s_ease-out]">
            <div className="bg-white text-stone-500 border border-stone-100 p-4 rounded-2xl rounded-tl-sm shadow-sm font-serif text-sm flex items-center space-x-2">
              <div className="w-2 h-2 bg-zen-gold rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-zen-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-zen-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              <span className="ml-2">{t.chat_loading}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-stone-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.chat_placeholder}
            className="flex-1 bg-zen-bg border border-stone-200 text-stone-700 rounded-full px-4 py-3 outline-none focus:border-zen-gold transition-colors text-sm font-serif"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-full flex items-center justify-center transition-colors
              ${!input.trim() || isLoading 
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                : 'bg-zen-gold text-white hover:bg-amber-600 active:scale-95'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZenChat;

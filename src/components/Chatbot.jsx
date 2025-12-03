import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Bot, Sparkles, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Chatbot = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ type: 'bot', text: t.chatbot.welcome }]);
    }
  }, [isOpen, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleOptionClick = (optionIndex) => {
    const options = [
      t.chatbot.options[0], t.chatbot.options[1], t.chatbot.options[2], t.chatbot.options[3]
    ];
    
    setMessages(prev => [...prev, { type: 'user', text: options[optionIndex] }]);

    setTimeout(() => {
      let reply = "";
      switch(optionIndex) {
        case 0: reply = t.chatbot.answers.python; break;
        case 1: reply = t.chatbot.answers.auto; break;
        case 2: reply = t.chatbot.answers.contact; break;
        case 3: reply = t.chatbot.answers.tcc; break;
        default: reply = "Posso ajudar em algo mais?";
      }
      setMessages(prev => [...prev, { type: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* BOTÃO FLUTUANTE CLEAN */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-white/20 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare size={24} fill="currentColor" />
        {/* Notificaçãozinha vermelha pra chamar atenção */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
      </motion.button>

      {/* JANELA DO CHAT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-6 z-50 w-80 md:w-96 glass-panel rounded-2xl overflow-hidden flex flex-col h-[500px] shadow-2xl border border-white/10 backdrop-blur-xl bg-[#0a0a0a]/95"
          >
            {/* --- HEADER PADRÃO (Ícone + Texto) --- */}
            <div className="bg-gradient-to-r from-blue-900/40 to-black/60 p-4 border-b border-white/10 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                {/* Avatar do Bot (Ícone) */}
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/20">
                    <Bot size={20} className="text-white" />
                </div>
                <div>
                    <span className="font-bold block text-sm text-white tracking-wide">{t.chatbot.header}</span>
                    <span className="text-[10px] text-green-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> 
                        Online Assistant
                    </span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/50 hover:text-white transition bg-white/5 rounded-full p-1.5 hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* --- ÁREA DE MENSAGENS --- */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 bg-black/20">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                  
                  {/* Ícone pequeno do Bot ao lado da mensagem */}
                  {msg.type === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 mb-1">
                        <Bot size={12} className="text-blue-400" />
                    </div>
                  )}

                  <div className={`max-w-[80%] p-3 text-xs md:text-sm leading-relaxed shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-2xl rounded-br-none' 
                      : 'bg-white/10 text-gray-200 rounded-2xl rounded-bl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Ícone pequeno do User */}
                  {msg.type === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 mb-1">
                        <User size={12} className="text-blue-400" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* --- OPÇÕES (FOOTER) --- */}
            <div className="p-3 bg-black/60 border-t border-white/5 backdrop-blur-md">
               <div className="flex items-center gap-2 mb-2 text-xs text-blue-400 font-mono pl-1">
                 <Sparkles size={12} />
                 {t.chatbot.input_placeholder}
               </div>
               <div className="grid grid-cols-1 gap-2">
                 {t.chatbot.options.map((opt, idx) => (
                   <button 
                     key={idx}
                     onClick={() => handleOptionClick(idx)}
                     className="text-left text-xs px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition border border-white/5 hover:border-blue-500/40 active:scale-[0.98] flex items-center justify-between group"
                   >
                     {opt}
                     <span className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">→</span>
                   </button>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
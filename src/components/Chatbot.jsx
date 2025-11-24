import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Bot, Sparkles } from 'lucide-react';
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
      t.chatbot.options[0], 
      t.chatbot.options[1], 
      t.chatbot.options[2], 
      t.chatbot.options[3]
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
      {/* Botão Flutuante - Agora em bottom-8 (mais baixo) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_200%] animate-gradient text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] border border-white/20 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Janela do Chat - Também ajustada para bottom-8 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-6 z-50 w-80 md:w-96 glass-panel rounded-2xl overflow-hidden flex flex-col h-[500px] shadow-2xl border border-white/10 backdrop-blur-xl bg-[#0a0a0a]/80"
          >
            {/* Header */}
            <div className="bg-white/5 border-b border-white/5 p-4 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <Bot size={18} />
                </div>
                <div>
                    <span className="font-bold block text-sm">{t.chatbot.header}</span>
                    <span className="text-[10px] text-green-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
                    </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' 
                      : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input / Opções */}
            <div className="p-4 border-t border-white/5 bg-black/20">
               <div className="flex items-center gap-2 mb-3 text-xs text-blue-400 font-mono">
                 <Sparkles size={12} />
                 {t.chatbot.input_placeholder}
               </div>
               <div className="grid grid-cols-1 gap-2">
                 {t.chatbot.options.map((opt, idx) => (
                   <button 
                     key={idx}
                     onClick={() => handleOptionClick(idx)}
                     className="text-left text-xs md:text-sm px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition border border-white/5 hover:border-blue-500/40 active:scale-[0.98]"
                   >
                     {opt}
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
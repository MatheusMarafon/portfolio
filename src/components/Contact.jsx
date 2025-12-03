import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        setStatus(t.contact.success);
        form.reset();
      } else {
        setStatus(t.contact.error);
      }
    }).catch(error => setStatus(t.contact.error));
  };

  return (
    <section id="contato" className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Card Principal Unificado */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            {/* Efeito de brilho no fundo */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="grid lg:grid-cols-5 min-h-[500px]">
                
                {/* Coluna Esquerda: Informações (Visual mais escuro) */}
                <div className="lg:col-span-2 bg-black/40 p-8 md:p-12 flex flex-col justify-between border-r border-white/5">
                    <div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                            <MessageCircle className="text-white" size={24} />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white">
                            {t.contact.title} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{t.contact.title_highlight}</span>
                        </h2>
                        <p className="text-gray-400 leading-relaxed">
                            {t.contact.desc}
                        </p>
                    </div>

                    <div className="space-y-6 mt-12">
                        <a href="mailto:contato@email.com" className="flex items-center gap-4 text-gray-300 hover:text-white transition group">
                            <div className="p-3 rounded-lg bg-white/5 group-hover:bg-blue-500/20 transition"><Mail size={20} className="text-blue-400" /></div>
                            <span className="text-sm">marafonmatheus1@gmail.com</span>
                        </a>
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="p-3 rounded-lg bg-white/5"><MapPin size={20} className="text-purple-400" /></div>
                            <span className="text-sm">Campinas, SP - Brasil</span>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="p-3 rounded-lg bg-white/5"><Phone size={20} className="text-green-400" /></div>
                            <span className="text-sm">+55 (11) 97175-4304</span>
                        </div>
                    </div>
                </div>

                {/* Coluna Direita: Formulário */}
                <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                    <form onSubmit={handleSubmit} action="https://formspree.io/f/xrbyayjl" method="POST" className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-blue-400 ml-1">{t.contact.name_label}</label>
                                <input type="text" name="name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:bg-white/10 transition outline-none" placeholder={t.contact.name_placeholder} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-mono text-purple-400 ml-1">{t.contact.email_label}</label>
                                <input type="email" name="_replyto" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 focus:bg-white/10 transition outline-none" placeholder={t.contact.email_placeholder} required />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-gray-400 ml-1">{t.contact.msg_label}</label>
                            <textarea name="message" rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:bg-white/10 transition outline-none resize-none" placeholder={t.contact.msg_placeholder} required></textarea>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <p className="text-sm text-gray-500 hidden md:block">Responderemos em até 24h.</p>
                            <button type="submit" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg shadow-blue-900/20 flex items-center gap-2 transform hover:-translate-y-1">
                                {t.contact.btn_send} <Send size={18} />
                            </button>
                        </div>
                        {status && <p className="text-center text-green-400 font-mono text-sm bg-green-500/10 py-2 rounded-lg border border-green-500/20">{status}</p>}
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
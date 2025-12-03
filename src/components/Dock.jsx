import React from 'react';
import { Home, User, Code, Mail, Linkedin, Github, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Dock = ({ toggleTerminal }) => {
    const { t } = useLanguage();
    
    const icons = [
        { icon: <Home size={20} />, label: t.dock.home, href: "#" },
        { icon: <User size={20} />, label: t.dock.about, href: "#sobre" },
        { icon: <Code size={20} />, label: t.dock.projects, href: "#projetos" },
        { icon: <Mail size={20} />, label: t.dock.contact, href: "#contato" },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
            <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-4 shadow-2xl shadow-blue-500/10">
                {icons.map((item, index) => (
                    <motion.a 
                        key={index}
                        href={item.href}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-blue-400 transition border border-transparent hover:border-white/10 relative group"
                    >
                        {item.icon}
                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap border border-gray-800">
                            {item.label}
                        </span>
                    </motion.a>
                ))}
                
                {/* Divisor */}
                <div className="w-px h-8 bg-white/10 mx-1"></div>

                {/* Botão do Terminal (VERIFIQUE SE ISSO APARECE NA TELA) */}
                <motion.button 
                    onClick={toggleTerminal}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-black border border-green-500/30 text-green-400 hover:text-green-300 hover:shadow-[0_0_10px_rgba(74,222,128,0.5)] transition relative group"
                >
                    <TerminalIcon size={20} />
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap border border-gray-800 font-mono">
                        Python Shell
                    </span>
                </motion.button>

                <div className="w-px h-8 bg-white/10 mx-1"></div>

                <motion.a 
                    href="https://github.com/MatheusMarafon" target="_blank"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="p-3 text-gray-400 hover:text-white transition"
                >
                    <Github size={20} />
                </motion.a>
                <motion.a 
                    href="https://linkedin.com" target="_blank"
                    whileHover={{ scale: 1.2, y: -5 }}
                    className="p-3 text-gray-400 hover:text-blue-500 transition"
                >
                    <Linkedin size={20} />
                </motion.a>
            </div>
        </div>
    );
};

export default Dock;
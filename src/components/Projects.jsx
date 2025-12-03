import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Smartphone, Brain, Zap, Globe, FileText, Code2, Database, Github, ExternalLink, ArrowRight, Star, Users } from 'lucide-react';

const icons = [<Smartphone />, <Brain />, <Zap />, <Globe />, <FileText />, <Code2 />, <Database />];

const colors = [
  "text-orange-400", "text-pink-400", "text-cyan-400", 
  "text-purple-400", "text-emerald-400", "text-blue-400", "text-red-400"
];

const bgColors = [
  "bg-orange-500/10", "bg-pink-500/10", "bg-cyan-500/10", 
  "bg-purple-500/10", "bg-emerald-500/10", "bg-blue-500/10", "bg-red-500/10"
];

const tags = [
    ["Python", "Django", "React Native"], ["React", "Gemini AI"], ["Python", "Selenium"], 
    ["Django", "Education"], ["Python", "Regex"], ["JS", "Frontend"], ["VBA", "SQL"]
];

const projectLinks = [
    { repo: "https://github.com/MatheusMarafon/vetech", demo: "" },
    { repo: "https://github.com/MatheusMarafon/mapa-mental-ia", demo: "https://mapa-mental-ia.vercel.app/" },
    { repo: "https://github.com/MatheusMarafon/bot-ccee", demo: "/demo_ccee.html" },
    { repo: "https://github.com/MatheusMarafon/projeto-estudo", demo: "https://projeto-estudo.onrender.com/" },
    { repo: "https://github.com/MatheusMarafon/automacao-faturas", demo: "/demo_fatura.html" },
    { repo: "https://github.com/MatheusMarafon/sistema-gestao-port", demo: "https://sistema-gestao-port.onrender.com" },
    { repo: "https://github.com/MatheusMarafon/automacao-vba", demo: "/demo_vba.html" }
];

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border border-white/10 bg-gray-900/50 overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const Projects = () => {
  const { t } = useLanguage();

  return (
    <section id="projetos" className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center md:text-left"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {t.projects.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{t.projects.title_highlight}</span>
                </h2>
                <p className="text-gray-400 max-w-2xl text-lg">{t.projects.subtitle}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {t.projects.items.map((proj, index) => {
                    const isFeature = index === 0;
                    
                    // LÓGICA INTELIGENTE DE LINK
                    const demoLink = projectLinks[index].demo;
                    const isOnline = demoLink.startsWith('http'); // Verifica se é link externo
                    
                    const btnText = isOnline ? t.projects.btn_live : t.projects.btn_demo;
                    const btnIcon = isOnline ? <Globe size={16} /> : <ExternalLink size={16} />;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={isFeature ? "md:col-span-2 lg:col-span-3" : ""}
                        >
                            <SpotlightCard className={`h-full flex flex-col hover:shadow-2xl transition-shadow duration-500 group ${isFeature ? 'bg-gradient-to-br from-gray-900 to-gray-800' : ''}`}>
                                
                                <div className={`p-8 flex h-full ${isFeature ? 'flex-col lg:flex-row gap-8 lg:items-center' : 'flex-col'}`}>
                                    
                                    <div className={isFeature ? "lg:w-1/3" : "flex justify-between items-start mb-6"}>
                                        <div className="flex justify-between w-full mb-4 lg:mb-0">
                                            <div className={`p-3 rounded-2xl ${bgColors[index]} ${colors[index]} border border-white/5`}>
                                                {React.cloneElement(icons[index], { size: isFeature ? 32 : 28 })}
                                            </div>
                                            {!isFeature && (
                                                <a href={projectLinks[index].repo} target="_blank" className="text-gray-500 hover:text-white transition">
                                                    <Github size={20} />
                                                </a>
                                            )}
                                        </div>
                                        {isFeature && (
                                            <div className="hidden lg:block mt-4">
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-4">
                                                    <Users size={12} fill="currentColor" /> {isFeature ? "CO-AUTORIA / TCC" : ""}
                                                </span>
                                                <h3 className="text-3xl font-bold text-white mb-2">{proj.title}</h3>
                                                <p className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-2">{proj.subtitle}</p>
                                                
                                                {proj.my_role && (
                                                    <div className="mt-4 p-3 rounded-lg bg-white/5 border-l-2 border-blue-500">
                                                        <p className="text-xs text-gray-400 font-mono">MINHA CONTRIBUIÇÃO:</p>
                                                        <p className="text-sm font-bold text-white">{proj.my_role}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className={`flex flex-col ${isFeature ? 'lg:w-2/3' : 'flex-grow'}`}>
                                        {!isFeature && (
                                            <div className="mb-6 flex-grow">
                                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                                                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-4">{proj.subtitle}</p>
                                                <p className="text-gray-400 leading-relaxed text-sm">{proj.description}</p>
                                            </div>
                                        )}
                                        {isFeature && (
                                            <div className="lg:hidden mb-6">
                                                <h3 className="text-2xl font-bold text-white mb-2">{proj.title}</h3>
                                                {proj.my_role && (
                                                    <div className="my-4 p-3 rounded-lg bg-white/5 border-l-2 border-blue-500">
                                                        <p className="text-xs text-gray-400 font-mono">MINHA CONTRIBUIÇÃO:</p>
                                                        <p className="text-sm font-bold text-white">{proj.my_role}</p>
                                                    </div>
                                                )}
                                                <p className="text-gray-400 leading-relaxed text-sm">{proj.description}</p>
                                            </div>
                                        )}
                                        {isFeature && (
                                            <p className="hidden lg:block text-gray-400 leading-relaxed text-lg mb-6">{proj.description}</p>
                                        )}

                                        <div className="mt-auto">
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {tags[index].map(tag => (
                                                    <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] text-gray-300 font-medium border border-white/5">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex gap-4">
                                                {demoLink !== "" ? (
                                                    <a 
                                                        href={demoLink} 
                                                        target="_blank" 
                                                        className={`flex items-center gap-2 text-sm font-bold transition group/btn ${isOnline ? 'text-blue-400 hover:text-blue-300' : 'text-white hover:text-blue-400'}`}
                                                    >
                                                        {isOnline ? t.projects.btn_live : t.projects.btn_demo} 
                                                        {isOnline ? <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" /> : <ExternalLink size={16} />}
                                                    </a>
                                                ) : (
                                                    <span className="flex items-center gap-2 text-sm font-bold text-gray-600 cursor-not-allowed">Em Breve</span>
                                                )}
                                                
                                                {isFeature && (
                                                     <a href={projectLinks[index].repo} target="_blank" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition">
                                                        <Github size={16} /> Código
                                                     </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </section>
  );
};

export default Projects;
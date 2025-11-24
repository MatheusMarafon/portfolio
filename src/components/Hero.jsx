import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Terminal, Cpu, Code2, Download, GraduationCap, Briefcase } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  // Lista REAL de tecnologias que você domina
  const realStack = ['Python', 'SQL', 'Django', 'Selenium', 'Pandas', 'VBA', 'JavaScript'];

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Hero Card */}
            <div className="lg:col-span-8 glass-panel rounded-3xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition duration-500">
                    <Code2 size={120} />
                </div>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono mb-6">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        {t.hero.badge}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
                        Matheus <br />
                        <span className="text-gradient">Marafon</span>
                    </h1>

                    <div className="text-xl md:text-2xl text-gray-400 font-mono h-[60px] flex items-center">
                        <span className="mr-2 text-purple-500">{'>'}</span>
                        <TypeAnimation
                            key={t.hero.role}
                            sequence={[
                                t.hero.roles[0], 1000,
                                t.hero.roles[1], 1000,
                                t.hero.roles[2], 1000,
                                t.hero.roles[3], 1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                </motion.div>
            </div>

            {/* Side Stats Cards - Bento Grid */}
            <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Tech Stack Tilt Card (ATUALIZADO) */}
                <Tilt glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffffff" glarePosition="all" scale={1.02} className="flex-1">
                    <div className="glass-panel rounded-3xl p-8 h-full flex flex-col justify-between hover:border-blue-500/50 transition duration-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-white">Stack</h3>
                                <p className="text-gray-400 text-sm">Core Technologies</p>
                            </div>
                            <Cpu className="text-blue-500" />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {realStack.map(tech => (
                                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-300 hover:bg-white/10 transition cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </Tilt>

                {/* Info & CV Card */}
                <Tilt glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffffff" glarePosition="all" scale={1.02} className="flex-1">
                    <div className="glass-panel rounded-3xl p-6 h-full flex flex-col justify-between hover:border-purple-500/50 transition duration-500 gap-4">
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                <Briefcase className="text-blue-400 mb-2" size={20} />
                                <h3 className="text-xl font-bold text-white">{t.hero.stats.exp_value}</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{t.hero.stats.exp_label}</p>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                <GraduationCap className="text-purple-400 mb-2" size={20} />
                                <h3 className="text-xl font-bold text-white">{t.hero.stats.edu_value}</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{t.hero.stats.edu_label}</p>
                            </div>
                        </div>

                        <a 
                            href="/assets/curriculo.pdf" 
                            download 
                            className="w-full mt-2 group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-[1px] transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <div className="relative flex items-center justify-center gap-2 rounded-xl bg-slate-950/90 px-4 py-3 text-sm font-bold text-white transition-all group-hover:bg-transparent">
                                <Download size={16} className="group-hover:animate-bounce" />
                                {t.hero.stats.cv_btn}
                            </div>
                        </a>

                    </div>
                </Tilt>
            </div>
        </div>
    </section>
  );
};

export default Hero;
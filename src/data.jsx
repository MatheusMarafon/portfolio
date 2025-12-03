import React from 'react';
import { 
  Database, Code2, Globe, Server, Brain, Smartphone, 
  FileText, Zap, GraduationCap, Briefcase, Lightbulb, School 
} from 'lucide-react';

export const timelineData = [
  {
    year: "2025",
    title: "Reta Final & TCC",
    subtitle: "VeTech Ecosystem",
    description: "Desenvolvimento full-stack (Web/Mobile) de sistema veterinário com IA.",
    icon: <GraduationCap size={20} />,
    color: "text-blue-400"
  },
  {
    year: "2025",
    title: "Engenheiro de Automação",
    subtitle: "Setor Energético",
    description: "Automação crítica de processos usando Python, VBA e SQL. Criação de simuladores de tarifa.",
    icon: <Briefcase size={20} />,
    color: "text-purple-400"
  },
  {
    year: "2024",
    title: "Inovação com IA",
    subtitle: "SaaS Solar",
    description: "Algoritmos de recomendação para eficiência energética fotovoltaica.",
    icon: <Lightbulb size={20} />,
    color: "text-yellow-400"
  },
  {
    year: "2023",
    title: "Mobile First",
    subtitle: "App de Saúde",
    description: "App para dentistas com geolocalização e UX focada em emergências.",
    icon: <Smartphone size={20} />,
    color: "text-green-400"
  },
  {
    year: "2022",
    title: "Início da Jornada",
    subtitle: "PUCC - Eng. Software",
    description: "Fundamentos de algoritmos, C++, Java e primeiros passos na Web.",
    icon: <School size={20} />,
    color: "text-gray-400"
  }
];

export const projectsData = [
  {
    title: "VeTech Ecosystem",
    subtitle: "Full-Stack TCC",
    description: "Ecossistema completo para gestão veterinária. App Mobile (React Native) + Web Dashboard (Django). IA para diagnósticos preliminares.",
    tags: ["Python", "Django", "React Native", "AI"],
    color: "from-yellow-400 to-orange-500",
    icon: <Smartphone />,
    link: "https://github.com/MatheusMarafon/vetech"
  },
  {
    title: "Mapa Mental IA",
    subtitle: "EdTech Innovation",
    description: "Ferramenta de estudo que gera mapas mentais visuais automaticamente a partir de textos usando a API do Gemini.",
    tags: ["React", "Flow", "Gemini API"],
    color: "from-pink-500 to-rose-500",
    icon: <Brain />,
    link: "https://mapa-mental-ia.vercel.app/"
  },
  {
    title: "Auto-Bot CCEE",
    subtitle: "Enterprise Automation",
    description: "Bot de alta performance para scraping de dados públicos do setor elétrico. Reduziu o tempo de coleta de horas para minutos.",
    tags: ["Python", "Selenium", "Data"],
    color: "from-blue-400 to-cyan-500",
    icon: <Zap />,
    link: "/demo_ccee.html"
  },
  {
    title: "App de Estudos",
    subtitle: "Adaptive Learning",
    description: "Aplicação que cria Flashcards inteligentes baseados no desempenho do aluno.",
    tags: ["Django", "Python", "Bootstrap"],
    color: "from-indigo-400 to-purple-500",
    icon: <Globe />,
    link: "https://projeto-estudo.onrender.com/"
  },
  {
    title: "PDF Invoice Extractor",
    subtitle: "Financial Tool",
    description: "Parser inteligente que lê faturas em PDF não estruturadas e converte para Excel/Database.",
    tags: ["Python", "Pandas", "Regex"],
    color: "from-green-400 to-emerald-500",
    icon: <FileText />,
    link: "/demo_fatura.html"
  },
  {
    title: "Simulador Energético",
    subtitle: "Frontend Logic",
    description: "Landing page com simulador de custos complexo para captação de leads.",
    tags: ["JS", "Math", "Conversion"],
    color: "from-teal-400 to-blue-500",
    icon: <Code2 />,
    link: "https://sistema-gestao-port.onrender.com"
  },
  {
    title: "VBA Automation",
    subtitle: "Legacy Support",
    description: "Scripts VBA avançados para manutenção, backup e otimização de bancos MS Access.",
    tags: ["VBA", "SQL", "Access"],
    color: "from-red-500 to-orange-600",
    icon: <Database />,
    link: "/demo_vba.html"
  }
];
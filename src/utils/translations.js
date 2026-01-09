export const translations = {
  pt: {
    header: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato"
    },
    hero: {
      greeting: "Olá, eu sou",
      name: "Matheus Marafon",
      role: "Engenheiro de Software",
      description: "Especialista em automação e dados. Transformo processos complexos em código eficiente.",
      buttons: { projects: "Ver Projetos", contact: "Contato" }
    },
    about: {
      title: "Sobre Mim",
      description: "Apaixonado por resolver problemas reais. Minha jornada combina Automação (Python), Engenharia de Dados e Interfaces Modernas.",
      skills_title: "Tech Stack"
    },
    education: {
      badge: "Formação & Estudos",
      title: "Trajetória Técnica",
      subtitle: "Foco total em Engenharia de Dados e BI através de projetos práticos e roadmaps especializados.",
      academic: [
        {
          course: "Data Engineering Roadmap",
          institution: "Projeto GitHub",
          year: "2024 - Atual",
          description: "Trilha avançada de Engenharia de Dados: Pipelines, ETL e Automação.",
          link: "https://github.com/MatheusMarafon/data-engineering-roadmap"
        },
        {
          course: "BI & Analytics Dashboard",
          institution: "Projeto GitHub",
          year: "2024",
          description: "Dashboard interativo de BI com análise de dados e KPIs estratégicos.",
          link: "https://github.com/MatheusMarafon/bi-analytics-dashboard"
        }
      ],
      roadmap: [
        {
          title: "Fundamentos: Python & Git",
          status: "completed",
          description: "Automação e Versionamento.",
          stack: ["Python", "Git", "Lógica"]
        },
        {
          title: "SQL & Modelagem",
          status: "completed",
          description: "Manipulação avançada de dados.",
          stack: ["PostgreSQL", "SQL", "Pandas"]
        },
        {
          title: "Engenharia de Dados",
          status: "progress",
          description: "Pipelines ETL e APIs.",
          stack: ["ETL", "APIs", "Web Scraping"]
        },
        {
          title: "Business Intelligence",
          status: "progress",
          description: "Dashboards e Storytelling.",
          stack: ["Power BI", "Streamlit"]
        },
        {
          title: "Cloud & Big Data",
          status: "future",
          description: "Escalabilidade na nuvem.",
          stack: ["AWS", "Data Lake"]
        }
      ]
    },
    projects: {
      title: "Projetos",
      items: [] 
    },
    contact: {
      title: "Contato",
      subtitle: "Vamos conversar?",
      form: { name: "Nome", email: "Email", message: "Mensagem", send: "Enviar" }
    },
    chatbot: {
      welcome: "Olá! Pergunte sobre meus projetos ou skills.",
      suggestions: ["Quais suas skills?", "Experiência com Python"],
      answers: {
        default: "Não entendi. Tente perguntar sobre skills ou projetos.",
        skills: "Python, SQL, React e Docker.",
        projects: "Veja a seção de projetos no site!"
      }
    }
  },
  en: {
    header: { about: "About", projects: "Projects", contact: "Contact" },
    hero: {
      greeting: "Hi, I am",
      name: "Matheus Marafon",
      role: "Software Engineer",
      description: "Automation and Data Specialist.",
      buttons: { projects: "View Projects", contact: "Contact" }
    },
    about: {
      title: "About Me",
      description: "Passionate about solving real problems with Python, Data Engineering and Modern UI.",
      skills_title: "Tech Stack"
    },
    education: {
      badge: "Education & Studies",
      title: "Technical Path",
      subtitle: "Focused on Data Engineering and BI through practical projects.",
      academic: [
        {
          course: "Data Engineering Roadmap",
          institution: "GitHub Project",
          year: "2024 - Current",
          description: "Advanced Data Engineering path: Pipelines, ETL and Automation.",
          link: "https://github.com/MatheusMarafon/data-engineering-roadmap"
        },
        {
          course: "BI & Analytics Dashboard",
          institution: "GitHub Project",
          year: "2024",
          description: "Interactive BI Dashboard with data analysis and strategic KPIs.",
          link: "https://github.com/MatheusMarafon/bi-analytics-dashboard"
        }
      ],
      roadmap: [
        { title: "Fundamentals: Python", status: "completed", description: "Automation & Logic.", stack: ["Python", "Git"] },
        { title: "SQL & Modeling", status: "completed", description: "Advanced Data Manipulation.", stack: ["PostgreSQL", "Pandas"] },
        { title: "Data Engineering", status: "progress", description: "ETL Pipelines & APIs.", stack: ["ETL", "APIs"] },
        { title: "Business Intelligence", status: "progress", description: "Dashboards & Storytelling.", stack: ["Power BI", "Streamlit"] },
        { title: "Cloud & Big Data", status: "future", description: "Cloud Scalability.", stack: ["AWS", "Data Lake"] }
      ]
    },
    projects: { title: "Projects", items: [] },
    contact: { title: "Contact", subtitle: "Let's talk?", form: { name: "Name", email: "Email", message: "Message", send: "Send" } },
    chatbot: { welcome: "Hi! Ask me about my skills.", suggestions: ["Skills?", "Python exp"], answers: { default: "Try asking about skills.", skills: "Python, SQL, React.", projects: "Check the projects section!" } }
  }
};
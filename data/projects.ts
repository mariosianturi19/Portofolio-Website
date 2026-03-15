// file: data/projects.ts

export type Category = "All" | "Web" | "Mobile" | "Algorithm"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  github: string
  category: "Mobile" | "Web" | "Algorithm"
  featured?: boolean
  isCapstone?: boolean
  teamProject?: boolean
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Si-Bantu",
    description: "Bangkit Capstone 2024 - Smart assistant mobile application for helping people with daily tasks using machine learning and AI technologies.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&h=600&q=80",
    tags: ["Android", "Machine Learning", "TensorFlow", "Kotlin", "Firebase", "AI"],
    github: "https://github.com/indra1222/Bangkitcapstone",
    category: "Mobile",
    featured: true,
    isCapstone: true,
    teamProject: true,
  },
  {
    id: 2,
    title: "SIGAP UNDIP",
    description: "SIGAP UNDIP is an innovative digital platform designed to enhance emergency response and safety systems within Diponegoro University environment.",
    image: "/SIGAP.png",
    tags: ["Next.js", "TypeScript", "React", "CSS"],
    github: "https://github.com/mariosianturi19/SIGAP-UNDIP",
    category: "Web",
    featured: true,
  },
  {
    id: 3,
    title: "Premier League Info System",
    description: "Full-stack sports data platform delivering real-time Premier League data. Features a React frontend and robust Next.js API backend.",
    image: "/Premiere.png",
    tags: ["Next.js", "React.js", "TypeScript", "Full-Stack"],
    github: "https://github.com/mariosianturi19/premiere-league-app",
    category: "Web",
    featured: true,
  },
  {
    id: 4,
    title: "GASPOL System",
    description: "Comprehensive Sales Performance and Credit Simulation platform for Setir Kanan. Streamlines automotive sales with real-time financial calculations and lead management.",
    image: "/Gaspol.png",
    tags: ["Next.js", "TypeScript", "PWA", "Responsive Design"],
    github: "https://github.com/mariosianturi19/Gaspol",
    category: "Web",
    featured: true,
  },
  {
    id: 5,
    title: "MotoMarket",
    description: "Cutting-edge e-commerce platform for motorcycle enthusiasts. Features intuitive search and exploration of motorcycles with a modern interface.",
    image: "/MotoMarket.png",
    tags: ["Vite", "TypeScript", "React.js", "Responsive Design"],
    github: "https://github.com/mariosianturi19/MotoMarket",
    category: "Web",
    featured: true,
  },
  {
    id: 6,
    title: "MPL ID APP",
    description: "Esports management dashboard for MPL Indonesia. A PWA for tracking standings, managing team rosters, and monitoring MVP leaderboards.",
    image: "/MPL.png",
    tags: ["React.js", "API", "PWA", "JavaScript"],
    github: "#",
    category: "Web",
    featured: true,
  },
  {
    id: 7,
    title: "Finance Tracker",
    description: "Feature-rich personal finance management application for tracking expenses, budgeting, and analyzing spending patterns.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&h=600&q=80",
    tags: ["Next.js", "TypeScript", "React.js", "Full-Stack"],
    github: "https://github.com/mariosianturi19/Finance-Tracker",
    category: "Web",
    featured: true,
  },
  {
    id: 8,
    title: "NBA App",
    description: "React Native mobile application for NBA statistics and team information with modern UI.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&h=600&q=80",
    tags: ["React Native", "JavaScript", "CSS"],
    github: "https://github.com/mariosianturi19/NBA-App",
    category: "Mobile",
    featured: true,
  },
  {
    id: 9,
    title: "Klik Digital Dashboard",
    description: "Professional dashboard website for PT. Klik Digital Sinergi with advanced analytics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600&q=80",
    tags: ["Next.js", "TypeScript", "CSS", "JavaScript"],
    github: "#",
    category: "Web",
    featured: true,
  },
  {
    id: 10,
    title: "Endorsement Website",
    description: "Social media influencer endorsement platform with payment integration and user management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=600&q=80",
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/mariosianturi19/Endorsement_Website",
    category: "Web",
  },
  {
    id: 11,
    title: "Basketball Court Booking",
    description: "Online basketball court booking system with real-time availability and payment processing.",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=800&h=600&q=80",
    tags: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    github: "https://github.com/mariosianturi19/Booking-Basketball-Court",
    category: "Web",
  },
  {
    id: 12,
    title: "Outlet Recognition Website",
    description: "Website for outlet recognition using computer vision and machine learning algorithms.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&h=600&q=80",
    tags: ["Node.js", "HTML", "CSS", "JavaScript", "Computer Vision"],
    github: "#",
    category: "Web",
  },
  {
    id: 13,
    title: "Interpolation Algorithm",
    description: "Python implementation of numerical interpolation algorithms for data science and computational mathematics.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&h=600&q=80",
    tags: ["Python", "Jupyter", "NumPy", "SciPy", "Mathematics"],
    github: "https://github.com/mariosianturi19/Implementasi-Interpolasi",
    category: "Algorithm",
  },
]
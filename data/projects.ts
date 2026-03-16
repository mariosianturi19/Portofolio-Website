// file: data/projects.ts

export type Category = "All" | "Web" | "Mobile" | "Algorithm"

export interface Project {
  id: number
  title: string
  description: string        // Short — untuk card
  longDescription?: string   // Panjang — untuk modal
  image: string              // Gambar utama
  screenshots?: string[]     // Array gambar untuk gallery di modal
  tags: string[]
  github: string
  liveUrl?: string           // Link demo/live jika ada
  category: "Mobile" | "Web" | "Algorithm"
  featured?: boolean
  isCapstone?: boolean
  teamProject?: boolean
  highlights?: string[]      // Bullet poin fitur utama untuk modal
  year?: string
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Si-Bantu",
    description: "Bangkit Capstone 2024 - Smart assistant mobile application for helping people with daily tasks using machine learning and AI technologies.",
    longDescription:
      "Si-Bantu is a Bangkit Academy 2024 Capstone Project — a smart AI-powered assistant mobile app built for Android. The application leverages TensorFlow Lite for on-device machine learning, Firebase for real-time database and authentication, and a custom-trained model to help users manage daily tasks intelligently. Developed as a team project with 6 members spanning Machine Learning, Cloud Computing, and Mobile Development paths.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&h=600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Android", "Machine Learning", "TensorFlow", "Kotlin", "Firebase", "AI"],
    github: "https://github.com/indra1222/Bangkitcapstone",
    category: "Mobile",
    featured: true,
    isCapstone: true,
    teamProject: true,
    year: "2024",
    highlights: [
      "On-device ML inference with TensorFlow Lite",
      "Real-time sync with Firebase Realtime Database",
      "Custom NLP model for task understanding",
      "Google Cloud Platform backend integration",
      "Collaborative development across 3 specialization paths",
    ],
  },
  {
    id: 2,
    title: "SIGAP UNDIP",
    description: "SIGAP UNDIP is an innovative digital platform designed to enhance emergency response and safety systems within Diponegoro University environment.",
    longDescription:
      "SIGAP UNDIP is a comprehensive emergency response and campus safety platform built for Diponegoro University. The system enables students and staff to report incidents in real-time, track emergency response status, and access campus safety resources. Built with Next.js and TypeScript for a robust, type-safe codebase with a responsive UI optimized for mobile-first usage.",
    image: "/SIGAP.png",
    screenshots: [
      "/SIGAP.png",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Next.js", "TypeScript", "React", "CSS"],
    github: "https://github.com/mariosianturi19/SIGAP-UNDIP",
    category: "Web",
    featured: true,
    year: "2024",
    highlights: [
      "Real-time incident reporting system",
      "Interactive campus map integration",
      "Emergency contact directory",
      "Mobile-responsive design",
      "Role-based access for staff and students",
    ],
  },
  {
    id: 3,
    title: "Premier League Info System",
    description: "Full-stack sports data platform delivering real-time Premier League data. Features a React frontend and robust Next.js API backend.",
    longDescription:
      "A full-stack Premier League information platform that aggregates live match scores, player statistics, team standings, and fixture schedules. The frontend is built with React.js and TypeScript, while the backend leverages Next.js API routes to proxy and cache data from third-party football APIs. Features include live score updates, detailed player profiles, and historical match data.",
    image: "/Premiere.png",
    screenshots: [
      "/Premiere.png",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Next.js", "React.js", "TypeScript", "Full-Stack"],
    github: "https://github.com/mariosianturi19/premiere-league-app",
    category: "Web",
    featured: true,
    year: "2024",
    highlights: [
      "Real-time match scores via REST API",
      "Comprehensive player & team statistics",
      "Season standings with live updates",
      "Server-side data caching for performance",
      "Responsive design for all screen sizes",
    ],
  },
  {
    id: 4,
    title: "GASPOL System",
    description: "Comprehensive Sales Performance and Credit Simulation platform for Setir Kanan. Streamlines automotive sales with real-time financial calculations and lead management.",
    longDescription:
      "GASPOL is a Progressive Web Application built for PT. Setir Kanan Indonesia — an automotive sales platform that streamlines the entire sales process. Sales agents can simulate credit schemes, calculate monthly installments in real-time, manage customer leads, and track performance metrics through a clean dashboard. Developed during internship at PT. Klik Digital Sinergi.",
    image: "/Gaspol.png",
    screenshots: [
      "/Gaspol.png",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Next.js", "TypeScript", "PWA", "Responsive Design"],
    github: "https://github.com/mariosianturi19/Gaspol",
    category: "Web",
    featured: true,
    year: "2025",
    highlights: [
      "Real-time credit simulation engine",
      "PWA with offline capability",
      "Sales performance dashboard",
      "Lead management system",
      "Multi-device responsive design",
    ],
  },
  {
    id: 5,
    title: "MotoMarket",
    description: "Cutting-edge e-commerce platform for motorcycle enthusiasts. Features intuitive search and exploration of motorcycles with a modern interface.",
    longDescription:
      "MotoMarket is a modern e-commerce platform tailored for motorcycle enthusiasts. Users can browse, search, and compare motorcycles with an intuitive filtering system. The project showcases advanced React patterns, custom hooks for state management, and Vite for blazing-fast development and build times. The UI emphasizes visual product showcase with high-quality imagery and smooth transitions.",
    image: "/MotoMarket.png",
    screenshots: [
      "/MotoMarket.png",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Vite", "TypeScript", "React.js", "Responsive Design"],
    github: "https://github.com/mariosianturi19/MotoMarket",
    category: "Web",
    featured: true,
    year: "2023",
    highlights: [
      "Advanced product search and filter system",
      "Comparison feature for multiple models",
      "Optimized image loading with lazy load",
      "Custom hooks for cart management",
      "TypeScript for end-to-end type safety",
    ],
  },
  {
    id: 6,
    title: "MPL ID APP",
    description: "Esports management dashboard for MPL Indonesia. A PWA for tracking standings, managing team rosters, and monitoring MVP leaderboards.",
    longDescription:
      "MPL ID APP is a Progressive Web Application dashboard for Mobile Legends Professional League Indonesia. The app allows fans and team managers to track real-time standings, browse team rosters, view player statistics, and follow the MVP leaderboard throughout the season. Built with React.js and integrated with a public sports API.",
    image: "/MPL.png",
    screenshots: [
      "/MPL.png",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["React.js", "API", "PWA", "JavaScript"],
    github: "#",
    category: "Web",
    featured: true,
    year: "2023",
    highlights: [
      "Real-time standings and match results",
      "Team roster management interface",
      "MVP leaderboard with statistics",
      "PWA for mobile-app-like experience",
      "External sports API integration",
    ],
  },
  {
    id: 7,
    title: "Finance Tracker",
    description: "Feature-rich personal finance management application for tracking expenses, budgeting, and analyzing spending patterns.",
    longDescription:
      "A full-stack personal finance tracker built with Next.js and TypeScript. Users can log income and expenses, set budget goals per category, and visualize their spending patterns through interactive charts. The application includes a dashboard overview, transaction history with filtering, and monthly reports with trend analysis.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&h=600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Next.js", "TypeScript", "React.js", "Full-Stack"],
    github: "https://github.com/mariosianturi19/Finance-Tracker",
    category: "Web",
    featured: true,
    year: "2024",
    highlights: [
      "Income and expense transaction logging",
      "Budget goals with visual progress tracking",
      "Interactive spending charts (Recharts)",
      "Category-based expense breakdown",
      "Monthly financial reports and trends",
    ],
  },
  {
    id: 8,
    title: "NBA App",
    description: "React Native mobile application for NBA statistics and team information with modern UI.",
    longDescription:
      "A React Native mobile application that brings NBA statistics to your fingertips. Browse all 30 NBA teams, explore player rosters, view season averages, and check recent game scores. The app uses a third-party NBA stats API and features a clean, dark-themed UI inspired by the official NBA aesthetic.",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&h=600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["React Native", "JavaScript", "CSS"],
    github: "https://github.com/mariosianturi19/NBA-App",
    category: "Mobile",
    featured: true,
    year: "2023",
    highlights: [
      "All 30 NBA teams with full roster",
      "Season averages and player statistics",
      "Recent game scores and results",
      "Dark-themed modern UI",
      "Cross-platform iOS and Android",
    ],
  },
  {
    id: 9,
    title: "Klik Digital Dashboard",
    description: "Professional dashboard website for PT. Klik Digital Sinergi with advanced analytics.",
    longDescription:
      "A professional internal dashboard developed during internship at PT. Klik Digital Sinergi. The dashboard centralizes business analytics, client management, and performance tracking for the digital agency. Built with Next.js and TypeScript, it features role-based access control, data visualization components, and a clean admin UI.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Next.js", "TypeScript", "CSS", "JavaScript"],
    github: "#",
    category: "Web",
    featured: true,
    year: "2025",
    highlights: [
      "Business analytics visualization",
      "Client project management interface",
      "Role-based access control",
      "Responsive admin dashboard layout",
      "Performance metrics tracking",
    ],
  },
  {
    id: 10,
    title: "Endorsement Website",
    description: "Social media influencer endorsement platform with payment integration and user management.",
    longDescription:
      "A web platform connecting brands with social media influencers for endorsement campaigns. Brands can post campaign briefs, influencers can apply and submit content, and payments are processed through an integrated gateway. Built with PHP and MySQL as a full-stack project.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/mariosianturi19/Endorsement_Website",
    category: "Web",
    year: "2023",
    highlights: [
      "Brand-influencer matching system",
      "Campaign management workflow",
      "Payment gateway integration",
      "User role management (Brand / Influencer)",
    ],
  },
  {
    id: 11,
    title: "Basketball Court Booking",
    description: "Online basketball court booking system with real-time availability and payment processing.",
    longDescription:
      "An online booking platform for basketball courts that enables users to check real-time court availability, select time slots, and confirm reservations with payment. Built with PHP and MySQL, featuring a clean calendar-based availability view and admin panel for court management.",
    image: "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=800&h=600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
    github: "https://github.com/mariosianturi19/Booking-Basketball-Court",
    category: "Web",
    year: "2023",
    highlights: [
      "Real-time court availability calendar",
      "Online booking and reservation system",
      "Payment confirmation workflow",
      "Admin panel for court management",
    ],
  },
  {
    id: 12,
    title: "Outlet Recognition Website",
    description: "Website for outlet recognition using computer vision and machine learning algorithms.",
    longDescription:
      "A web-based outlet recognition system that uses computer vision techniques to identify and classify retail outlets from images. The system processes uploaded images through a Node.js backend and returns classification results with confidence scores.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&h=600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Node.js", "HTML", "CSS", "JavaScript", "Computer Vision"],
    github: "#",
    category: "Web",
    year: "2023",
    highlights: [
      "Image upload and preprocessing pipeline",
      "Computer vision classification model",
      "Confidence score visualization",
      "Batch processing capability",
    ],
  },
  {
    id: 13,
    title: "Interpolation Algorithm",
    description: "Python implementation of numerical interpolation algorithms for data science and computational mathematics.",
    longDescription:
      "A Python implementation of multiple numerical interpolation methods — including Lagrange, Newton's Divided Difference, and Linear Spline — applied to real-world datasets. The project is presented as a Jupyter Notebook with step-by-step mathematical explanations, visualizations using Matplotlib, and performance comparisons between methods.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&h=600&q=80",
    screenshots: [
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&h=600&q=80",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&h=600&q=80",
    ],
    tags: ["Python", "Jupyter", "NumPy", "SciPy", "Mathematics"],
    github: "https://github.com/mariosianturi19/Implementasi-Interpolasi",
    category: "Algorithm",
    year: "2023",
    highlights: [
      "Lagrange interpolation implementation",
      "Newton's Divided Difference method",
      "Linear and Cubic Spline methods",
      "Side-by-side method comparison",
      "Matplotlib visualizations",
    ],
  },
]
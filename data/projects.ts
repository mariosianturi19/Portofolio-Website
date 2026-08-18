// file: data/projects.ts

export type Category = "All" | "Web" | "Mobile" | "Algorithm"

export interface ProjectCaseStudy {
  challenge: string
  role: string
  contributions: string[]
  decisions: string[]
  outcome: string
  status?: string
}

export interface Project {
  id: number
  title: string
  description: string        // Short — untuk card
  longDescription?: string   // Panjang — untuk modal
  image: string              // Gambar utama
  screenshots?: string[]     // Array gambar untuk gallery di modal
  imageFit?: "cover" | "contain"
  tags: string[]
  github: string
  liveUrl?: string           // Link demo/live jika ada
  liveLabel?: string         // Label CTA untuk link live jika perlu dibedakan
  category: "Mobile" | "Web" | "Algorithm"
  featured?: boolean
  isCapstone?: boolean
  teamProject?: boolean
  highlights?: string[]      // Bullet poin fitur utama untuk modal
  caseStudy?: ProjectCaseStudy
  year?: string
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Si-Bantu",
    description: "Bangkit Capstone 2024 - Smart assistant mobile application for helping people with daily tasks using machine learning and AI technologies.",
    longDescription:
      "Si-Bantu is a Bangkit Academy 2024 Capstone Project — a smart AI-powered assistant mobile app built for Android. The application leverages TensorFlow Lite for on-device machine learning, Firebase for real-time database and authentication, and a custom-trained model to help users manage daily tasks intelligently. Developed as a team project with 6 members spanning Machine Learning, Cloud Computing, and Mobile Development paths.",
    image: "/projects/sibantu-onboarding-1.webp",
    screenshots: [
      "/projects/sibantu-onboarding-1.webp",
      "/projects/sibantu-onboarding-2.webp",
      "/projects/sibantu-onboarding-3.webp",
    ],
    imageFit: "contain",
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
    description: "Multi-role campus emergency response frontend for students, volunteers, and administrators, with panic reporting, GPS capture, and incident workflows.",
    longDescription:
      "SIGAP UNDIP is a campus emergency response and safety platform designed around the different needs of students, volunteers, and administrators. The frontend brings panic reporting, structured incident reports, location capture, response tracking, and operational dashboards into one responsive web experience.",
    image: "/SIGAP.webp",
    screenshots: [
      "/SIGAP.webp",
      "/projects/s1.webp",
      "/projects/s2.webp",
    ],
    tags: ["Next.js", "TypeScript", "React", "Zod", "REST API"],
    github: "https://github.com/mariosianturi19/SIGAP-UNDIP",
    liveUrl: "https://sigap.undip.ac.id/",
    liveLabel: "Visit Live Project",
    category: "Web",
    featured: true,
    year: "2024",
    highlights: [
      "Panic and structured incident-reporting flows",
      "Browser geolocation permission and coordinate capture",
      "Role-specific student, volunteer, and administrator workspaces",
      "Report history, status tracking, and operational dashboards",
      "Responsive interface designed for urgent mobile use",
    ],
    caseStudy: {
      challenge:
        "Campus emergencies require a reporting flow that remains clear under pressure while giving response teams enough structured information to act. A single generic dashboard would not serve students, volunteers, and administrators equally well.",
      role: "Project Lead & Front-End Developer",
      contributions: [
        "Designed role-specific journeys and responsive layouts for students, volunteers, and administrators.",
        "Built panic and incident-reporting interfaces, report history, status views, and operational management screens.",
        "Integrated browser geolocation so users can grant permission and attach coordinates to an emergency report.",
        "Structured typed API integration and reusable UI patterns across reporting, response, and shift-management flows.",
      ],
      decisions: [
        "Used Next.js App Router and TypeScript to keep role-based routes and shared data contracts maintainable.",
        "Applied React Hook Form and Zod patterns for structured, predictable report input.",
        "Prioritized mobile readability, explicit system states, and short action paths for urgent scenarios.",
      ],
      outcome:
        "Delivered an end-to-end frontend implementation covering the core student reporting journey and the volunteer and administrator response workflows.",
      status: "Live official UNDIP project; frontend contribution.",
    },
  },
  {
    id: 3,
    title: "Premier League Info System",
    description: "Responsive Premier League frontend for standings, fixtures, clubs, squads, and match administration, built around a teammate-provided API.",
    longDescription:
      "Premier League Info System is a responsive sports-data frontend built with React, TypeScript, and Vite. It turns a teammate-provided API into a branded fan and administration experience for league standings, fixtures, club details, squad management, and score updates. The frontend source remains available, while the original external API is no longer online.",
    image: "/Premiere.webp",
    screenshots: [
      "/Premiere.webp",
      "/projects/p1.webp",
      "/projects/p2.webp",
    ],
    tags: ["React", "TypeScript", "Vite", "REST API", "PWA"],
    github: "https://github.com/mariosianturi19/premiere-league-app",
    category: "Web",
    featured: true,
    year: "2024",
    highlights: [
      "League table and recent-match dashboard",
      "Fixtures scheduling and score-update interfaces",
      "Club directory, club details, and squad management",
      "Typed Axios integration with loading and feedback states",
      "Responsive navigation and installable PWA configuration",
    ],
    caseStudy: {
      challenge:
        "The project needed to turn several football data entities—clubs, players, fixtures, results, and standings—into a coherent interface that worked for both browsing and data-management tasks.",
      role: "Front-End Developer in a team collaboration",
      contributions: [
        "Built the React application structure and routed experiences for Home, Clubs, Club Detail, Fixtures, and About.",
        "Created responsive standings, match, club, and squad interfaces with reusable loading, modal, and feedback components.",
        "Integrated typed REST endpoints for reading and managing teams, players, fixtures, scores, and standings.",
        "Configured an installable PWA experience and a Premier League-inspired responsive visual system.",
      ],
      decisions: [
        "Separated the Axios API client from page components so the frontend dependency remained easy to identify and replace.",
        "Defined TypeScript models for teams, players, matches, and standings to keep cross-page rendering consistent.",
        "Used explicit loading, success, error, and confirmation states for API-driven actions.",
      ],
      outcome:
        "Completed a multi-page sports frontend that demonstrates API integration, responsive data presentation, and interactive CRUD workflows.",
      status: "Frontend source preserved; the teammate-owned external API is no longer available.",
    },
  },
  {
    id: 4,
    title: "GASPOL System",
    description: "Full-stack automotive credit simulation workflow with financing calculations, budget matching, authentication, and persistent application history.",
    longDescription:
      "GASPOL is a full-stack credit simulation application for automotive sales workflows. It combines customer and vehicle input, configurable interest and insurance rates, installment calculations, budget-based recommendations, document attachments, and a persistent simulation history behind authenticated access.",
    image: "/Gaspol.webp",
    screenshots: [
      "/Gaspol.webp",
      "/projects/g1.webp",
    ],
    tags: ["Next.js", "TypeScript", "Prisma", "MySQL", "PWA"],
    github: "https://github.com/mariosianturi19/Gaspol",
    liveUrl: "https://www.gaspol.web.id/",
    liveLabel: "Visit Live Project",
    category: "Web",
    featured: true,
    year: "2025",
    highlights: [
      "Rule-based credit and insurance calculation engine",
      "Budget solver for target down payment or installment",
      "Authenticated simulation and history workflow",
      "Prisma and MySQL persistence with status management",
      "Attachment compression and installable PWA setup",
    ],
    caseStudy: {
      challenge:
        "Automotive financing combines vehicle categories, down-payment rules, tenor, payment type, interest, insurance, and administrative fees. Sales users need fast estimates without losing the calculation detail required for review.",
      role: "Full-Stack Developer",
      contributions: [
        "Built the credit simulation flow for customer, vehicle, financing, insurance, and attachment inputs.",
        "Implemented calculation rules for down payment, principal, interest, insurance, monthly installment, and total first payment.",
        "Added a budget solver that searches for a suitable down-payment percentage from a target TDP or monthly installment.",
        "Implemented authenticated save, history, status-update, detail, and delete flows backed by Prisma and MySQL.",
      ],
      decisions: [
        "Kept financial rules in a dedicated React hook so form state, calculations, and persistence remained separable.",
        "Loaded interest and insurance rates from the database while retaining explicit handling for special financing scenarios.",
        "Compressed image attachments in the browser before persistence and enforced payload-size safeguards.",
      ],
      outcome:
        "Delivered an end-to-end workflow from secure login and financing calculation through saved simulation history and status review.",
      status: "Live public project; full-stack implementation.",
    },
  },
  {
    id: 5,
    title: "MotoMarket",
    description: "Cutting-edge e-commerce platform for motorcycle enthusiasts. Features intuitive search and exploration of motorcycles with a modern interface.",
    longDescription:
      "MotoMarket is a modern e-commerce platform tailored for motorcycle enthusiasts. Users can browse, search, and compare motorcycles with an intuitive filtering system. The project showcases advanced React patterns, custom hooks for state management, and Vite for blazing-fast development and build times. The UI emphasizes visual product showcase with high-quality imagery and smooth transitions.",
    image: "/MotoMarket.webp",
    screenshots: [
      "/MotoMarket.webp",
      "/projects/k1.webp",
      "/projects/k2.webp",
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
    image: "/MPL.webp",
    screenshots: [
      "/MPL.webp",
      "/projects/m1.webp",
      "/projects/m2.webp",
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
    id: 9,
    title: "Hermes — Internal Operations System",
    description: "Internal web application for PT. Klik Digital Sinergi that centralizes company, employee, correspondence, and employment-contract workflows.",
    longDescription:
      "Hermes is an internal operations web application developed during my Front-End Developer internship at PT. Klik Digital Sinergi. It brings company records, employee data, correspondence, and PKS, PKWT, and PKWTT contract workflows into one responsive interface. The system uses reusable dashboards, searchable tables, status indicators, and structured forms to make administrative information easier to review and maintain.",
    image: "/projects/klik-dashboard.webp",
    screenshots: [
      "/projects/klik-dashboard.webp",
      "/projects/klik-contracts.webp",
    ],
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "CRUD Workflows"],
    github: "#",
    category: "Web",
    featured: true,
    year: "2025",
    highlights: [
      "Dashboard summaries for active PKS, PKWT, and PKWTT contracts",
      "Company, employee, and employment-contract management workflows",
      "Searchable contract records with type, date, and status information",
      "Reusable dashboard, table, form, and navigation components",
      "Responsive layouts for desktop and mobile administration",
    ],
    caseStudy: {
      challenge:
        "Internal employment administration spans companies, employees, correspondence, and multiple contract subtypes. The interface needed to make dense operational records searchable and manageable without losing the existing Hermes workflow.",
      role: "Front-End Developer Intern",
      contributions: [
        "Built responsive dashboard, table, form, search, pagination, and navigation patterns for internal administration.",
        "Implemented company, employee, and contract-letter workflows, including PKS, PKWT, and PKWTT-specific fields.",
        "Handled contract types, dates, statuses, record details, and CRUD feedback across the operational interface.",
        "Later preserved the retired frontend by introducing deterministic local data and localStorage persistence behind the existing response contracts.",
      ],
      decisions: [
        "Reused consistent table and form patterns so information-heavy modules remained predictable.",
        "Kept the data adapter compatible with the original response shapes, isolating data-source changes from page components.",
        "Preserved the original Hermes/Klik Digital visual identity while improving mobile dashboard usability.",
      ],
      outcome:
        "The complete frontend workflow remains reviewable across dashboard, company, employee, and contract modules even though the legacy API is no longer used.",
      status: "Original internal UI preserved locally with deterministic data; not presented as a production integration.",
    },
  },
  {
    id: 12,
    title: "Telkomsel Outlet Recognition",
    description: "Browser-based field tool that identifies seven Indonesian provider brands from outlet signage using explainable color-signature evidence.",
    longDescription:
      "Telkomsel Outlet Recognition is a web application developed to support outlet data sampling and analysis. Field users can capture an outlet sign with the camera or upload an existing image, then review an on-device classification supported by image-quality checks, dominant color clusters, confidence scoring, and visual evidence. The recognition scope covers Telkomsel, by.U, IM3, Tri, XL, AXIS, and Smartfren.",
    image: "/projects/outlet-recognition.webp",
    screenshots: [
      "/projects/outlet-recognition.webp",
      "/projects/outlet-scanner.webp",
    ],
    tags: ["Next.js", "TypeScript", "Computer Vision", "Image Processing", "Canvas API"],
    github: "#",
    category: "Web",
    featured: true,
    year: "2024",
    highlights: [
      "Camera capture and JPG, PNG, or WebP image upload",
      "On-device image processing with no image retention",
      "Recognition profiles for seven Indonesian provider brands",
      "Dominant color, HSV, CIEDE2000, and paired-accent evidence",
      "Image-quality safeguards and reviewable confidence results",
    ],
    caseStudy: {
      challenge:
        "Field users needed a quick way to identify provider branding from outlet signage while working with inconsistent lighting, framing, and image quality. A color-only decision also had to remain explainable instead of returning an opaque label.",
      role: "Front-End Developer Intern; later modernization owner",
      contributions: [
        "Built camera capture and image-upload flows with client-side processing and no image transmission.",
        "Implemented recognition profiles for Telkomsel, by.U, IM3, Tri, XL, AXIS, and Smartfren.",
        "Added exposure, contrast, sharpness, and saturation checks before classification.",
        "Presented confidence, dominant clusters, paired-color evidence, and review guidance in a field-operations interface.",
      ],
      decisions: [
        "Used center-weighted color sampling, HSV gates, CIEDE2000 distance, and primary/accent pairing to reduce simple dominant-color false matches.",
        "Added evidence and confidence safeguards instead of claiming a formal machine-learning accuracy percentage.",
        "Modernized the approved internship implementation with Next.js and TypeScript and added automated desktop and mobile coverage.",
      ],
      outcome:
        "Produced an explainable browser-based workflow for outlet sampling across seven Indonesian provider brands, with results that expose the evidence behind each classification.",
      status: "Original internship project was approved; later modernized locally and not publicly deployed.",
    },
  },
]

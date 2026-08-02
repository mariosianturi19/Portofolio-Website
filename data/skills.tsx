export interface SkillEvidence {
  project: string
  detail: string
}

export interface EvidenceSkill {
  name: string
  summary: string
  tools: string[]
  evidence: SkillEvidence[]
}

export interface SkillGroup {
  id: "frontend" | "integration" | "quality"
  title: string
  description: string
  skills: EvidenceSkill[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Responsive, component-driven interfaces for public products and internal operations.",
    skills: [
      {
        name: "React & Next.js",
        summary:
          "Build routed applications and reusable interface systems with clear component and state boundaries.",
        tools: ["React", "Next.js", "App Router", "Framer Motion"],
        evidence: [
          {
            project: "SIGAP UNDIP",
            detail: "Multi-role student, volunteer, and administrator workflows.",
          },
          {
            project: "Hermes",
            detail: "Reusable dashboard, table, form, and navigation patterns.",
          },
        ],
      },
      {
        name: "TypeScript & UI Architecture",
        summary:
          "Use typed models and predictable data contracts to keep multi-page products maintainable.",
        tools: ["TypeScript", "Typed Models", "Reusable Components"],
        evidence: [
          {
            project: "Premier League",
            detail: "Typed team, player, match, and standings models across routed pages.",
          },
          {
            project: "GASPOL",
            detail: "Separated financing form, calculation, result, and history concerns.",
          },
        ],
      },
      {
        name: "Responsive Product UI",
        summary:
          "Design interfaces around real task priority, readable states, and reliable mobile interaction.",
        tools: ["Tailwind CSS", "Responsive Design", "Accessibility"],
        evidence: [
          {
            project: "Telkomsel",
            detail: "Camera and upload workflow designed for field use on mobile and desktop.",
          },
          {
            project: "Hermes",
            detail: "Dense internal dashboard and record workflows adapted for smaller screens.",
          },
        ],
      },
    ],
  },
  {
    id: "integration",
    title: "Integration & Data Flows",
    description: "Interfaces that connect forms, APIs, application rules, and persistent data.",
    skills: [
      {
        name: "REST API Integration",
        summary:
          "Connect frontend journeys to remote data with explicit loading, feedback, and failure states.",
        tools: ["REST API", "Axios", "Fetch", "Async State"],
        evidence: [
          {
            project: "Premier League",
            detail: "Integrated standings, fixtures, clubs, players, and score endpoints.",
          },
          {
            project: "SIGAP UNDIP",
            detail: "Structured API boundaries for reports, panic events, response, and shifts.",
          },
        ],
      },
      {
        name: "Forms, Validation & CRUD",
        summary:
          "Turn operational rules into structured input, validation, search, and record-management flows.",
        tools: ["React Hook Form", "Zod", "CRUD", "Search & Pagination"],
        evidence: [
          {
            project: "Hermes",
            detail: "Company, employee, PKS, PKWT, and PKWTT administration.",
          },
          {
            project: "SIGAP UNDIP",
            detail: "Emergency reporting and role-specific management interfaces.",
          },
        ],
      },
      {
        name: "Full-Stack Persistence",
        summary:
          "Implement authenticated application flows from domain logic through API routes and relational storage.",
        tools: ["Prisma", "MySQL", "Next.js API Routes", "JWT"],
        evidence: [
          {
            project: "GASPOL",
            detail: "Authentication, financing rules, saved simulations, history, and status updates.",
          },
          {
            project: "Hermes",
            detail: "Response-compatible local adapter and localStorage preservation layer.",
          },
        ],
      },
    ],
  },
  {
    id: "quality",
    title: "Quality & Specialized Work",
    description: "Evidence-driven implementation, browser capabilities, and collaborative delivery.",
    skills: [
      {
        name: "Testing & Browser QA",
        summary:
          "Verify critical interactions across viewports and keep technical claims tied to observable behavior.",
        tools: ["Playwright", "Vitest", "Build Verification", "Responsive QA"],
        evidence: [
          {
            project: "Telkomsel",
            detail: "Automated desktop and mobile coverage for capture, upload, and recognition flows.",
          },
          {
            project: "Hermes",
            detail: "Build and browser QA across dashboard and operational CRUD pages.",
          },
        ],
      },
      {
        name: "Client-Side Image Processing",
        summary:
          "Use browser media and Canvas APIs for private, explainable image analysis workflows.",
        tools: ["Canvas API", "MediaDevices", "Color Analysis", "CIEDE2000"],
        evidence: [
          {
            project: "Telkomsel",
            detail: "On-device outlet-sign analysis across seven Indonesian provider profiles.",
          },
          {
            project: "GASPOL",
            detail: "Browser-side image compression and attachment size safeguards.",
          },
        ],
      },
      {
        name: "Team Collaboration",
        summary:
          "Own frontend delivery while coordinating contracts and responsibilities across disciplines.",
        tools: ["Git", "GitHub", "API Contracts", "Project Leadership"],
        evidence: [
          {
            project: "SIGAP UNDIP",
            detail: "Project Lead and Front-End Developer alongside a backend developer.",
          },
          {
            project: "Premier League & Si-Bantu",
            detail: "Frontend/API collaboration and a multi-path Bangkit capstone team.",
          },
        ],
      },
    ],
  },
]

export const toolkit = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "REST API",
  "Prisma",
  "MySQL",
  "Git & GitHub",
  "Playwright",
  "Vitest",
  "Canvas API",
  "PWA",
]

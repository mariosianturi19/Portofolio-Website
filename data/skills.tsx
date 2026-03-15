// file: data/skills.tsx

import { Code, Layout, Database, PaintBucket, Smartphone, Braces } from "lucide-react"
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiFramer, SiFirebase, SiPython, SiFigma, 
  SiGit, SiMysql, SiKotlin, SiJavascript 
} from "react-icons/si"

export interface Skill {
  name: string
  level: number
}

export interface SkillCategory {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  shadow: string
  skills: Skill[]
}

export interface MarqueeTech {
  name: string
  icon: React.ElementType // Menggunakan ElementType karena kita menyimpan referensi komponen, bukan JSX Element
  hoverColor: string
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Modern web interfaces",
    icon: <Layout className="h-5 w-5" />,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20",
    skills: [
      { name: "React.js", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Mobile",
    description: "Cross-platform apps",
    icon: <Smartphone className="h-5 w-5" />,
    color: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/20",
    skills: [
      { name: "React Native", level: 85 },
      { name: "Kotlin", level: 80 },
      { name: "Java", level: 75 },
      { name: "Android SDK", level: 75 },
    ],
  },
  {
    title: "Languages",
    description: "Programming languages",
    icon: <Code className="h-5 w-5" />,
    color: "from-orange-500 to-yellow-400",
    shadow: "shadow-orange-500/20",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 80 },
      { name: "PHP", level: 85 },
    ],
  },
  {
    title: "Tools",
    description: "Development tools",
    icon: <Braces className="h-5 w-5" />,
    color: "from-purple-500 to-pink-400",
    shadow: "shadow-purple-500/20",
    skills: [
      { name: "Git & GitHub", level: 95 },
      { name: "VS Code", level: 95 },
      { name: "Webpack", level: 70 },
      { name: "Docker", level: 65 },
    ],
  },
  {
    title: "Design",
    description: "UI/UX Design",
    icon: <PaintBucket className="h-5 w-5" />,
    color: "from-rose-500 to-red-400",
    shadow: "shadow-rose-500/20",
    skills: [
      { name: "Responsive Design", level: 95 },
      { name: "Material Design", level: 85 },
      { name: "Figma", level: 85 },
    ],
  },
  {
    title: "Backend / Database",
    description: "Server & Data management",
    icon: <Database className="h-5 w-5" />,
    color: "from-indigo-500 to-blue-400",
    shadow: "shadow-indigo-500/20",
    skills: [
      { name: "Firebase", level: 85 },
      { name: "MySQL", level: 80 },
      { name: "RESTful APIs", level: 90 },
    ],
  },
]

// Data Marquee dengan Brand Color Hex Code untuk efek Hover
export const marqueeTechs: MarqueeTech[] = [
  { name: "React", icon: SiReact, hoverColor: "group-hover:text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, hoverColor: "group-hover:text-foreground" },
  { name: "TypeScript", icon: SiTypescript, hoverColor: "group-hover:text-[#3178C6]" },
  { name: "Tailwind", icon: SiTailwindcss, hoverColor: "group-hover:text-[#06B6D4]" },
  { name: "Framer", icon: SiFramer, hoverColor: "group-hover:text-[#0055FF]" },
  { name: "JavaScript", icon: SiJavascript, hoverColor: "group-hover:text-[#F7DF1E]" },
  { name: "Kotlin", icon: SiKotlin, hoverColor: "group-hover:text-[#7F52FF]" },
  { name: "Firebase", icon: SiFirebase, hoverColor: "group-hover:text-[#FFCA28]" },
  { name: "Python", icon: SiPython, hoverColor: "group-hover:text-[#3776AB]" },
  { name: "Figma", icon: SiFigma, hoverColor: "group-hover:text-[#F24E1E]" },
  { name: "Git", icon: SiGit, hoverColor: "group-hover:text-[#F05032]" },
  { name: "MySQL", icon: SiMysql, hoverColor: "group-hover:text-[#4479A1]" },
]
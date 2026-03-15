// file: data/experience.tsx

import { Smartphone, Code, Globe, BrainCircuit, Database } from "lucide-react"
import React from "react"

export interface TimelineItem {
    id: number
    title: string
    company: string
    location: string
    period: string
    type: string
    description: string
    skills: string[]
    category?: string
    isBangkit?: boolean
}

export interface CertificateItem {
    id: number
    name: string
    issuer: string
    year: string
    icon: React.ReactNode
}

export const experiencesData: TimelineItem[] = [
    {
        id: 1,
        title: "Front-End Developer",
        company: "PT. Klik Digital Sinergi",
        location: "Jakarta, Indonesia",
        period: "Jan 2025 - Feb 2025",
        type: "Internship",
        description: "Developed responsive dashboard using Next.js, TypeScript, and modern CSS frameworks.",
        skills: ["Next.js", "TypeScript", "CSS", "JavaScript"],
    },
    {
        id: 2,
        title: "Front-End Developer",
        company: "PT. Telekomunikasi Selular",
        location: "Jakarta, Indonesia",
        period: "Jul 2024 - Aug 2024",
        type: "Internship",
        description: "Contributed to web development projects using modern frameworks and best practices.",
        skills: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
        id: 3,
        title: "Teaching Assistant",
        company: "Diponegoro University",
        location: "Semarang, Indonesia",
        period: "Feb 2024 - Jun 2024",
        type: "Part-time",
        description: "Mentored students in programming fundamentals and computer science concepts.",
        skills: ["Teaching", "Java", "Programming", "Mentoring"],
    },
    {
        id: 4,
        title: "Mobile Development Cohort",
        company: "Bangkit Academy by Google, Tokopedia, Gojek & Traveloka",
        location: "Remote, Indonesia",
        period: "Feb 2024 - Jul 2024",
        type: "Bootcamp",
        description: "Intensive 6-month program focusing on mobile development, machine learning, and cloud computing. Completed capstone project Si-Bantu with team collaboration.",
        skills: ["Android Development", "Kotlin", "Machine Learning", "TensorFlow", "Firebase", "GCP"],
        isBangkit: true,
    },
]

export const educationData: TimelineItem[] = [
    {
        id: 1,
        title: "Computer Engineering",
        company: "Diponegoro University",
        location: "Semarang, Indonesia",
        period: "2022 - Present",
        type: "Bachelor's Degree",
        description: "Focusing on software development, algorithms, and computer systems.",
        skills: ["Software Engineering", "Data Structures", "Algorithms"],
    },
    {
        id: 2,
        title: "Mathematics & Natural Sciences",
        company: "SMA Negeri 55",
        location: "Jakarta, Indonesia",
        period: "2019 - 2022",
        type: "High School",
        description: "Specialized in STEM subjects with focus on mathematics and physics.",
        skills: ["Mathematics", "Physics", "Chemistry"],
    },
]

export const organizationsData: TimelineItem[] = [
    {
        id: 1,
        title: "Member",
        company: "Google Developer Student Clubs (GDSC)",
        location: "Diponegoro University",
        period: "Sep 2023 - Jul 2024",
        type: "Organization",
        description: "Bridge between theory and practice to develop skills in technology especially Google Technologies.",
        skills: ["Google Technologies", "Community Building", "Leadership"],
    },
    {
        id: 2,
        title: "Member",
        company: "Computer Engineering Research Club (CERC)",
        location: "Diponegoro University",
        period: "Apr 2023 - Jun 2024",
        type: "Organization",
        description: "Software field division aiming to improve programming skills, especially in frontend and backend.",
        skills: ["Programming", "Frontend", "Backend", "Research"],
    },
]

export const certificatesData: CertificateItem[] = [
    { id: 1, name: "Belajar Fundamental Aplikasi Android", issuer: "Dicoding Indonesia", year: "2023", icon: <Smartphone className="h-6 w-6" /> },
    { id: 2, name: "Memulai Pemrograman dengan Kotlin", issuer: "Dicoding Indonesia", year: "2023", icon: <Code className="h-6 w-6" /> },
    { id: 3, name: "CCNAv7: Introduction to Networks", issuer: "Cisco Networking Academy", year: "2023", icon: <Globe className="h-6 w-6" /> },
    { id: 4, name: "Belajar Dasar AI", issuer: "Dicoding Indonesia", year: "2023", icon: <BrainCircuit className="h-6 w-6" /> },
    { id: 5, name: "Database Design Learner", issuer: "Oracle Academy", year: "2023", icon: <Database className="h-6 w-6" /> },
]
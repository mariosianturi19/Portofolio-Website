export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      greeting: "Hi, I'm Mario Sianturi",
      role: "Web Developer & Mobile App Creator",
      description: "Passionate Computer Engineering student at Diponegoro University, specializing in mobile and web development. Bangkit Academy 2024 graduate with 10+ GitHub repositories, building innovative solutions and contributing to the tech community.",
      viewProjects: "View My Projects",
      github: "GitHub",
    },
    about: {
      title: "Get to know me",
      badge: "About Me",
    },
    projects: {
      title: "Featured Projects",
      badge: "My Work",
      all: "All",
      web: "Web",
      mobile: "Mobile",
      algorithm: "Algorithm",
    },
    skills: {
      title: "What I Work With",
      badge: "Skills & Technologies",
    },
    experience: {
      title: "Experience & Education",
      badge: "Background",
    },
    contact: {
      title: "Get In Touch",
      badge: "Let's Connect",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send Message",
    },
    footer: {
      rights: "All rights reserved.",
      backToTop: "Back to top",
      visits: "visits",
    },
  },
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang",
      projects: "Proyek",
      skills: "Keahlian",
      experience: "Pengalaman",
      contact: "Kontak",
    },
    hero: {
      greeting: "Hai, Saya Mario Sianturi",
      role: "Pengembang Web & Pembuat Aplikasi Mobile",
      description: "Mahasiswa Teknik Komputer yang bersemangat di Universitas Diponegoro, mengkhususkan diri dalam pengembangan mobile dan web. Lulusan Bangkit Academy 2024 dengan 10+ repositori GitHub, membangun solusi inovatif dan berkontribusi pada komunitas teknologi.",
      viewProjects: "Lihat Proyek Saya",
      github: "GitHub",
    },
    about: {
      title: "Kenali saya lebih dekat",
      badge: "Tentang Saya",
    },
    projects: {
      title: "Proyek Unggulan",
      badge: "Karya Saya",
      all: "Semua",
      web: "Web",
      mobile: "Mobile",
      algorithm: "Algoritma",
    },
    skills: {
      title: "Apa yang Saya Gunakan",
      badge: "Keahlian & Teknologi",
    },
    experience: {
      title: "Pengalaman & Pendidikan",
      badge: "Latar Belakang",
    },
    contact: {
      title: "Mari Terhubung",
      badge: "Hubungi Saya",
      name: "Nama",
      email: "Email",
      subject: "Subjek",
      message: "Pesan",
      send: "Kirim Pesan",
    },
    footer: {
      rights: "Hak cipta dilindungi.",
      backToTop: "Kembali ke atas",
      visits: "kunjungan",
    },
  },
}

export type Language = keyof typeof translations
export type TranslationKeys = typeof translations.en

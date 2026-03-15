"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github, Send, Loader2, Sparkles, MessageSquare } from "lucide-react"
// Menggunakan Toast hook yang sudah ada di repo Anda untuk UX yang lebih premium
import { useToast } from "@/hooks/use-toast" 

export default function Contact() {
  const { toast } = useToast()
  const form = useRef<HTMLFormElement>(null)
  
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize EmailJS
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.user_name || formData.user_name.trim().length < 2) {
      newErrors.user_name = "Name must be at least 2 characters."
    }
    if (!formData.user_email || !/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = "Please enter a valid email address."
    }
    if (!formData.subject || formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters."
    }
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters."
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: "Configuration Error",
        description: "Email service is not configured properly.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      if (!form.current) throw new Error("Form reference not found")

      await emailjs.sendForm(serviceId, templateId, form.current, publicKey)

      toast({
        title: "Message Sent Successfully! 🎉",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      })

      setFormData({ user_name: "", user_email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Failed to send email:", error)
      toast({
        title: "Failed to send message",
        description: "Something went wrong. Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  }

  const contactCards = [
    { icon: <Mail className="h-6 w-6" />, label: "Email", value: "19mariosianturi@gmail.com", href: "mailto:19mariosianturi@gmail.com", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: <Phone className="h-6 w-6" />, label: "WhatsApp", value: "+62 877 1655 4446", href: "https://wa.me/6287716554446", color: "text-green-500", bg: "bg-green-500/10" },
    { icon: <MapPin className="h-6 w-6" />, label: "Location", value: "Semarang, Indonesia", href: null, color: "text-rose-500", bg: "bg-rose-500/10" },
  ]

  const socialLinks = [
    { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/togar-anthony-mario-sianturi/", label: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/mariosianturi19", label: "GitHub" },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      
      {/* Premium Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-md text-sm font-medium mb-6 shadow-sm">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span>Let&apos;s Connect</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
            Get In Touch
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project in mind, looking for a developer, or just want to chat? I&apos;d love to hear from you. Let&apos;s create something amazing together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 max-w-7xl mx-auto items-start">
          
          {/* Left Column: Contact Info Bento */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="grid gap-4">
              {contactCards.map((item, index) => (
                <motion.div key={item.label} variants={itemVariants}>
                  <div className="group relative overflow-hidden rounded-3xl bg-background/50 backdrop-blur-xl border border-border/50 p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                    {/* Hover Glow Effect */}
                    <div className={`absolute top-0 right-0 w-32 h-32 ${item.bg} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="flex items-center gap-5 relative z-10">
                      <div className={`p-4 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">{item.label}</h4>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-lg font-semibold text-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-primary/5 border border-primary/10 mt-2">
              <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Social Profiles
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="p-4 rounded-2xl bg-background border border-border/50 text-foreground hover:text-primary hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Glassmorphism Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-[2.5rem] bg-card/30 backdrop-blur-2xl border border-border/50 shadow-2xl overflow-hidden">
              {/* Form Inner Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/10 blur-[80px] pointer-events-none" />
              
              <div className="p-8 md:p-10 relative z-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  Send me a message
                  <div className="h-1 flex-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full opacity-50" />
                </h3>

                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="user_name" className="text-sm font-semibold text-foreground/80 ml-1">Full Name</label>
                      <Input
                        id="user_name"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 rounded-xl transition-all ${errors.user_name ? 'border-destructive focus-visible:ring-destructive/30' : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.user_name && <p className="text-xs text-destructive ml-1">{errors.user_name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="user_email" className="text-sm font-semibold text-foreground/80 ml-1">Email Address</label>
                      <Input
                        id="user_email"
                        name="user_email"
                        type="email"
                        value={formData.user_email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 rounded-xl transition-all ${errors.user_email ? 'border-destructive focus-visible:ring-destructive/30' : ''}`}
                        disabled={isSubmitting}
                      />
                      {errors.user_email && <p className="text-xs text-destructive ml-1">{errors.user_email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-semibold text-foreground/80 ml-1">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className={`h-12 bg-background/50 border-border/50 focus-visible:ring-primary/30 rounded-xl transition-all ${errors.subject ? 'border-destructive focus-visible:ring-destructive/30' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.subject && <p className="text-xs text-destructive ml-1">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground/80 ml-1">Your Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, ideas, or just say hello..."
                      className={`min-h-[150px] resize-none bg-background/50 border-border/50 focus-visible:ring-primary/30 rounded-xl p-4 transition-all ${errors.message ? 'border-destructive focus-visible:ring-destructive/30' : ''}`}
                      disabled={isSubmitting}
                    />
                    {errors.message && <p className="text-xs text-destructive ml-1">{errors.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full h-14 text-base font-semibold rounded-xl bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-primary/25 group overflow-hidden relative"
                  >
                    {/* Animated shine effect on button */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
                    
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 relative z-10">
                        Send Message
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  )
}
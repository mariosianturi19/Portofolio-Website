"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Magnetic from "@/components/Magnetic"
import { Mail, Phone, MapPin, Linkedin, Github, Send, Loader2, ArrowUpRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ContactFormData = {
  user_name: string
  user_email: string
  subject: string
  message: string
}

type ContactField = keyof ContactFormData
type ContactErrors = Partial<Record<ContactField, string>>
type FormStatus = {
  type: "idle" | "submitting" | "success" | "error"
  message: string
}

type FormspreeErrorResponse = {
  errors?: Array<{ message?: string }>
}

const initialFormData: ContactFormData = {
  user_name: "",
  user_email: "",
  subject: "",
  message: "",
}

const fieldOrder: ContactField[] = ["user_name", "user_email", "subject", "message"]
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const EASE = [0.16, 1, 0.3, 1] as const

export default function Contact() {
  const { toast } = useToast()
  const fieldRefs = useRef<Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>>>({})

  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [errors, setErrors] = useState<ContactErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle", message: "" })

  const formspreeFormId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim()
  const formEndpoint = formspreeFormId && /^[a-zA-Z0-9]+$/.test(formspreeFormId)
    ? `https://formspree.io/f/${formspreeFormId}`
    : null

  const validateField = (name: ContactField, value: string) => {
    const trimmedValue = value.trim()

    if (name === "user_name") {
      if (trimmedValue.length < 2) return "Name must be at least 2 characters."
      if (trimmedValue.length > 80) return "Name must be 80 characters or fewer."
    }

    if (name === "user_email") {
      if (!emailPattern.test(trimmedValue)) {
        return "Please enter a valid email address."
      }
    }

    if (name === "subject") {
      if (trimmedValue.length < 5) return "Subject must be at least 5 characters."
      if (trimmedValue.length > 120) return "Subject must be 120 characters or fewer."
    }

    if (name === "message") {
      if (trimmedValue.length < 10) return "Message must be at least 10 characters."
      if (trimmedValue.length > 2000) return "Message must be 2,000 characters or fewer."
    }

    return ""
  }

  const validateForm = () => {
    const newErrors = fieldOrder.reduce<ContactErrors>((result, field) => {
      const error = validateField(field, formData[field])
      if (error) result[field] = error
      return result
    }, {})

    setErrors(newErrors)

    const firstInvalidField = fieldOrder.find((field) => newErrors[field])
    if (firstInvalidField) {
      setFormStatus({
        type: "error",
        message: "Please review the highlighted fields before sending your message.",
      })
      requestAnimationFrame(() => fieldRefs.current[firstInvalidField]?.focus())
      return false
    }

    return true
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as ContactField
    const { value } = e.target

    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    if (formStatus.type !== "idle") {
      setFormStatus({ type: "idle", message: "" })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as ContactField
    const error = validateField(name, e.target.value)
    setErrors((prev) => ({ ...prev, [name]: error || undefined }))
  }

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formElement = e.currentTarget

    if (!validateForm()) return

    if (!formEndpoint) {
      const message = "The contact form is temporarily unavailable. Please use the email link beside it."
      setFormStatus({ type: "error", message })
      toast({
        title: "Contact form unavailable",
        description: message,
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setFormStatus({ type: "submitting", message: "Sending your message…" })

    try {
      const payload = new FormData(formElement)
      payload.delete("user_name")
      payload.delete("user_email")
      payload.set("name", formData.user_name.trim())
      payload.set("email", formData.user_email.trim())
      payload.set("subject", formData.subject.trim())
      payload.set("message", formData.message.trim())

      const response = await fetch(formEndpoint, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      })

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as FormspreeErrorResponse | null
        const errorMessage = errorBody?.errors
          ?.map((error) => error.message)
          .filter(Boolean)
          .join(" ")

        throw new Error(errorMessage || `Formspree request failed with status ${response.status}`)
      }

      toast({
        title: "Message sent successfully",
        description: "Thank you for reaching out. I'll respond as soon as possible.",
      })

      setFormData(initialFormData)
      setErrors({})
      setFormStatus({
        type: "success",
        message: "Your message was sent successfully. Thank you for reaching out.",
      })
    } catch (error) {
      console.error("Failed to send email:", error)
      const message = "Something went wrong. Please try again or contact me directly via email."
      setFormStatus({ type: "error", message })
      toast({
        title: "Failed to send message",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactRows = [
    { icon: <Mail className="h-4 w-4" />, label: "Email", value: "19mariosianturi@gmail.com", href: "mailto:19mariosianturi@gmail.com" },
    { icon: <Phone className="h-4 w-4" />, label: "WhatsApp", value: "+62 877 1655 4446", href: "https://wa.me/6287716554446" },
    { icon: <MapPin className="h-4 w-4" />, label: "Location", value: "Jakarta, Indonesia", href: null },
  ]

  const socialLinks = [
    { icon: <Linkedin className="h-4 w-4" />, href: "https://www.linkedin.com/in/togar-anthony-mario-sianturi/", label: "LinkedIn" },
    { icon: <Github className="h-4 w-4" />, href: "https://github.com/mariosianturi19", label: "GitHub" },
  ]

  const fieldClass = (hasError: boolean) =>
    `min-h-12 rounded-none border-0 border-b bg-transparent px-0 py-3 text-base focus-visible:border-primary ${hasError ? "border-destructive" : "border-border/25"}`

  return (
    <section id="contact" className="relative bg-background py-20 sm:py-24 md:py-36">
      <div className="container-custom relative z-10">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 min-w-0 sm:mb-16 md:mb-24"
        >
          <p className="section-label mb-5">05 / Let&apos;s Connect</p>
          <h2 className="break-normal font-display text-[clamp(2.75rem,13vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-[9vw] lg:text-8xl">
            Get In<br />
            <span className="text-outline">Touch</span>
          </h2>
          <p className="mt-8 max-w-[55ch] text-base font-light leading-8 text-muted-foreground md:text-lg">
            For developer roles, project collaboration, or questions about my work, send a message or contact me directly.
          </p>
        </motion.div>

        <div className="grid min-w-0 items-start gap-14 sm:gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ── Kiri: kontak langsung ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-5"
          >
            <h3 className="sr-only">Contact details</h3>
            <div className="border-t border-border/10">
              {contactRows.map((item) => (
                <div key={item.label} className="group flex min-w-0 items-start gap-4 border-b border-border/10 py-5 sm:items-center sm:gap-5 sm:py-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/20 text-muted-foreground transition-colors duration-300 group-hover:border-primary group-hover:text-primary">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="break-all text-sm font-medium leading-6 text-foreground transition-colors hover:text-primary min-[380px]:text-base sm:break-words sm:text-lg"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-foreground sm:text-lg">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Social profiles</p>
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${social.label} profile in a new tab`}
                    className="group flex h-12 w-12 items-center justify-center rounded-full border border-border/20 text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
                  >
                    {social.icon}
                  </a>
                ))}
                <a
                  href="mailto:19mariosianturi@gmail.com"
                  className="group mt-2 inline-flex min-h-11 w-full min-w-0 items-center gap-2 break-all font-mono text-[10px] uppercase leading-5 tracking-[0.08em] text-muted-foreground transition-colors hover:text-primary sm:ml-2 sm:mt-0 sm:w-auto sm:text-[11px] sm:tracking-[0.12em]"
                >
                  19mariosianturi@gmail.com
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Kanan: form underline ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="mb-8 flex min-w-0 flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 id="contact-form-title" className="font-display text-2xl font-extrabold uppercase tracking-tight">
                Send a message
              </h3>
              <p id="contact-required-note" className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                All fields required
              </p>
            </div>

            <form
              onSubmit={sendEmail}
              noValidate
              aria-labelledby="contact-form-title"
              aria-describedby="contact-required-note contact-form-status"
              className="space-y-8"
            >
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="user_name" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">01 — Full Name</label>
                  <Input
                    ref={(node) => { fieldRefs.current.user_name = node }}
                    id="user_name"
                    name="user_name"
                    type="text"
                    value={formData.user_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    autoComplete="name"
                    minLength={2}
                    maxLength={80}
                    required
                    aria-invalid={Boolean(errors.user_name)}
                    aria-describedby={errors.user_name ? "user_name-error" : undefined}
                    className={fieldClass(Boolean(errors.user_name))}
                    disabled={isSubmitting}
                  />
                  {errors.user_name && <p id="user_name-error" className="text-xs text-destructive">{errors.user_name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="user_email" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">02 — Email Address</label>
                  <Input
                    ref={(node) => { fieldRefs.current.user_email = node }}
                    id="user_email"
                    name="user_email"
                    type="email"
                    value={formData.user_email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="john@example.com"
                    autoComplete="email"
                    maxLength={254}
                    required
                    aria-invalid={Boolean(errors.user_email)}
                    aria-describedby={errors.user_email ? "user_email-error" : undefined}
                    className={fieldClass(Boolean(errors.user_email))}
                    disabled={isSubmitting}
                  />
                  {errors.user_email && <p id="user_email-error" className="text-xs text-destructive">{errors.user_email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">03 — Subject</label>
                <Input
                  ref={(node) => { fieldRefs.current.subject = node }}
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Project Inquiry"
                  minLength={5}
                  maxLength={120}
                  required
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  className={fieldClass(Boolean(errors.subject))}
                  disabled={isSubmitting}
                />
                {errors.subject && <p id="subject-error" className="text-xs text-destructive">{errors.subject}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">04 — Your Message</label>
                <Textarea
                  ref={(node) => { fieldRefs.current.message = node }}
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  minLength={10}
                  maxLength={2000}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`min-h-[140px] resize-none ${fieldClass(Boolean(errors.message))}`}
                  disabled={isSubmitting}
                />
                {errors.message && <p id="message-error" className="text-xs text-destructive">{errors.message}</p>}
              </div>

              <p
                id="contact-form-status"
                role={formStatus.type === "error" ? "alert" : "status"}
                aria-live={formStatus.type === "error" ? "assertive" : "polite"}
                className={`min-h-5 font-mono text-xs tracking-[0.05em] ${
                  formStatus.type === "error"
                    ? "text-destructive"
                    : formStatus.type === "success"
                      ? "text-primary"
                      : "text-muted-foreground"
                }`}
              >
                {formStatus.message}
              </p>

              <Magnetic strength={0.15} className="w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-describedby="contact-form-status"
                  className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-primary text-base font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.45)] disabled:pointer-events-none disabled:opacity-50 sm:w-auto sm:px-14"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </Magnetic>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100dvh] min-w-0 flex-col items-center justify-center overflow-hidden bg-background px-6 py-24 text-center">
      <div className="relative z-10 flex max-w-xl flex-col items-center">
        <p className="section-label mb-6">Error / 404</p>

        <h1 className="text-outline font-display text-[clamp(6rem,28vw,16rem)] font-extrabold leading-[0.85] tracking-tight">
          404
        </h1>

        <h2 className="mt-8 font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
          Page not found
        </h2>

        <p className="mt-5 max-w-sm text-base font-light leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          href="/"
          className="group mt-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-border/25 px-7 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
      </div>
    </main>
  )
}

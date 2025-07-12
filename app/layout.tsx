import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StickyHeader } from "@/components/sticky-header"
import { CustomCursor } from "@/components/custom-cursor"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { EnhancedNootBot } from "@/components/enhanced-noot-bot"
import { AccessibleUtilities } from "@/components/accessible-utilities"
import { LoadingProvider } from "@/contexts/loading-context"
import { TopLineLoader } from "@/components/top-line-loader"
import { PopoverLoader } from "@/components/popover-loader"
import { ResumeDownload } from "@/components/resume-download"
import { ClientPageTransition } from "@/components/client-page-transition"
import { DynamicFooter } from "@/components/dynamic-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abel Majadibodu - Full Stack Developer",
  description: "Innovative Full-Stack Engineer with 5+ years of experience building end-to-end solutions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingProvider>
          <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
            <div className="content-wrapper">
              <CustomCursor />
              <TopLineLoader />
              <PopoverLoader />
              <StickyHeader />
              <ThemeToggle />
              <ClientPageTransition />
              <main className="pt-20">{children}</main>
              <DynamicFooter />
              <EnhancedNootBot />
              <AccessibleUtilities />
              <ResumeDownload />
            </div>
          </ThemeProvider>
        </LoadingProvider>
      </body>
    </html>
  )
}

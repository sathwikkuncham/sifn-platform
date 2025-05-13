import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavigationPanel from "@/components/navigation-panel"
import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import { MobileNavIndicator } from "@/components/mobile-nav-indicator"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "SIFN - Startup Idea Framework Navigator",
  description: "A comprehensive platform to generate, evaluate, validate, and execute your startup ideas",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-background to-background/80">
            <NavigationPanel />
            <main className="flex-1 overflow-y-auto w-full">{children}</main>
          </div>
        </ThemeProvider>
        <MobileNavIndicator />
      </body>
    </html>
  )
}

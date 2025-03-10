import type React from "react"
import type { Metadata } from "next"
import { Cairo } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { cn } from "@/lib/utils"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
})

export const metadata: Metadata = {
  title: "كلية التربية",
  description: "موقع تعريفي بكلية التربية",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cn("min-h-screen bg-background font-sans antialiased", cairo.variable)}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem> */}
          <Header />
          <main className="flex-1">{children}</main>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}

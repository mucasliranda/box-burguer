import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Rajdhani } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { CategoryProvider } from "@/lib/category-context"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-heading",
})

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "BoxBurguer - Hamburgueria Temática F1",
  description: "A melhor hamburgueria com tema de Fórmula 1. Velocidade e sabor em cada mordida!",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      // {
      //   url: "/icon.svg",
      //   type: "image/svg+xml",
      // },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${orbitron.variable} ${rajdhani.variable} font-body antialiased`}>
        <CategoryProvider>
          {children}
          <Analytics />
          <Toaster />
        </CategoryProvider>
      </body>
    </html>
  )
}

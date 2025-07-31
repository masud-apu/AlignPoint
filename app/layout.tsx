import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Alignpoint",
  description: "Created with Xylo",
  generator: "Xylo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
"use client"

import { AlignpointLogo } from "@/components/alignpoint-logo"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-alignpoint-gray-50">
      <header className="bg-white border-b border-alignpoint-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <AlignpointLogo size="md" showText={true} />
        </div>
      </header>
      {children}
    </div>
  )
}

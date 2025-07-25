"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function SettingsContent() {
  const [activeSection, setActiveSection] = useState("general")

  const settings = [
    {
      id: "personal",
      title: "Personal Settings",
      icon: "👤",
      description: "Manage your personal information and preferences",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-alignpoint-gray-300 rounded-full flex items-center justify-center text-2xl font-medium">
                A
              </div>
              <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                Change Avatar
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-alignpoint-black mb-1 block">First Name</label>
                <input type="text" defaultValue="Alex" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              </div>
              <div>
                <label className="text-sm font-medium text-alignpoint-black mb-1 block">Last Name</label>
                <input type="text" defaultValue="Admin" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-alignpoint-black mb-1 block">Email Address</label>
              <input type="email" defaultValue="alex@alignpoint.com" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
            </div>
            <div>
              <label className="text-sm font-medium text-alignpoint-black mb-1 block">Job Title</label>
              <input type="text" defaultValue="Administrator" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
            </div>
            <div>
              <label className="text-sm font-medium text-alignpoint-black mb-1 block">Time Zone</label>
              <select className="w-full p-2 border border-alignpoint-gray-200 rounded-md">
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </select>
            </div>
            <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white mt-4">
              Save Changes
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "general",
      title: "General Settings",
      icon: "⚙️",
      description: "Configure basic application settings and preferences",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Theme Preferences</h3>
              <p className="text-sm text-alignpoint-gray-500">Choose your preferred theme</p>
            </div>
            <select className="border border-alignpoint-gray-200 rounded-md p-2">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Language</h3>
              <p className="text-sm text-alignpoint-gray-500">Select your preferred language</p>
            </div>
            <select className="border border-alignpoint-gray-200 rounded-md p-2">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notification Settings",
      icon: "🔔",
      description: "Manage your notification preferences",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Email Notifications</h3>
              <p className="text-sm text-alignpoint-gray-500">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-alignpoint-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-alignpoint-red"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Push Notifications</h3>
              <p className="text-sm text-alignpoint-gray-500">Receive push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-alignpoint-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-alignpoint-red"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security Settings",
      icon: "🔒",
      description: "Manage your security preferences",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-alignpoint-black">Change Password</h3>
            <div className="space-y-2">
              <input type="password" placeholder="Current Password" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              <input type="password" placeholder="New Password" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              <input type="password" placeholder="Confirm New Password" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">Update Password</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Two-Factor Authentication</h3>
              <p className="text-sm text-alignpoint-gray-500">Enable 2FA for additional security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-alignpoint-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-alignpoint-red"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "time-tracking",
      title: "Time Tracking Settings",
      icon: "⏱️",
      description: "Configure time tracking preferences",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Default Work Hours</h3>
              <p className="text-sm text-alignpoint-gray-500">Set your default working hours</p>
            </div>
            <input type="number" min="1" max="24" defaultValue="8" className="w-20 p-2 border border-alignpoint-gray-200 rounded-md" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Auto-pause Timer</h3>
              <p className="text-sm text-alignpoint-gray-500">Pause timer after inactivity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-alignpoint-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-alignpoint-red"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "system",
      title: "System Settings",
      icon: "🖥️",
      description: "Configure system-wide settings",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Auto-save Interval</h3>
              <p className="text-sm text-alignpoint-gray-500">Set how often changes are saved</p>
            </div>
            <select className="border border-alignpoint-gray-200 rounded-md p-2">
              <option>30 seconds</option>
              <option>1 minute</option>
              <option>5 minutes</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Data Retention</h3>
              <p className="text-sm text-alignpoint-gray-500">Configure data retention period</p>
            </div>
            <select className="border border-alignpoint-gray-200 rounded-md p-2">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "information",
      title: "System Information",
      icon: "ℹ️",
      description: "View system information and details",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-alignpoint-black">Version</p>
              <p className="text-alignpoint-gray-500">1.0.0</p>
            </div>
            <div>
              <p className="font-medium text-alignpoint-black">Last Updated</p>
              <p className="text-alignpoint-gray-500">July 25, 2025</p>
            </div>
            <div>
              <p className="font-medium text-alignpoint-black">Environment</p>
              <p className="text-alignpoint-gray-500">Production</p>
            </div>
            <div>
              <p className="font-medium text-alignpoint-black">Support</p>
              <p className="text-alignpoint-gray-500">support@alignpoint.com</p>
            </div>
          </div>
          <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white w-full">
            Check for Updates
          </Button>
        </div>
      ),
    },
  ]

  return (
    <section className="max-w-4xl mx-auto py-6">
      <div className="flex gap-6">
        <div className="w-64 space-y-1">
          {settings.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? "bg-alignpoint-red/10 text-alignpoint-red border border-alignpoint-red/20"
                  : "text-alignpoint-gray-600 hover:bg-alignpoint-gray-50 hover:text-alignpoint-black"
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </div>
        <div className="flex-1">
          {settings.map((section) => (
            section.id === activeSection && (
              <Card key={section.id} className="border border-alignpoint-gray-200">
                <CardHeader>
                  <CardTitle className="text-alignpoint-black flex items-center space-x-2">
                    <span>{section.icon}</span>
                    <span>{section.title}</span>
                  </CardTitle>
                  <p className="text-sm text-alignpoint-gray-500">{section.description}</p>
                </CardHeader>
                <CardContent>
                  {section.content}
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </section>
  )
}

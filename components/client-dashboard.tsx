"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlignpointLogo } from "@/components/alignpoint-logo"

interface UserSession {
  email: string
  name: string
  role: string
  avatar: string
}

interface ClientDashboardProps {
  userSession: UserSession
}

interface Milestone {
  id: number
  title: string
  description: string
  status: "upcoming" | "in_progress" | "completed"
  dueDate: string
  completionDate?: string
  visibleToClient: boolean
}

interface ProjectUpdate {
  id: number
  title: string
  content: string
  author: string
  date: string
  type: "milestone" | "general" | "file_shared"
}

interface SharedFile {
  id: number
  name: string
  type: string
  size: string
  sharedDate: string
  sharedBy: string
}

export default function ClientDashboard({ userSession }: ClientDashboardProps) {
  const [selectedProject] = useState("E-commerce Website Redesign") // Demo: single project view

  // Demo project data
  const projectProgress = 75
  const milestones: Milestone[] = [
    {
      id: 1,
      title: "Project Kickoff & Planning",
      description: "Initial requirements gathering, wireframes, and project timeline setup",
      status: "completed",
      dueDate: "2024-05-01",
      completionDate: "2024-04-28",
      visibleToClient: true,
    },
    {
      id: 2,
      title: "Design Phase",
      description: "User interface design, branding integration, and design system creation",
      status: "completed",
      dueDate: "2024-05-15",
      completionDate: "2024-05-12",
      visibleToClient: true,
    },
    {
      id: 3,
      title: "Development Phase",
      description: "Frontend and backend development, database setup, and core functionality",
      status: "in_progress",
      dueDate: "2024-06-01",
      visibleToClient: true,
    },
    {
      id: 4,
      title: "Testing & Quality Assurance",
      description: "Comprehensive testing, bug fixes, and performance optimization",
      status: "upcoming",
      dueDate: "2024-06-15",
      visibleToClient: true,
    },
    {
      id: 5,
      title: "Launch & Deployment",
      description: "Final deployment, launch preparation, and go-live activities",
      status: "upcoming",
      dueDate: "2024-06-30",
      visibleToClient: true,
    },
  ]

  const projectUpdates: ProjectUpdate[] = [
    {
      id: 1,
      title: "Development Progress Update",
      content: "Great progress this week! The user authentication system is now complete and we've started working on the product catalog. The new design system is being implemented across all pages.",
      author: "Priya Manager",
      date: "2024-05-16",
      type: "general",
    },
    {
      id: 2,
      title: "Design Phase Completed",
      content: "All design mockups have been finalized and approved. We're moving into the development phase ahead of schedule. The new visual identity looks fantastic!",
      author: "Alex Admin",
      date: "2024-05-12",
      type: "milestone",
    },
    {
      id: 3,
      title: "New Design Files Shared",
      content: "Updated design files with the latest revisions have been shared in the project files section.",
      author: "Sarah Designer",
      date: "2024-05-10",
      type: "file_shared",
    },
  ]

  const sharedFiles: SharedFile[] = [
    {
      id: 1,
      name: "Final Design Mockups v2.0.figma",
      type: "figma",
      size: "8.2 MB",
      sharedDate: "2024-05-12",
      sharedBy: "Sarah Designer",
    },
    {
      id: 2,
      name: "Project Requirements Document.pdf",
      type: "pdf",
      size: "1.4 MB",
      sharedDate: "2024-05-01",
      sharedBy: "Alex Admin",
    },
    {
      id: 3,
      name: "User Journey Wireframes.pdf",
      type: "pdf",
      size: "3.1 MB",
      sharedDate: "2024-05-05",
      sharedBy: "Priya Manager",
    },
  ]

  const handleLogout = () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-alignpoint-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-alignpoint-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <AlignpointLogo size="md" showText={true} />
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-sm font-medium text-alignpoint-black">{selectedProject}</div>
              <div className="text-xs text-alignpoint-gray-500">Project Dashboard</div>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                <span className="text-sm font-medium">{userSession.avatar}</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-alignpoint-black">{userSession.name}</div>
                <div className="text-xs text-alignpoint-gray-500">Client</div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-alignpoint-gray-600 hover:text-alignpoint-red transition-colors ml-4"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Project Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-alignpoint-black mb-2">{selectedProject}</h1>
          <p className="text-alignpoint-gray-600 mb-6">
            Welcome to your project dashboard. Here you can track progress, view milestones, and stay updated on the latest developments.
          </p>
          
          {/* High-level Progress */}
          <Card className="border-alignpoint-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-alignpoint-black">Overall Progress</h3>
                <span className="text-2xl font-bold text-alignpoint-red">{projectProgress}%</span>
              </div>
              <div className="w-full bg-alignpoint-gray-200 rounded-full h-4">
                <div 
                  className="bg-alignpoint-red h-4 rounded-full transition-all duration-300"
                  style={{ width: `${projectProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-alignpoint-gray-600 mt-2">
                <span>Started: May 1, 2024</span>
                <span>Est. Completion: June 30, 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Milestones */}
            <section>
              <h2 className="text-2xl font-bold text-alignpoint-black mb-6">Key Milestones</h2>
              <div className="space-y-4">
                {milestones.filter(m => m.visibleToClient).map((milestone) => (
                  <MilestoneCard key={milestone.id} milestone={milestone} />
                ))}
              </div>
            </section>

            {/* Project Updates */}
            <section>
              <h2 className="text-2xl font-bold text-alignpoint-black mb-6">Recent Updates</h2>
              <div className="space-y-4">
                {projectUpdates.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Status */}
            <Card className="border-alignpoint-gray-200">
              <CardHeader>
                <CardTitle className="text-alignpoint-black">Project Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-alignpoint-gray-600">Current Phase:</span>
                  <span className="font-medium text-alignpoint-black">Development</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-alignpoint-gray-600">Timeline:</span>
                  <span className="font-medium text-green-600">On Track</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-alignpoint-gray-600">Budget:</span>
                  <span className="font-medium text-green-600">Within Scope</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-alignpoint-gray-600">Next Milestone:</span>
                  <span className="font-medium text-alignpoint-black">Jun 15</span>
                </div>
              </CardContent>
            </Card>

            {/* Team Contact */}
            <Card className="border-alignpoint-gray-200">
              <CardHeader>
                <CardTitle className="text-alignpoint-black">Your Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-alignpoint-red text-white rounded-full flex items-center justify-center text-sm font-medium">
                    A
                  </div>
                  <div>
                    <div className="font-medium text-alignpoint-black">Alex Admin</div>
                    <div className="text-xs text-alignpoint-gray-500">Project Lead</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    P
                  </div>
                  <div>
                    <div className="font-medium text-alignpoint-black">Priya Manager</div>
                    <div className="text-xs text-alignpoint-gray-500">Project Manager</div>
                  </div>
                </div>
                <div className="pt-2 border-t border-alignpoint-gray-200">
                  <p className="text-xs text-alignpoint-gray-600">
                    Have questions? Reach out to your project manager anytime.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shared Files */}
            <Card className="border-alignpoint-gray-200">
              <CardHeader>
                <CardTitle className="text-alignpoint-black">Shared Files</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sharedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border border-alignpoint-gray-200 rounded-lg hover:bg-alignpoint-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">{getFileIcon(file.type)}</div>
                      <div>
                        <div className="font-medium text-alignpoint-black text-sm">{file.name}</div>
                        <div className="text-xs text-alignpoint-gray-500">
                          {file.size} • {file.sharedDate}
                        </div>
                      </div>
                    </div>
                    <button className="text-alignpoint-red hover:text-alignpoint-red/80 text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Milestone Card Component
───────────────────────────────────────────────────────── */

function MilestoneCard({ milestone }: { milestone: Milestone }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return "✅"
      case "in_progress": return "🚀"
      case "upcoming": return "⏳"
      default: return "📋"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-200"
      case "in_progress": return "bg-blue-100 text-blue-800 border-blue-200"
      case "upcoming": return "bg-alignpoint-gray-100 text-alignpoint-gray-800 border-alignpoint-gray-200"
      default: return "bg-alignpoint-gray-100 text-alignpoint-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed"
      case "in_progress": return "In Progress"
      case "upcoming": return "Upcoming"
      default: return status
    }
  }

  return (
    <Card className="border-alignpoint-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getStatusIcon(milestone.status)}</span>
            <div>
              <h3 className="text-lg font-semibold text-alignpoint-black">{milestone.title}</h3>
              <p className="text-alignpoint-gray-600 mt-1">{milestone.description}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(milestone.status)}`}>
            {getStatusText(milestone.status)}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm text-alignpoint-gray-600">
          <span>Due: {milestone.dueDate}</span>
          {milestone.completionDate && (
            <span className="text-green-600 font-medium">Completed: {milestone.completionDate}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────
   Update Card Component
─────────────────────────────────────────────��─────────── */

function UpdateCard({ update }: { update: ProjectUpdate }) {
  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "milestone": return "🎯"
      case "file_shared": return "📎"
      case "general": return "📝"
      default: return "📢"
    }
  }

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case "milestone": return "bg-purple-100 text-purple-800"
      case "file_shared": return "bg-blue-100 text-blue-800"
      case "general": return "bg-green-100 text-green-800"
      default: return "bg-alignpoint-gray-100 text-alignpoint-gray-800"
    }
  }

  return (
    <Card className="border-alignpoint-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getUpdateTypeColor(update.type)}`}>
              <span className="text-lg">{getUpdateIcon(update.type)}</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-alignpoint-black">{update.title}</h3>
              <span className="text-sm text-alignpoint-gray-500">{update.date}</span>
            </div>
            <p className="text-alignpoint-gray-700 mb-3">{update.content}</p>
            <div className="text-sm text-alignpoint-gray-500">
              by {update.author}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────
   Helper Functions
───────────────────────────────────────────────────────── */

function getFileIcon(type: string) {
  switch (type) {
    case "pdf": return "📄"
    case "figma": return "🎨"
    case "doc": return "📝"
    case "image": return "🖼️"
    default: return "📁"
  }
}

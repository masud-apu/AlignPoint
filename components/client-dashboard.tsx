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

interface TeamRequest {
  id: number
  question: string
  requestedBy: string
  requestedAt: string
  status: "pending" | "answered" | "clarification_needed"
  response?: string
  responseAt?: string
}

interface Project {
  id: number
  name: string
  description: string
  progress: number
  startDate: string
  dueDate: string
  status: "active" | "on_hold" | "completed"
  currentPhase: string
  timeline: "on_track" | "delayed" | "ahead"
  instructions: string
  nextMilestone: string
  notes?: string
  teamRequests: TeamRequest[]
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
  const [selectedProjectId, setSelectedProjectId] = useState<number>(1)

  // Demo projects data
  const projects: Project[] = [
    {
      id: 1,
      name: "MediRemind App Development",
      description: "Mobile application for medication reminders and health organization",
      progress: 75,
      startDate: "2024-05-01",
      dueDate: "2024-06-30",
      status: "active",
      currentPhase: "Development",
      timeline: "on_track",
      notes: "The recent UI changes look great! Would be helpful to add larger text size option for elderly users.",
      instructions: `✅ Project Instructions Document
Project Title: Xylo Health – MediRemind App Development
Prepared for: Xylo Dev & Design Team
Version: 1.0
Date: July 28, 2025
Prepared by: Masud Pervez Apu

🟨 BIF Format
🔷 B – Background
Overview:
The MediRemind app is a mobile application aimed at simplifying medical routines for elders and families by offering an intuitive, accessible medication reminder and health organizer.

Goal:
Create a user-friendly Android app that includes features like pill reminders, doctor appointment tracking, family sharing, emergency contact buttons, and optional widgets.

Target Audience:
Elderly users (age 55+), caregivers, and family members who want to monitor or remind loved ones about their health routine.

Tech Stack:
Platform: Android
Language: Kotlin / Flutter (based on developer preference)
UI Design: Figma (provided)
Database: SQLite (local) with optional Google Sync
Widgets: For quick pill reminders and daily health overview

🔷 I – Instructions
📱 App Features Breakdown
Feature\tDescription
User Accounts\tNo login required; local data saving with optional Google sync
Add Medicine\tName, dosage, time(s), frequency (daily/weekly/monthly), notes
Reminder Notification\tPush notification with sound/vibration + persistent widget notification
Doctor Appointments\tAdd, view, edit upcoming appointments
Emergency Contact Button\tCall/SMS pre-set numbers from homescreen or app main screen
Family Share (Optional)\tExport schedule or backup to Google Drive to share with others
Widgets\t1x1 and 2x2 home screen widgets with today's meds and quick add button

📋 Developer Instructions
- Clone Repo from provided GitHub link and set up your local environment.
- Use branching workflow: create a new branch for each major feature.
- Implement UI as per provided Figma design file (v1.1).
- Integrate local notifications API for reminders.
- For emergency features, use system intent for SMS and calling.
- Keep code modular and readable with clear comments.
- All code must pass Android Lint checks and be tested on:
  - Android 9
  - Android 12
  - Android 14 (latest)`,
      nextMilestone: "Jun 15",
      teamRequests: [
        {
          id: 1,
          question: "Could you provide more details about the text size preferences for elderly users?",
          requestedBy: "Sarah Designer",
          requestedAt: "2024-07-28",
          status: "pending"
        },
        {
          id: 2,
          question: "Would you like to schedule a demo of the current medication reminder interface?",
          requestedBy: "Alex Admin",
          requestedAt: "2024-07-27",
          status: "answered",
          response: "Yes, Thursday afternoon would work best for me.",
          responseAt: "2024-07-27"
        }
      ]
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      progress: 45,
      startDate: "2024-06-01",
      dueDate: "2024-08-30",
      status: "active",
      currentPhase: "Design",
      timeline: "on_track",
      instructions: "Focus on user experience. Regular testing required. Follow iOS and Android design guidelines.",
      nextMilestone: "Jul 15",
      teamRequests: []
    },
    {
      id: 3,
      name: "Brand Identity Refresh",
      description: "Complete brand refresh including logo, colors, and marketing materials",
      progress: 90,
      startDate: "2024-04-01",
      dueDate: "2024-07-15",
      status: "active",
      currentPhase: "Final Review",
      timeline: "ahead",
      instructions: "Maintain consistency across all deliverables. Present multiple options for key elements.",
      nextMilestone: "Jul 10",
      teamRequests: []
    }
  ]

  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0]
  const projectProgress = currentProject.progress
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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-alignpoint-gray-200 shadow-sm">
        <div className="px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <AlignpointLogo size="md" showText={true} />
              <div className="min-w-[240px]">
                <select
                  value={selectedProjectId}
                  onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white border border-alignpoint-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-alignpoint-red focus:border-transparent text-sm shadow-sm"
                >
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                <div className="text-xs text-alignpoint-gray-500 mt-1">Project Dashboard</div>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-sm font-medium">{userSession.avatar}</span>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-alignpoint-black">{userSession.name}</div>
                  <div className="text-xs text-alignpoint-gray-500">Client</div>
                </div>
              </div>
              <div className="h-6 w-px bg-alignpoint-gray-200"></div>
              <button
                onClick={handleLogout}
                className="text-sm text-alignpoint-gray-600 hover:text-alignpoint-red transition-colors flex items-center space-x-1"
              >
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-8">
        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-alignpoint-gray-200">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-alignpoint-black mb-2">{projects.length}</span>
              <span className="text-sm text-alignpoint-gray-600">Total Projects</span>
            </CardContent>
          </Card>
          <Card className="border-alignpoint-gray-200">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-green-600 mb-2">
                {projects.filter(p => p.status === 'active').length}
              </span>
              <span className="text-sm text-alignpoint-gray-600">Active Projects</span>
            </CardContent>
          </Card>
          <Card className="border-alignpoint-gray-200">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-bold text-blue-600 mb-2">
                {projects.filter(p => p.status === 'completed').length}
              </span>
              <span className="text-sm text-alignpoint-gray-600">Completed Projects</span>
            </CardContent>
          </Card>
        </div>

        {/* Your Projects Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-alignpoint-black mb-6">Your Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Card 
                key={project.id} 
                className={`border-alignpoint-gray-200 cursor-pointer transition-all duration-200 hover:border-alignpoint-red ${
                  selectedProjectId === project.id ? 'ring-2 ring-alignpoint-red' : ''
                }`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-alignpoint-black mb-1">{project.name}</h3>
                      <p className="text-sm text-alignpoint-gray-600">{project.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-800' :
                      project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-alignpoint-gray-200 rounded-full h-2">
                      <div 
                        className="bg-alignpoint-red h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-alignpoint-gray-600">
                      <span>{project.progress}% Complete</span>
                      <span>{project.currentPhase}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Selected Project Details */}
        {currentProject && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-alignpoint-black mb-2">{currentProject.name}</h1>
              <p className="text-alignpoint-gray-600 mb-6">
                {currentProject.description}
              </p>
            </div>

            {/* Project Details */}
            <Card className="border-alignpoint-gray-200 mb-8">
              <CardHeader>
                <CardTitle className="text-alignpoint-black">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-alignpoint-gray-600">Current Phase:</span>
                      <span className="font-medium text-alignpoint-black">{currentProject.currentPhase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alignpoint-gray-600">Timeline:</span>
                      <span className={`font-medium ${
                        currentProject.timeline === 'on_track' ? 'text-green-600' :
                        currentProject.timeline === 'ahead' ? 'text-blue-600' : 'text-yellow-600'
                      }`}>
                        {currentProject.timeline === 'on_track' ? 'On Track' :
                         currentProject.timeline === 'ahead' ? 'Ahead of Schedule' : 'Delayed'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alignpoint-gray-600">Next Milestone:</span>
                      <span className="font-medium text-alignpoint-black">{currentProject.nextMilestone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-alignpoint-gray-600">Project Duration:</span>
                      <span className="font-medium text-alignpoint-black">{currentProject.startDate} to {currentProject.dueDate}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Overall Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-alignpoint-gray-600">Overall Progress:</span>
                        <span className="text-2xl font-bold text-alignpoint-red">{projectProgress}%</span>
                      </div>
                      <div className="w-full bg-alignpoint-gray-200 rounded-full h-3">
                        <div 
                          className="bg-alignpoint-red h-3 rounded-full transition-all duration-300"
                          style={{ width: `${projectProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Progress Summary */}
                    <div className="flex items-center justify-between">
                      <span className="text-alignpoint-gray-600">Time Remaining:</span>
                      <span className="font-medium text-alignpoint-black">
                        {Math.ceil((new Date(currentProject.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Instructions */}
                <div className="pt-4 border-t border-alignpoint-gray-200">
                  <span className="text-alignpoint-gray-600 font-medium block mb-2">Project Instructions:</span>
                  <div className="p-4 bg-alignpoint-gray-50 rounded-lg max-h-[400px] overflow-y-auto">
                    <div 
                      className="prose prose-sm max-w-none text-alignpoint-black"
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {currentProject.instructions}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

          {/* Milestones and Updates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Milestones Section */}
              <Card className="border-alignpoint-gray-200">
                <CardHeader>
                  <CardTitle className="text-alignpoint-black">Project Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {milestones.filter(m => m.visibleToClient).map((milestone) => (
                    <MilestoneCard key={milestone.id} milestone={milestone} />
                  ))}
                </CardContent>
              </Card>

              {/* Project Updates */}
              <Card className="border-alignpoint-gray-200">
                <CardHeader>
                  <CardTitle className="text-alignpoint-black">Recent Updates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projectUpdates.map((update) => (
                    <UpdateCard key={update.id} update={update} />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Team Contact */}
              <Card className="border-alignpoint-gray-200">
                <CardHeader>
                  <CardTitle className="text-alignpoint-black">Your Team</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-alignpoint-red text-white rounded-full flex items-center justify-center text-sm font-medium">
                        A
                      </div>
                      <div>
                        <div className="font-medium text-alignpoint-black">Alex Admin</div>
                        <div className="text-xs text-alignpoint-gray-500">Project Lead</div>
                      </div>
                    </div>
                    <a 
                      href="mailto:alex.admin@alignpoint.com?subject=RE: Project - MediRemind App Development"
                      className="p-2 text-alignpoint-gray-600 hover:text-alignpoint-red transition-colors rounded-full hover:bg-alignpoint-gray-100"
                      title="Send email to Project Lead"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </a>
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
                    <p className="text-xs text-alignpoint-gray-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 text-alignpoint-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      Click the mail icon to contact your project lead directly
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

              {/* Team Requests */}
              <Card className="border-alignpoint-gray-200">
                <CardHeader>
                  <CardTitle className="text-alignpoint-black">Team Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {currentProject.teamRequests.length > 0 ? (
                    <div className="space-y-4">
                      {currentProject.teamRequests.map((request) => (
                        <div key={request.id} className="p-4 border border-alignpoint-gray-200 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-alignpoint-black">{request.question}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              request.status === 'answered' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-sm text-alignpoint-gray-600 mb-3">
                            Requested by {request.requestedBy} • {request.requestedAt}
                          </div>
                          {request.status === 'pending' ? (
                            <div className="mt-2">
                              <button
                                onClick={() => {
                                  const dialog = document.createElement('dialog');
                                  dialog.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50';
                                  dialog.innerHTML = `
                                    <div class="bg-white rounded-lg shadow-xl p-6 w-[500px] max-w-full">
                                      <h3 class="text-lg font-semibold text-alignpoint-black mb-4">Respond to Request</h3>
                                      <textarea id="responseInput" class="w-full h-32 p-3 border border-alignpoint-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-alignpoint-red" placeholder="Type your response here..."></textarea>
                                      
                                      <div class="mt-4 p-4 border border-dashed border-alignpoint-gray-200 rounded-lg">
                                        <div class="flex items-center justify-center">
                                          <label class="cursor-pointer group">
                                            <div class="flex flex-col items-center gap-2">
                                              <div class="p-2 bg-alignpoint-gray-50 rounded-full group-hover:bg-alignpoint-gray-100 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-alignpoint-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                  <polyline points="17 8 12 3 7 8"/>
                                                  <line x1="12" y1="3" x2="12" y2="15"/>
                                                </svg>
                                              </div>
                                              <div class="text-sm text-alignpoint-gray-600">
                                                <span class="text-alignpoint-red font-medium">Click to upload</span> or drag and drop
                                              </div>
                                              <div class="text-xs text-alignpoint-gray-500">
                                                PNG, JPG, PDF up to 10MB
                                              </div>
                                            </div>
                                            <input type="file" class="hidden" accept=".png,.jpg,.jpeg,.pdf" 
                                              onchange="const file = this.files[0]; if(file) { 
                                                const fileInfo = document.createElement('div');
                                                fileInfo.className = 'flex items-center gap-2 mt-2 p-2 bg-alignpoint-gray-50 rounded-lg';
                                                fileInfo.innerHTML = \`
                                                  <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 text-alignpoint-gray-600' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                                    <path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path>
                                                    <polyline points='13 2 13 9 20 9'></polyline>
                                                  </svg>
                                                  <span class='text-sm text-alignpoint-gray-700'>\${file.name}</span>
                                                  <button onclick='this.parentElement.remove()' class='ml-auto text-alignpoint-gray-500 hover:text-alignpoint-red'>
                                                    <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                                      <line x1='18' y1='6' x2='6' y2='18'></line>
                                                      <line x1='6' y1='6' x2='18' y2='18'></line>
                                                    </svg>
                                                  </button>
                                                \`;
                                                this.closest('.cursor-pointer').appendChild(fileInfo);
                                              }"
                                            />
                                          </label>
                                        </div>
                                      </div>

                                      <div class="flex justify-end space-x-3 mt-4">
                                        <button onclick="this.closest('dialog').close()" class="px-4 py-2 text-sm text-alignpoint-gray-600 hover:text-alignpoint-gray-800">Cancel</button>
                                        <button onclick="this.closest('dialog').querySelector('#responseInput').value && (alert('Response submitted successfully! The team will be notified.'), this.closest('dialog').close())" class="px-4 py-2 text-sm bg-alignpoint-red text-white rounded-lg hover:bg-alignpoint-red/90">Submit Response</button>
                                      </div>
                                    </div>
                                  `;
                                  document.body.appendChild(dialog);
                                  dialog.showModal();
                                  dialog.addEventListener('close', () => dialog.remove());
                                }}
                                className="text-sm text-alignpoint-red hover:text-alignpoint-red/80 font-medium"
                              >
                                Respond to Request
                              </button>
                            </div>
                          ) : (
                            request.response && (
                              <div className="mt-2 p-3 bg-alignpoint-gray-50 rounded-lg">
                                <p className="text-sm text-alignpoint-gray-700">{request.response}</p>
                                <div className="text-xs text-alignpoint-gray-500 mt-1">
                                  Responded on {request.responseAt}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-alignpoint-gray-500 italic">No pending requests from the team.</p>
                  )}
                </CardContent>
              </Card>

              {/* Your Notes */}
              <Card className="border-alignpoint-gray-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-alignpoint-black">Your Notes</CardTitle>
                  <button 
                    onClick={() => {
                      const dialog = document.createElement('dialog');
                      dialog.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50';
                      dialog.innerHTML = `
                        <div class="bg-white rounded-lg shadow-xl p-6 w-[500px] max-w-full">
                          <h3 class="text-lg font-semibold text-alignpoint-black mb-4">Add Project Note</h3>
                          <textarea id="noteInput" class="w-full h-32 p-3 border border-alignpoint-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-alignpoint-red" placeholder="Enter your note here..."></textarea>
                          
                          <div class="mt-4 p-4 border border-dashed border-alignpoint-gray-200 rounded-lg">
                            <div class="flex items-center justify-center">
                              <label class="cursor-pointer group">
                                <div class="flex flex-col items-center gap-2">
                                  <div class="p-2 bg-alignpoint-gray-50 rounded-full group-hover:bg-alignpoint-gray-100 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-alignpoint-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                      <polyline points="17 8 12 3 7 8"/>
                                      <line x1="12" y1="3" x2="12" y2="15"/>
                                    </svg>
                                  </div>
                                  <div class="text-sm text-alignpoint-gray-600">
                                    <span class="text-alignpoint-red font-medium">Click to upload</span> or drag and drop
                                  </div>
                                  <div class="text-xs text-alignpoint-gray-500">
                                    PNG, JPG, PDF, DOC up to 10MB
                                  </div>
                                </div>
                                <input type="file" class="hidden" accept=".png,.jpg,.jpeg,.pdf,.doc,.docx" 
                                  onchange="const file = this.files[0]; if(file) { 
                                    const fileInfo = document.createElement('div');
                                    fileInfo.className = 'flex items-center gap-2 mt-2 p-2 bg-alignpoint-gray-50 rounded-lg';
                                    fileInfo.innerHTML = \`
                                      <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4 text-alignpoint-gray-600' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                        <path d='M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'></path>
                                        <polyline points='13 2 13 9 20 9'></polyline>
                                      </svg>
                                      <span class='text-sm text-alignpoint-gray-700'>\${file.name}</span>
                                      <button onclick='this.parentElement.remove()' class='ml-auto text-alignpoint-gray-500 hover:text-alignpoint-red'>
                                        <svg xmlns='http://www.w3.org/2000/svg' class='w-4 h-4' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                          <line x1='18' y1='6' x2='6' y2='18'></line>
                                          <line x1='6' y1='6' x2='18' y2='18'></line>
                                        </svg>
                                      </button>
                                    \`;
                                    this.closest('.cursor-pointer').appendChild(fileInfo);
                                  }"
                                />
                              </label>
                            </div>
                          </div>

                          <div class="flex justify-end space-x-3 mt-4">
                            <button onclick="this.closest('dialog').close()" class="px-4 py-2 text-sm text-alignpoint-gray-600 hover:text-alignpoint-gray-800">Cancel</button>
                            <button onclick="this.closest('dialog').querySelector('#noteInput').value && (alert('Note and attachments submitted successfully! The team will be notified.'), this.closest('dialog').close())" class="px-4 py-2 text-sm bg-alignpoint-red text-white rounded-lg hover:bg-alignpoint-red/90">Add Note</button>
                          </div>
                        </div>
                      `;
                      document.body.appendChild(dialog);
                      dialog.showModal();
                      dialog.addEventListener('close', () => dialog.remove());
                    }}
                    className="text-xs text-alignpoint-red hover:text-alignpoint-red/80 font-medium"
                  >
                    + Add Note
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="bg-alignpoint-gray-50 rounded-lg p-4">
                    {currentProject.notes ? (
                      <div className="space-y-3">
                        <p className="text-sm text-alignpoint-gray-700">{currentProject.notes}</p>
                        <div className="flex items-center text-xs text-alignpoint-gray-500">
                          <span className="flex-1">Last updated today</span>
                          <span>By {userSession.name}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-alignpoint-gray-500 italic">No notes added yet. Click "Add Note" to provide feedback or updates.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
        )}
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
───────────────────────────────────────────────────────── */

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

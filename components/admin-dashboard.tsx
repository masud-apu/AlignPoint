"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlignpointLogo } from "@/components/alignpoint-logo"
import { SettingsContent } from "@/components/settings-content"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EnhancedProjectsGrid } from "@/components/enhanced-projects-grid"
import { CreateProjectModal } from "@/components/create-project-modal"
import { ProjectDetailPage } from "@/components/project-detail-page"
import { ActivityLogPage } from "@/components/activity-log-page"
import { OverdueTasksPage } from "@/components/overdue-tasks-page"
import { ActiveProjectsList } from "@/components/active-projects-list"
import { AttentionNeededPanel } from "@/components/attention-needed-panel"
import { RecentActivityFeed } from "@/components/recent-activity-feed"

interface UserSession {
  email: string
  name: string
  role: string
  avatar: string
}

interface AdminDashboardProps {
  userSession: UserSession
}

/* ─────────────────────────────────────────────────���───────
   Admin Dashboard - Central Hub for Project Management
───────────────────────────────────────────────────────── */

export default function AdminDashboard({ userSession }: AdminDashboardProps) {
  const [currentView, setCurrentView] = useState<"dashboard" | "projects" | "users" | "activity" | "overdue" | "settings">("dashboard")
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)

  // Demo project data
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Website Redesign",
      status: 75,
      members: ["Alex Admin", "Ben Developer", "Sarah Designer"],
      createdAt: "2024-05-01",
      description: "Complete redesign of the main e-commerce platform with modern UI/UX",
    },
    {
      id: 2,
      title: "Mobile App Development",
      status: 45,
      members: ["Alex Admin", "Ben Developer"],
      createdAt: "2024-05-05",
      description: "Native iOS and Android app for customer engagement",
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      status: 90,
      members: ["Alex Admin", "Lisa Analyst"],
      createdAt: "2024-05-08",
      description: "Business intelligence dashboard for sales and customer insights",
    },
    {
      id: 4,
      title: "Customer Support System",
      status: 25,
      members: ["Sarah Designer", "Mike Support"],
      createdAt: "2024-05-12",
      description: "Internal tool for managing customer support tickets and interactions",
    },
    {
      id: 5,
      title: "Marketing Website",
      status: 0,
      members: ["Lisa Analyst"],
      createdAt: "2024-05-15",
      description: "New marketing website to showcase our services and attract new clients",
    },
  ])

  // Handlers for view changes
  const handleViewProject = (project: any) => {
    setSelectedProject(project)
  }

  const handleCreateNewProject = () => {
    setShowCreateProject(true)
  }

  const handleSaveNewProject = (newProject: any) => {
    setProjects([newProject, ...projects])
    setShowCreateProject(false)
  }

  const handleBackToDashboard = () => {
    setSelectedProject(null)
  }

  const handleViewActivity = () => {
    setCurrentView("activity")
  }

  const handleViewOverdue = () => {
    setCurrentView("overdue")
  }

  // Calculate summary statistics
  const totalProjects = projects.length
  const activeProjects = projects.filter(p => p.status > 0 && p.status < 100).length
  const overdueTasksCount = 3 // Mock data
  const teamMembersCount = 12 // Mock data

  // Render different views based on state
  if (selectedProject) {
    return <ProjectDetailPage project={selectedProject} onBack={handleBackToDashboard} />
  }

  return (
    <div className="min-h-screen bg-alignpoint-gray-50">
      <Header
        currentView={currentView}
        onViewChange={(view) => setCurrentView(view as "dashboard" | "projects" | "users" | "activity" | "overdue" | "settings")}
        userSession={userSession}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentView === "settings" && (
          <SettingsContent />
        )}
        
        {currentView === "dashboard" && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <SummaryCard
                title="Total Projects"
                value={totalProjects.toString()}
                icon="📊"
                color="bg-blue-500"
              />
              <SummaryCard
                title="Active Projects"
                value={activeProjects.toString()}
                icon="🚀"
                color="bg-green-500"
              />
              <SummaryCard
                title="Tasks Overdue"
                value={overdueTasksCount.toString()}
                icon="⚠️"
                color="bg-red-500"
              />
              <SummaryCard
                title="Team Members"
                value={teamMembersCount.toString()}
                icon="👥"
                color="bg-purple-500"
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-alignpoint-black">Dashboard</h1>
              <Button onClick={handleCreateNewProject} className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Project
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-6">
                <ActiveProjectsList onSelectProject={handleViewProject} />
              </div>
              <div className="space-y-6">
                <AttentionNeededPanel onViewOverdue={handleViewOverdue} />
                <RecentActivityFeed onViewActivity={handleViewActivity} />
              </div>
            </div>
          </>
        )}

        {currentView === "projects" && (
          <EnhancedProjectsGrid projects={projects} onSelect={handleViewProject} onCreateNew={handleCreateNewProject} />
        )}

        {currentView === "users" && <UsersManagementContent />}

        {currentView === "activity" && <ActivityManagementContent />}

        {currentView === "overdue" && <OverdueTasksContent />}
      </main>

      {showCreateProject && (
        <CreateProjectModal onClose={() => setShowCreateProject(false)} onSave={handleSaveNewProject} />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Summary Cards Component
───────────────────────────────────────────────────────── */

interface SummaryCardProps {
  title: string
  value: string
  icon: string
  color: string
}

function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  return (
    <Card className="border-alignpoint-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-alignpoint-gray-600">{title}</p>
            <p className="text-3xl font-bold text-alignpoint-black mt-2">{value}</p>
          </div>
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-white text-xl`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────
   Header - Navigation and User Info
───────────────────────────────────────────────────────── */

function Header({
  currentView,
  onViewChange,
  userSession
}: {
  currentView: "dashboard" | "projects" | "users" | "activity" | "overdue" | "settings"
  onViewChange: (view: "dashboard" | "projects" | "users" | "activity" | "overdue" | "settings") => void
  userSession: UserSession
}) {
  const handleLogout = () => {
    // Reset to login page
    window.location.reload()
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-alignpoint-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => onViewChange("dashboard")} 
          className="hover:opacity-80 transition-opacity"
        >
          <AlignpointLogo size="md" showText={true} />
        </button>

        {/* Global Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Input
              type="text"
              placeholder="Search projects, tasks, or team members..."
              className="pl-10 border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-alignpoint-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Button
            variant="ghost"
            onClick={() => onViewChange("dashboard")}
            className={`font-medium transition-colors ${
              currentView === "dashboard"
                ? "text-alignpoint-red hover:bg-alignpoint-red hover:text-white"
                : "text-alignpoint-gray-600 hover:bg-alignpoint-red hover:text-white"
            }`}
          >
            Dashboard
          </Button>
          <Button
            variant="ghost"
            onClick={() => onViewChange("projects")}
            className={`font-medium transition-colors ${
              currentView === "projects"
                ? "text-alignpoint-red hover:bg-alignpoint-red hover:text-white"
                : "text-alignpoint-gray-600 hover:bg-alignpoint-red hover:text-white"
            }`}
          >
            Projects
          </Button>
          <Button
            variant="ghost"
            onClick={() => onViewChange("users")}
            className={`font-medium transition-colors ${
              currentView === "users"
                ? "text-alignpoint-red hover:bg-alignpoint-red hover:text-white"
                : "text-alignpoint-gray-600 hover:bg-alignpoint-red hover:text-white"
            }`}
          >
            Users
          </Button>
          <Button
            variant="ghost"
            onClick={() => onViewChange("activity")}
            className={`font-medium transition-colors ${
              currentView === "activity"
                ? "text-alignpoint-red hover:bg-alignpoint-red hover:text-white"
                : "text-alignpoint-gray-600 hover:bg-alignpoint-red hover:text-white"
            }`}
          >
            Activity
          </Button>
          <Button
            variant="ghost"
            onClick={() => onViewChange("overdue")}
            className={`font-medium transition-colors ${
              currentView === "overdue"
                ? "text-alignpoint-red hover:bg-alignpoint-red hover:text-white"
                : "text-alignpoint-gray-600 hover:bg-alignpoint-red hover:text-white"
            }`}
          >
            Overdue Tasks
          </Button>
        </nav>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="fixed-width-button flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-alignpoint-gray-50 transition-colors">
                <div className="w-8 h-8 bg-alignpoint-red text-white rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{userSession.avatar}</span>
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-medium text-alignpoint-black">{userSession.name}</div>
                  <div className="text-xs text-alignpoint-gray-500 capitalize">{userSession.role.replace('_', ' ')}</div>
                </div>
                <svg className="w-4 h-4 text-alignpoint-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" sideOffset={5} align="end">
              <DropdownMenuItem onClick={() => onViewChange("settings")} className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-alignpoint-red hover:bg-alignpoint-red/5 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────
   Users Management Content
───────────────────────────────────────────────────────── */

function UsersManagementContent() {
  const users = [
    { id: 1, name: "Alex Admin", role: "Administrator", email: "alex@alignpoint.com", status: "Active" },
    { id: 2, name: "Priya Manager", role: "Project Manager", email: "priya@alignpoint.com", status: "Active" },
    { id: 3, name: "Ben Developer", role: "Developer", email: "ben@alignpoint.com", status: "Active" },
    { id: 4, name: "Sarah Designer", role: "Designer", email: "sarah@alignpoint.com", status: "Active" },
    { id: 5, name: "Tanya Tester", role: "Tester", email: "tanya@alignpoint.com", status: "Active" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-alignpoint-black">User Management</h2>
        <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </Button>
      </div>

      <Card className="border-alignpoint-gray-200">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-alignpoint-gray-50 border-b border-alignpoint-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-alignpoint-gray-700">Name</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-alignpoint-gray-700">Role</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-alignpoint-gray-700">Email</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-alignpoint-gray-700">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-semibold text-alignpoint-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-alignpoint-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-alignpoint-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-alignpoint-red text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-alignpoint-black">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-alignpoint-gray-700">{user.role}</td>
                    <td className="py-4 px-6 text-alignpoint-gray-700">{user.email}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-alignpoint-gray-600 hover:text-alignpoint-black">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-alignpoint-red hover:text-alignpoint-red/80">
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Activity Management Content
───────────────────────────────────────────────────────── */

function ActivityManagementContent() {
  const activities = [
    {
      id: 1,
      type: "task_completed",
      icon: "✅",
      message: "Ben Developer completed task 'Set up project structure' in E-commerce Website Redesign",
      timestamp: "2 hours ago",
      user: "Ben Developer",
      project: "E-commerce Website Redesign",
      priority: "normal",
    },
    {
      id: 2,
      type: "task_created",
      icon: "📝",
      message: "Alex Admin created new task 'Implement payment gateway' in Mobile App Development",
      timestamp: "4 hours ago",
      user: "Alex Admin",
      project: "Mobile App Development",
      priority: "high",
    },
    {
      id: 3,
      type: "comment_added",
      icon: "💬",
      message: "Sarah Designer commented on 'Design user authentication flow'",
      timestamp: "6 hours ago",
      user: "Sarah Designer",
      project: "E-commerce Website Redesign",
      priority: "normal",
    },
    {
      id: 4,
      type: "project_created",
      icon: "🚀",
      message: "Alex Admin created new project 'Customer Support System'",
      timestamp: "1 day ago",
      user: "Alex Admin",
      project: "Customer Support System",
      priority: "high",
    },
    {
      id: 5,
      type: "file_uploaded",
      icon: "📎",
      message: "Priya Manager uploaded 'Requirements Document v2.pdf' to Data Analytics Dashboard",
      timestamp: "1 day ago",
      user: "Priya Manager",
      project: "Data Analytics Dashboard",
      priority: "normal",
    },
    {
      id: 6,
      type: "user_added",
      icon: "👤",
      message: "Alex Admin added Tanya Tester to Mobile App Development project",
      timestamp: "2 days ago",
      user: "Alex Admin",
      project: "Mobile App Development",
      priority: "normal",
    },
  ]

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "task_completed": return "bg-green-100 text-green-800"
      case "task_created": return "bg-blue-100 text-blue-800"
      case "comment_added": return "bg-purple-100 text-purple-800"
      case "project_created": return "bg-orange-100 text-orange-800"
      case "file_uploaded": return "bg-cyan-100 text-cyan-800"
      case "user_added": return "bg-pink-100 text-pink-800"
      default: return "bg-alignpoint-gray-100 text-alignpoint-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-alignpoint-black">All Activity</h2>
        <div className="flex items-center space-x-3">
          <select className="px-3 py-2 border border-alignpoint-gray-300 rounded-md text-sm focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none">
            <option value="all">All Activities</option>
            <option value="task_completed">Tasks Completed</option>
            <option value="task_created">Tasks Created</option>
            <option value="comment_added">Comments</option>
            <option value="project_created">Projects Created</option>
            <option value="file_uploaded">Files Uploaded</option>
          </select>
          <select className="px-3 py-2 border border-alignpoint-gray-300 rounded-md text-sm focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      <Card className="border-alignpoint-gray-200">
        <CardContent className="p-0">
          <div className="divide-y divide-alignpoint-gray-200">
            {activities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-alignpoint-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityTypeColor(activity.type)}`}>
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-alignpoint-black font-medium">{activity.message}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-alignpoint-gray-500">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span>{activity.project}</span>
                      <span>•</span>
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                  {activity.priority === "high" && (
                    <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      High Priority
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Overdue Tasks Content
────────────────────────────────────────────────────���──── */

function OverdueTasksContent() {
  const overdueTasks = [
    {
      id: 1,
      title: "Complete API documentation",
      description: "Finish writing comprehensive API documentation for all endpoints",
      project: "Mobile App Development",
      assignee: "Ben Developer",
      dueDate: "2024-05-10",
      daysOverdue: 8,
      priority: "critical",
      phase: "Phase 3: Development",
    },
    {
      id: 2,
      title: "User acceptance testing",
      description: "Conduct thorough user acceptance testing for the new features",
      project: "E-commerce Website Redesign",
      assignee: "Tanya Tester",
      dueDate: "2024-05-12",
      daysOverdue: 6,
      priority: "high",
      phase: "Phase 4: Testing & Launch",
    },
    {
      id: 3,
      title: "Design final mockups",
      description: "Create final design mockups for the dashboard screens",
      project: "Data Analytics Dashboard",
      assignee: "Sarah Designer",
      dueDate: "2024-05-14",
      daysOverdue: 4,
      priority: "medium",
      phase: "Phase 2: Design & Architecture",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800 border-red-200"
      case "high": return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-alignpoint-gray-100 text-alignpoint-gray-800"
    }
  }

  const getOverdueColor = (days: number) => {
    if (days >= 7) return "text-red-600 font-bold"
    if (days >= 3) return "text-orange-600 font-semibold"
    return "text-yellow-600 font-medium"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-alignpoint-black">Overdue Tasks</h2>
          <p className="text-alignpoint-gray-600 mt-1">{overdueTasks.length} tasks are past their due date</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="px-3 py-2 border border-alignpoint-gray-300 rounded-md text-sm focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none">
            <option value="all">All Projects</option>
            <option value="mobile">Mobile App Development</option>
            <option value="ecommerce">E-commerce Website Redesign</option>
            <option value="analytics">Data Analytics Dashboard</option>
          </select>
          <select className="px-3 py-2 border border-alignpoint-gray-300 rounded-md text-sm focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none">
            <option value="priority">Sort by Priority</option>
            <option value="overdue">Sort by Days Overdue</option>
            <option value="assignee">Sort by Assignee</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {overdueTasks.map((task) => (
          <Card key={task.id} className="border-alignpoint-gray-200 border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-alignpoint-black">{task.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-alignpoint-gray-700 mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-alignpoint-gray-600">
                    <span>📁 {task.project}</span>
                    <span>🎯 {task.phase}</span>
                    <span>👤 {task.assignee}</span>
                    <span>📅 Due: {task.dueDate}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${getOverdueColor(task.daysOverdue)}`}>
                    {task.daysOverdue} day{task.daysOverdue !== 1 ? 's' : ''} overdue
                  </div>
                  <div className="mt-3 space-x-2">
                    <Button variant="outline" size="sm" className="border-alignpoint-gray-300">
                      View Task
                    </Button>
                    <Button size="sm" className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                      Send Reminder
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {overdueTasks.length === 0 && (
        <Card className="border-alignpoint-gray-200">
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-alignpoint-black mb-2">No Overdue Tasks!</h3>
            <p className="text-alignpoint-gray-600">All tasks are on track or completed.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Comprehensive Settings Modal
───────────────────────────────────────────────────────── */

function SettingsModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<string>("personal")
  useEffect(() => {
    // Ensure the first tab is selected by default
    setActiveTab("personal")
  }, [])
  const [settings, setSettings] = useState({
    // Personal Settings
    firstName: "Alex",
    lastName: "Admin",
    email: "alex@alignpoint.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "System Administrator",
    department: "IT Operations",
    bio: "Experienced project manager with 10+ years in team leadership and system administration.",
    avatar: "",

    // General Settings
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    darkMode: false,
    autoSave: true,

    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    dailyDigest: false,
    taskReminders: true,
    projectUpdates: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAlerts: true,

    // Time Tracking Settings
    timeTracking: true,
    automaticTracking: false,
    reminderInterval: 15,
    roundingInterval: 15,

    // System Settings
    dataRetention: 365,
    backupFrequency: "daily",
    logLevel: "info",
    maintenanceMode: false,
  })

  const tabs = [
    { id: "personal", label: "Personal", icon: "👤" },
    { id: "general", label: "General", icon: "⚙️" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "timetracking", label: "Time Tracking", icon: "⏱️" },
    { id: "system", label: "System", icon: "🖥️" },
    { id: "info", label: "System Info", icon: "ℹ️" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-alignpoint-black">Settings</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>
        </CardHeader>
        <div className="flex">
          {/* Settings Sidebar */}
          <div className="w-64 border-r border-alignpoint-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-alignpoint-red/10 text-alignpoint-red border border-alignpoint-red/20"
                      : "text-alignpoint-gray-600 hover:bg-alignpoint-gray-50 hover:text-alignpoint-black"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-6 overflow-y-auto max-h-[70vh]">
            {activeTab === "personal" && <PersonalSettings settings={settings} setSettings={setSettings} />}
            {activeTab === "general" && <GeneralSettings settings={settings} setSettings={setSettings} />}
            {activeTab === "notifications" && <NotificationSettings settings={settings} setSettings={setSettings} />}
            {activeTab === "security" && <SecuritySettings settings={settings} setSettings={setSettings} />}
            {activeTab === "timetracking" && <TimeTrackingSettings settings={settings} setSettings={setSettings} />}
            {activeTab === "system" && <SystemSettings settings={settings} setSettings={setSettings} />}
            {activeTab === "info" && <SystemInformation />}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-alignpoint-gray-200 p-6">
          <div className="flex items-center justify-end space-x-3">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
              Save All Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

/* ───────────────────��─────────────────────────────────────
   Personal Settings Component
───────────────────────────────────────────────────────── */

function PersonalSettings({ settings, setSettings }: { settings: any, setSettings: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Profile Information</h3>

        {/* Avatar Section */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-alignpoint-red text-white rounded-full flex items-center justify-center text-2xl font-bold">
            {settings.firstName[0]}{settings.lastName[0]}
          </div>
          <div>
            <Button variant="outline" size="sm" className="border-alignpoint-gray-300 mr-2">
              Upload Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-alignpoint-gray-600">
              Remove
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input
              value={settings.firstName}
              onChange={(e) => setSettings({ ...settings, firstName: e.target.value })}
              placeholder="Enter first name"
            />
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input
              value={settings.lastName}
              onChange={(e) => setSettings({ ...settings, lastName: e.target.value })}
              placeholder="Enter last name"
            />
          </div>

          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              placeholder="Enter email address"
            />
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input
              value={settings.jobTitle}
              onChange={(e) => setSettings({ ...settings, jobTitle: e.target.value })}
              placeholder="Enter job title"
            />
          </div>

          <div className="space-y-2">
            <Label>Department</Label>
            <Input
              value={settings.department}
              onChange={(e) => setSettings({ ...settings, department: e.target.value })}
              placeholder="Enter department"
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label>Bio</Label>
          <textarea
            value={settings.bio}
            onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            rows={4}
            className="w-full p-3 border border-alignpoint-gray-300 rounded-md resize-none focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Contact Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Show email in profile</span>
              <p className="text-sm text-alignpoint-gray-500">Make your email visible to team members</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={true}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Show phone in profile</span>
              <p className="text-sm text-alignpoint-gray-500">Make your phone number visible to team members</p>
            </div>
            <input
              type="checkbox"
              defaultChecked={false}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────��──────────────────────
   General Settings Component
───────────────────────────────────────────────────────── */

function GeneralSettings({ settings, setSettings }: { settings: any, setSettings: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">General Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Language</Label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Timezone</Label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
              <option value="GMT">GMT</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Date Format</Label>
            <select
              value={settings.dateFormat}
              onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
              className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Application Behavior</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-alignpoint-gray-700">Dark mode</span>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-alignpoint-gray-700">Auto-save changes</span>
            <input
              type="checkbox"
              checked={settings.autoSave}
              onChange={(e) => setSettings({ ...settings, autoSave: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Notification Settings Component
───────���───────────────────────────────────────────────── */

function NotificationSettings({ settings, setSettings }: { settings: any, setSettings: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Push notifications</span>
              <p className="text-sm text-alignpoint-gray-500">Receive browser push notifications</p>
            </div>
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Email notifications</span>
              <p className="text-sm text-alignpoint-gray-500">Receive email notifications for important updates</p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Daily digest</span>
              <p className="text-sm text-alignpoint-gray-500">Receive a daily summary of activities</p>
            </div>
            <input
              type="checkbox"
              checked={settings.dailyDigest}
              onChange={(e) => setSettings({ ...settings, dailyDigest: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Task reminders</span>
              <p className="text-sm text-alignpoint-gray-500">Get reminded about upcoming due dates</p>
            </div>
            <input
              type="checkbox"
              checked={settings.taskReminders}
              onChange={(e) => setSettings({ ...settings, taskReminders: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Project updates</span>
              <p className="text-sm text-alignpoint-gray-500">Notifications for project milestones and changes</p>
            </div>
            <input
              type="checkbox"
              checked={settings.projectUpdates}
              onChange={(e) => setSettings({ ...settings, projectUpdates: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Security Settings Component
───────────────────────────────────────────────────────── */

function SecuritySettings({ settings, setSettings }: { settings: any, setSettings: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Security Configuration</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Two-factor authentication</span>
              <p className="text-sm text-alignpoint-gray-500">Add extra security to your account</p>
            </div>
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Login alerts</span>
              <p className="text-sm text-alignpoint-gray-500">Get notified of new logins to your account</p>
            </div>
            <input
              type="checkbox"
              checked={settings.loginAlerts}
              onChange={(e) => setSettings({ ...settings, loginAlerts: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Session timeout (minutes)</Label>
          <Input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) })}
            min="5"
            max="480"
          />
        </div>

        <div className="space-y-2">
          <Label>Password expiry (days)</Label>
          <Input
            type="number"
            value={settings.passwordExpiry}
            onChange={(e) => setSettings({ ...settings, passwordExpiry: parseInt(e.target.value) })}
            min="30"
            max="365"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-yellow-800 mb-2">Security Actions</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
            Change Password
          </Button>
          <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50 ml-2">
            Review Active Sessions
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Time Tracking Settings Component
───────────────────────────────────────────────────────── */

function TimeTrackingSettings({ settings, setSettings }: { settings: any, setSettings: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Time Tracking Configuration</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Enable time tracking</span>
              <p className="text-sm text-alignpoint-gray-500">Allow users to track time on tasks</p>
            </div>
            <input
              type="checkbox"
              checked={settings.timeTracking}
              onChange={(e) => setSettings({ ...settings, timeTracking: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>

          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Automatic tracking</span>
              <p className="text-sm text-alignpoint-gray-500">Automatically track time based on activity</p>
            </div>
            <input
              type="checkbox"
              checked={settings.automaticTracking}
              onChange={(e) => setSettings({ ...settings, automaticTracking: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Reminder interval (minutes)</Label>
          <select
            value={settings.reminderInterval}
            onChange={(e) => setSettings({ ...settings, reminderInterval: parseInt(e.target.value) })}
            className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
          >
            <option value={5}>5 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={60}>1 hour</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label>Time rounding (minutes)</Label>
          <select
            value={settings.roundingInterval}
            onChange={(e) => setSettings({ ...settings, roundingInterval: parseInt(e.target.value) })}
            className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
          >
            <option value={1}>No rounding</option>
            <option value={5}>5 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
          </select>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────────────────────��─────────────
   System Settings Component
───────────────────────────────────────────────────────── */

function SystemSettings({ settings, setSettings }: { settings: any, setSettings: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">System Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Data retention (days)</Label>
            <Input
              type="number"
              value={settings.dataRetention}
              onChange={(e) => setSettings({ ...settings, dataRetention: parseInt(e.target.value) })}
              min="30"
              max="3650"
            />
          </div>

          <div className="space-y-2">
            <Label>Backup frequency</Label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value })}
              className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Log level</Label>
            <select
              value={settings.logLevel}
              onChange={(e) => setSettings({ ...settings, logLevel: e.target.value })}
              className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="error">Error only</option>
              <option value="warn">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Maintenance</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <span className="text-alignpoint-gray-700 font-medium">Maintenance mode</span>
              <p className="text-sm text-alignpoint-gray-500">Temporarily disable access for maintenance</p>
            </div>
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">System Actions</h4>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              Clear Cache
            </Button>
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50 ml-2">
              Export Data
            </Button>
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50 ml-2">
              Run Backup
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   System Information Component
───────────────────────────────────────────────────────── */

function SystemInformation() {
  const systemInfo = {
    version: "2.1.3",
    buildDate: "2024-05-18",
    environment: "Production",
    database: "PostgreSQL 14.2",
    serverUptime: "15 days, 7 hours",
    totalUsers: 1247,
    totalProjects: 89,
    totalTasks: 2456,
    storageUsed: "4.2 GB",
    storageLimit: "100 GB",
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">System Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Version:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Build Date:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.buildDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Environment:</span>
              <span className="font-medium text-green-600">{systemInfo.environment}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Database:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.database}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Server Uptime:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.serverUptime}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Total Users:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.totalUsers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Total Projects:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.totalProjects}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Total Tasks:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.totalTasks.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Storage Used:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.storageUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Storage Limit:</span>
              <span className="font-medium text-alignpoint-black">{systemInfo.storageLimit}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Storage Usage</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-alignpoint-gray-600">Used: {systemInfo.storageUsed}</span>
            <span className="text-alignpoint-gray-600">Available: 95.8 GB</span>
          </div>
          <div className="w-full bg-alignpoint-gray-200 rounded-full h-3">
            <div className="bg-alignpoint-red h-3 rounded-full" style={{ width: '4.2%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Support Information</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <p>For technical support, contact: support@alignpoint.com</p>
          <p>System Status: <span className="text-green-600 font-medium">All systems operational</span></p>
          <p>Last Backup: May 18, 2024 at 3:00 AM UTC</p>
        </div>
      </div>
    </div>
  )
}

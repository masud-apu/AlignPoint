"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlignpointLogo } from "@/components/alignpoint-logo"

interface Task {
  id: number
  title: string
  project: string
  dueDate: string
  priority: "low" | "medium" | "high" | "critical"
  status: "todo" | "in_progress" | "in_review" | "done"
  timeLogged?: number
}

interface Project {
  id: number
  title: string
  role: string
  progress: number
}

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState<"tasks" | "projects" | "time">("tasks")

  const myTasks: Task[] = [
    {
      id: 1,
      title: "Implement user authentication",
      project: "E-commerce Platform",
      dueDate: "2024-08-15",
      priority: "high",
      status: "in_progress",
      timeLogged: 12.5
    },
    {
      id: 2,
      title: "Design system implementation",
      project: "AlignPoint",
      dueDate: "2024-08-20",
      priority: "medium",
      status: "todo",
      timeLogged: 0
    }
  ]

  const myProjects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      role: "Frontend Developer",
      progress: 65
    },
    {
      id: 2,
      title: "AlignPoint",
      role: "Lead Designer",
      progress: 40
    }
  ]

  return (
    <div className="min-h-screen bg-alignpoint-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-alignpoint-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <AlignpointLogo size="md" showText={true} />
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Notifications
            </Button>
            <Button variant="ghost" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <QuickStatCard 
            title="Active Tasks" 
            value={myTasks.filter(t => t.status !== "done").length.toString()}
          />
          <QuickStatCard 
            title="Projects" 
            value={myProjects.length.toString()}
          />
          <QuickStatCard 
            title="Hours This Week" 
            value="32.5"
          />
          <QuickStatCard 
            title="Completion Rate" 
            value="94%"
          />
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-alignpoint-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "tasks", label: "My Tasks", icon: "📋" },
              { id: "projects", label: "My Projects", icon: "📁" },
              { id: "time", label: "Time Tracking", icon: "⏱️" },
            ].map((tab) => (
              <TabButton 
                key={tab.id}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "tasks" && <TasksList tasks={myTasks} />}
          {activeTab === "projects" && <ProjectsList projects={myProjects} />}
          {activeTab === "time" && <TimeTrackingView />}
        </div>
      </main>
    </div>
  )
}

function QuickStatCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="border-alignpoint-gray-200">
      <CardContent className="p-6">
        <div className="text-3xl font-bold text-alignpoint-red mb-2">{value}</div>
        <div className="text-sm text-alignpoint-gray-600">{title}</div>
      </CardContent>
    </Card>
  )
}

function TabButton({ 
  isActive, 
  onClick, 
  icon, 
  label 
}: { 
  isActive: boolean
  onClick: () => void
  icon: string
  label: string 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
        isActive
          ? "border-alignpoint-red text-alignpoint-red"
          : "border-transparent text-alignpoint-gray-500 hover:text-alignpoint-gray-700 hover:border-alignpoint-gray-300"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-alignpoint-black">My Tasks</h2>
        <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
          Log Time
        </Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="border-alignpoint-gray-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-alignpoint-black mb-1">{task.title}</h3>
            <p className="text-sm text-alignpoint-gray-600 mb-2">{task.project}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-alignpoint-gray-500">Due: {task.dueDate}</span>
              {task.timeLogged && (
                <span className="text-alignpoint-gray-500">
                  Time: {task.timeLogged}h
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <StatusBadge status={task.status} />
            <PriorityBadge priority={task.priority} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: Task["status"] }) {
  const colors = {
    todo: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    in_review: "bg-purple-100 text-purple-800",
    done: "bg-green-100 text-green-800"
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  )
}

function PriorityBadge({ priority }: { priority: Task["priority"] }) {
  const colors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    critical: "bg-red-100 text-red-800"
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[priority]}`}>
      {priority.toUpperCase()}
    </span>
  )
}

function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-alignpoint-black">My Projects</h2>
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="border-alignpoint-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-medium text-alignpoint-black">{project.title}</h3>
            <p className="text-sm text-alignpoint-gray-600">{project.role}</p>
          </div>
          <Button variant="outline" size="sm">View Details</Button>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-alignpoint-gray-600">Progress</span>
            <span className="font-medium text-alignpoint-black">{project.progress}%</span>
          </div>
          <div className="h-2 bg-alignpoint-gray-200 rounded-full">
            <div 
              className="h-full bg-alignpoint-red rounded-full" 
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TimeTrackingView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-alignpoint-black">Time Tracking</h2>
        <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
          Start Timer
        </Button>
      </div>

      <Card className="border-alignpoint-gray-200">
        <CardHeader>
          <CardTitle>Weekly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-alignpoint-gray-500">
            Time tracking visualization will go here
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

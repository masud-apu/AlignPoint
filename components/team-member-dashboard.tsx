"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlignpointLogo } from "@/components/alignpoint-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserSession {
  email: string
  name: string
  role: string
  avatar: string
}

interface TeamMemberDashboardProps {
  userSession: UserSession
}

interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "in_progress" | "in_review" | "done"
  project: string
  phase: string
  assignee: string
  priority: "low" | "medium" | "high" | "critical"
  dueDate: string
  subtasks: Array<{
    id: number
    text: string
    completed: boolean
  }>
  timeLogged?: number
}

export default function TeamMemberDashboard({ userSession }: TeamMemberDashboardProps) {
  const [currentView, setCurrentView] = useState<"dashboard" | "projects" | "settings">("dashboard")

  return (
    <div className="min-h-screen bg-alignpoint-gray-50">
      <Header userSession={userSession} />
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} userRole={userSession.role} />
        <main className="flex-1 p-6 space-y-6">
          {currentView === "dashboard" && <MyTasksView userSession={userSession} />}
          {currentView === "projects" && <MyProjectsView userSession={userSession} />}
          {currentView === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Header Component
───────────��───────────────────────────────────────────── */

function Header({ userSession }: { userSession: UserSession }) {
  const handleLogout = () => {
    window.location.reload()
  }

  return (
    <header className="bg-white border-b border-alignpoint-gray-200 px-6 py-4 flex items-center justify-between">
      <AlignpointLogo size="md" showText={true} />
      
      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search tasks..."
          className="w-60 border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
        />
        
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative hover:bg-alignpoint-gray-50">
          <svg className="h-5 w-5 text-alignpoint-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-4.5-4.5a7 7 0 11-7 0L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 h-2 w-2 bg-alignpoint-red rounded-full"></span>
        </Button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-alignpoint-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-alignpoint-red text-white flex items-center justify-center font-medium text-sm">
                {userSession.avatar}
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
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Account Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-alignpoint-red hover:bg-alignpoint-red/5">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────
   Sidebar Navigation
───────────────────────────────────────────────────────── */

function Sidebar({
  currentView,
  onViewChange,
  userRole,
}: {
  currentView: string
  onViewChange: (v: any) => void
  userRole: string
}) {
  const items = [
    { id: "dashboard", icon: "📋", label: "My Tasks" },
    { id: "projects", icon: "📁", label: "My Projects" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ]

  return (
    <aside className="w-64 bg-white border-r border-alignpoint-gray-200">
      <nav className="p-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
              currentView === item.id
                ? "bg-alignpoint-red/10 text-alignpoint-red border border-alignpoint-red/20"
                : "text-alignpoint-gray-600 hover:bg-alignpoint-gray-50 hover:text-alignpoint-black"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

/* ─────────────────────────────────────────────────────────
   My Tasks View - Primary Focus Area
───────────────────────────────────────────────────────── */

function MyTasksView({ userSession }: { userSession: UserSession }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Implement User Authentication",
      description: "Build login/logout functionality with proper session management",
      status: "in_progress",
      project: "E-commerce Website Redesign",
      phase: "Phase 1: Foundation",
      assignee: userSession.name,
      priority: "high",
      dueDate: "2024-05-20",
      subtasks: [
        { id: 1, text: "Design login form UI", completed: true },
        { id: 2, text: "Implement password validation", completed: true },
        { id: 3, text: "Add session management", completed: false },
        { id: 4, text: "Write unit tests", completed: false },
      ],
      timeLogged: 6.5,
    },
    {
      id: 2,
      title: "Design Product Catalog Layout",
      description: "Create responsive product grid with filtering capabilities",
      status: "todo",
      project: "E-commerce Website Redesign",
      phase: "Phase 2: Core Features",
      assignee: userSession.name,
      priority: "medium",
      dueDate: "2024-05-25",
      subtasks: [
        { id: 1, text: "Research competitor layouts", completed: false },
        { id: 2, text: "Create wireframes", completed: false },
      ],
    },
    {
      id: 3,
      title: "Database Schema Review",
      description: "Review and approve the database design for user management",
      status: "in_review",
      project: "Customer Support System",
      phase: "Phase 1: Planning",
      assignee: userSession.name,
      priority: "critical",
      dueDate: "2024-05-18",
      subtasks: [
        { id: 1, text: "Review entity relationships", completed: true },
        { id: 2, text: "Check data constraints", completed: true },
        { id: 3, text: "Validate performance indexes", completed: true },
      ],
      timeLogged: 3.0,
    },
  ])

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const updateTaskStatus = (taskId: number, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const toggleSubtask = (taskId: number, subtaskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? {
            ...task,
            subtasks: task.subtasks.map(subtask =>
              subtask.id === subtaskId 
                ? { ...subtask, completed: !subtask.completed }
                : subtask
            )
          }
        : task
    ))
  }

  // Group tasks by status
  const tasksByStatus = {
    todo: tasks.filter(t => t.status === "todo"),
    in_progress: tasks.filter(t => t.status === "in_progress"),
    in_review: tasks.filter(t => t.status === "in_review"),
    done: tasks.filter(t => t.status === "done"),
  }

  const openTasks = tasks.filter(t => t.status !== "done")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-alignpoint-black">My Open Tasks</h1>
        <div className="text-sm text-alignpoint-gray-600">
          {openTasks.length} open task{openTasks.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Task Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <TaskStatusCard title="To Do" count={tasksByStatus.todo.length} color="bg-blue-500" />
        <TaskStatusCard title="In Progress" count={tasksByStatus.in_progress.length} color="bg-yellow-500" />
        <TaskStatusCard title="In Review" count={tasksByStatus.in_review.length} color="bg-purple-500" />
        <TaskStatusCard title="Done" count={tasksByStatus.done.length} color="bg-green-500" />
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {openTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onSelect={() => setSelectedTask(task)}
            onStatusChange={updateTaskStatus}
            userRole={userSession.role}
          />
        ))}
        
        {openTasks.length === 0 && (
          <Card className="border-alignpoint-gray-200">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold text-alignpoint-black mb-2">All caught up!</h3>
              <p className="text-alignpoint-gray-600">You have no open tasks at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)}
          onStatusChange={updateTaskStatus}
          onSubtaskToggle={toggleSubtask}
          userRole={userSession.role}
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Task Status Card
───────────────────────────���───────────────────────────── */

function TaskStatusCard({ title, count, color }: { title: string; count: number; color: string }) {
  return (
    <Card className="border-alignpoint-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-alignpoint-gray-600">{title}</p>
            <p className="text-2xl font-bold text-alignpoint-black">{count}</p>
          </div>
          <div className={`w-8 h-8 rounded-lg ${color} opacity-80`}></div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────
   Task Card Component
───────────────────────────────────────────────────────── */

function TaskCard({ 
  task, 
  onSelect, 
  onStatusChange,
  userRole 
}: { 
  task: Task
  onSelect: () => void
  onStatusChange: (taskId: number, status: Task["status"]) => void
  userRole: string
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo": return "bg-blue-100 text-blue-800 border-blue-200"
      case "in_progress": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "in_review": return "bg-purple-100 text-purple-800 border-purple-200"
      case "done": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-alignpoint-gray-100 text-alignpoint-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-100 text-red-800 border-red-200"
      case "high": return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-blue-100 text-blue-800 border-blue-200"
      default: return "bg-alignpoint-gray-100 text-alignpoint-gray-800"
    }
  }

  const completedSubtasks = task.subtasks.filter(st => st.completed).length
  const totalSubtasks = task.subtasks.length
  const progressPercentage = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0

  return (
    <Card className="border-alignpoint-gray-200 hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1" onClick={onSelect}>
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-alignpoint-black">{task.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-alignpoint-gray-600 mb-3">{task.description}</p>
            <div className="flex items-center space-x-4 text-sm text-alignpoint-gray-500">
              <span>📁 {task.project}</span>
              <span>🎯 {task.phase}</span>
              <span>📅 Due {task.dueDate}</span>
              {task.timeLogged && <span>⏱️ {task.timeLogged}h logged</span>}
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(task.status)}`}>
              {task.status.replace('_', ' ').toUpperCase()}
            </span>
            <TaskStatusSelector 
              currentStatus={task.status}
              onStatusChange={(newStatus) => onStatusChange(task.id, newStatus)}
              userRole={userRole}
            />
          </div>
        </div>

        {/* Subtask Progress */}
        {totalSubtasks > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-alignpoint-gray-700">
                Subtasks ({completedSubtasks}/{totalSubtasks})
              </span>
              <span className="text-sm text-alignpoint-gray-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-alignpoint-gray-200 rounded-full h-2">
              <div 
                className="bg-alignpoint-red h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────
   Task Status Selector
───────────────────────────────────────────────────────── */

function TaskStatusSelector({ 
  currentStatus, 
  onStatusChange, 
  userRole 
}: { 
  currentStatus: Task["status"]
  onStatusChange: (status: Task["status"]) => void
  userRole: string
}) {
  const canMoveToReview = currentStatus === "in_progress"
  const canMoveToDone = currentStatus === "in_review" && (userRole === "tester" || userRole === "project_manager" || userRole === "admin")

  return (
    <select
      value={currentStatus}
      onChange={(e) => onStatusChange(e.target.value as Task["status"])}
      className="text-xs border border-alignpoint-gray-300 rounded px-2 py-1 bg-white focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
    >
      <option value="todo">To Do</option>
      <option value="in_progress">In Progress</option>
      {canMoveToReview && <option value="in_review">In Review</option>}
      {canMoveToDone && <option value="done">Done</option>}
    </select>
  )
}

/* ─────────────────────────────────────────────────────────
   Task Detail Modal
───────────────────────────────────────────────────────── */

function TaskDetailModal({ 
  task, 
  onClose, 
  onStatusChange, 
  onSubtaskToggle,
  userRole 
}: {
  task: Task
  onClose: () => void
  onStatusChange: (taskId: number, status: Task["status"]) => void
  onSubtaskToggle: (taskId: number, subtaskId: number) => void
  userRole: string
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-alignpoint-black">{task.title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-alignpoint-gray-500 hover:text-alignpoint-black">
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="font-semibold text-alignpoint-black mb-2">Description</h3>
                <p className="text-alignpoint-gray-700">{task.description}</p>
              </div>

              {/* Subtask Checklist */}
              <div>
                <h3 className="font-semibold text-alignpoint-black mb-4">
                  Subtasks ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})
                </h3>
                <div className="space-y-3">
                  {task.subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center space-x-3 p-3 border border-alignpoint-gray-200 rounded-lg">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => onSubtaskToggle(task.id, subtask.id)}
                        className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                      />
                      <span className={`flex-1 ${subtask.completed ? 'line-through text-alignpoint-gray-500' : 'text-alignpoint-black'}`}>
                        {subtask.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div>
                <h4 className="font-semibold text-alignpoint-black mb-2">Status</h4>
                <TaskStatusSelector 
                  currentStatus={task.status}
                  onStatusChange={(newStatus) => onStatusChange(task.id, newStatus)}
                  userRole={userRole}
                />
              </div>

              {/* Project Info */}
              <div>
                <h4 className="font-semibold text-alignpoint-black mb-2">Project</h4>
                <p className="text-alignpoint-gray-700">{task.project}</p>
                <p className="text-sm text-alignpoint-gray-500 mt-1">{task.phase}</p>
              </div>

              {/* Due Date */}
              <div>
                <h4 className="font-semibold text-alignpoint-black mb-2">Due Date</h4>
                <p className="text-alignpoint-gray-700">{task.dueDate}</p>
              </div>

              {/* Time Tracking */}
              {task.timeLogged && (
                <div>
                  <h4 className="font-semibold text-alignpoint-black mb-2">Time Logged</h4>
                  <p className="text-alignpoint-gray-700">{task.timeLogged} hours</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   My Projects View
───────────────────────────────────────────────────────── */

function MyProjectsView({ userSession }: { userSession: UserSession }) {
  const projects = [
    { id: 1, title: "E-commerce Website Redesign", progress: 75, role: "Developer", tasksCount: 8 },
    { id: 2, title: "Customer Support System", progress: 45, role: "Designer", tasksCount: 5 },
    { id: 3, title: "Mobile App Development", progress: 20, role: "Developer", tasksCount: 12 },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-alignpoint-black">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="border-alignpoint-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="font-semibold text-alignpoint-black mb-2">{project.title}</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-alignpoint-gray-600">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="w-full bg-alignpoint-gray-200 rounded-full h-2">
                  <div 
                    className="bg-alignpoint-red h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-alignpoint-gray-600">
                  <span>Role: {project.role}</span>
                  <span>{project.tasksCount} tasks</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Settings Content
───────────────────────────────────────────────────────── */

function SettingsContent() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="space-y-6 max-w-xl">
      <h1 className="text-3xl font-bold text-alignpoint-black">Settings</h1>
      <Card className="border-alignpoint-gray-200">
        <CardHeader>
          <CardTitle className="text-alignpoint-black">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-alignpoint-black">
          <label className="flex items-center justify-between">
            <span>Enable dark mode</span>
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={(e) => setDarkMode(e.target.checked)}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
          <label className="flex items-center justify-between">
            <span>Email notifications</span>
            <input 
              type="checkbox" 
              checked={notifications} 
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
            />
          </label>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlignpointLogo } from "@/components/alignpoint-logo"

interface Phase {
  id: number
  title: string
  description: string
  order: number
  isExpanded: boolean
  visibleToClient: boolean
  tasks: Task[]
}

interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "in_progress" | "in_review" | "done"
  assignee: string
  priority: "low" | "medium" | "high" | "critical"
  dueDate: string
  createdAt: string
  phaseId: number
  subtasks: Array<{
    id: number
    text: string
    completed: boolean
  }>
  timeLogged?: number
  comments: Array<{
    id: number
    author: string
    content: string
    timestamp: string
  }>
}

interface TeamMember {
  id: number
  name: string
  role: "admin" | "project_manager" | "designer" | "developer" | "tester"
  email: string
  avatar: string
}

interface ProjectDetailPageProps {
  project: any
  onBack: () => void
}

export function ProjectDetailPage({ project, onBack }: ProjectDetailPageProps) {
  const [activeTab, setActiveTab] = useState<"tasks" | "details" | "team">("tasks")
  const [showCreateTask, setShowCreateTask] = useState(false)
  const [selectedPhaseId, setSelectedPhaseId] = useState<number | null>(null)
  const [showTaskDetail, setShowTaskDetail] = useState<Task | null>(null)
  const [showEditProject, setShowEditProject] = useState(false)
  const [showProjectSettings, setShowProjectSettings] = useState(false)

  // Initialize phases from project data or use default phases
  const getInitialPhases = (): Phase[] => {
    if (project?.phases && project.phases.length > 0) {
      return project.phases.map((p: any) => ({
        ...p,
        isExpanded: true,
        tasks: [] // Tasks will be loaded separately
      }))
    }

    // Default phases for existing projects without phases
    return [
      {
        id: 1,
        title: "Phase 1: Foundation",
        description: "Project setup, requirements gathering, and initial architecture",
        order: 1,
        isExpanded: true,
        visibleToClient: true,
        tasks: [],
      },
      {
        id: 2,
        title: "Phase 2: Design & Planning",
        description: "UI/UX design, system architecture, and detailed planning",
        order: 2,
        isExpanded: true,
        visibleToClient: true,
        tasks: [],
      },
      {
        id: 3,
        title: "Phase 3: Development",
        description: "Core development, feature implementation, and integration",
        order: 3,
        isExpanded: false,
        visibleToClient: true,
        tasks: [],
      },
    ]
  }

  // Demo phases and tasks data with proper hierarchy
  const [phases, setPhases] = useState<Phase[]>(() => {
    const initialPhases = getInitialPhases()

    // Add demo tasks to the first few phases for demonstration
    if (initialPhases.length > 0) {
      initialPhases[0].tasks = [
        {
          id: 1,
          title: "Set up project structure",
          description: "Initialize repository and basic folder structure",
          status: "done",
          assignee: "Ben Developer",
          priority: "high",
          dueDate: "2024-05-10",
          createdAt: "2024-05-01",
          phaseId: initialPhases[0].id,
          subtasks: [
            { id: 1, text: "Create repository", completed: true },
            { id: 2, text: "Set up basic folder structure", completed: true },
            { id: 3, text: "Configure build tools", completed: true },
          ],
          timeLogged: 4.5,
          comments: [
            {
              id: 1,
              author: "Ben Developer",
              content: "Project structure is complete. All necessary folders and config files are in place.",
              timestamp: "2024-05-10 14:30",
            },
          ],
        },
        {
          id: 2,
          title: "Requirements analysis",
          description: "Gather and document all project requirements",
          status: "in_progress",
          assignee: "Priya Manager",
          priority: "critical",
          dueDate: "2024-05-15",
          createdAt: "2024-05-02",
          phaseId: initialPhases[0].id,
          subtasks: [
            { id: 1, text: "Stakeholder interviews", completed: true },
            { id: 2, text: "Document functional requirements", completed: false },
          ],
          timeLogged: 8.0,
          comments: [],
        },
      ]
    }

    if (initialPhases.length > 1) {
      initialPhases[1].tasks = [
        {
          id: 3,
          title: "Create user interface mockups",
          description: "Design all major screens and user flows",
          status: "in_review",
          assignee: "Sarah Designer",
          priority: "high",
          dueDate: "2024-05-25",
          createdAt: "2024-05-10",
          phaseId: initialPhases[1].id,
          subtasks: [
            { id: 1, text: "Homepage design", completed: true },
            { id: 2, text: "Product pages", completed: true },
            { id: 3, text: "User account screens", completed: true },
            { id: 4, text: "Mobile responsive designs", completed: true },
          ],
          comments: [
            {
              id: 1,
              author: "Sarah Designer",
              content: "All mockups are ready for review. The design system is consistent across all screens.",
              timestamp: "2024-05-20 16:45",
            },
          ],
        },
      ]
    }

    return initialPhases
  })

  const [teamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Alex Admin", role: "admin", email: "alex@alignpoint.com", avatar: "A" },
    { id: 2, name: "Priya Manager", role: "project_manager", email: "priya@alignpoint.com", avatar: "P" },
    { id: 3, name: "Ben Developer", role: "developer", email: "ben@alignpoint.com", avatar: "B" },
    { id: 4, name: "Sarah Designer", role: "designer", email: "sarah@alignpoint.com", avatar: "S" },
    { id: 5, name: "Tanya Tester", role: "tester", email: "tanya@alignpoint.com", avatar: "T" },
  ])

  // Calculate project statistics
  const allTasks = phases.flatMap(p => p.tasks)
  const completedTasks = allTasks.filter(t => t.status === "done").length
  const totalTasks = allTasks.length
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const togglePhaseExpansion = (phaseId: number) => {
    setPhases(phases.map(phase => 
      phase.id === phaseId 
        ? { ...phase, isExpanded: !phase.isExpanded }
        : phase
    ))
  }

  const moveTask = (taskId: number, newStatus: Task["status"], phaseId: number) => {
    setPhases(phases.map(phase => 
      phase.id === phaseId 
        ? {
            ...phase,
            tasks: phase.tasks.map(task => 
              task.id === taskId ? { ...task, status: newStatus } : task
            )
          }
        : phase
    ))
  }

  const handleCreateTask = (phaseId: number) => {
    setSelectedPhaseId(phaseId)
    setShowCreateTask(true)
  }

  const handleSaveTask = (newTask: Omit<Task, "id" | "comments" | "createdAt">) => {
    if (!selectedPhaseId) return
    
    const task: Task = {
      ...newTask,
      id: Date.now(),
      comments: [],
      createdAt: new Date().toISOString(),
    }

    setPhases(phases.map(phase => 
      phase.id === selectedPhaseId 
        ? { ...phase, tasks: [...phase.tasks, task] }
        : phase
    ))
    setShowCreateTask(false)
    setSelectedPhaseId(null)
  }

  return (
    <div className="min-h-screen bg-alignpoint-gray-50">
      <ProjectHeader project={project} onBack={onBack} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Project Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ProjectStatsCard title="Progress" value={`${progressPercentage}%`} />
          <ProjectStatsCard title="Total Tasks" value={totalTasks.toString()} />
          <ProjectStatsCard title="Completed" value={completedTasks.toString()} />
          <ProjectStatsCard title="Team Members" value={teamMembers.length.toString()} />
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-alignpoint-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "tasks", label: "Tasks", icon: "📋" },
              { id: "details", label: "Details", icon: "📄" },
              { id: "team", label: "Team", icon: "👥" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-alignpoint-red text-alignpoint-red"
                    : "border-transparent text-alignpoint-gray-500 hover:text-alignpoint-gray-700 hover:border-alignpoint-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === "tasks" && (
          <TasksPhaseView 
            phases={phases}
            onTogglePhase={togglePhaseExpansion}
            onMoveTask={moveTask}
            onCreateTask={handleCreateTask}
            onViewTask={setShowTaskDetail}
          />
        )}
        {activeTab === "details" && <DetailsTab project={project} />}
        {activeTab === "team" && (
          <TeamTab 
            project={project} 
            teamMembers={teamMembers}
            phases={phases}
            setPhases={setPhases}
          />
        )}
      </div>

      {/* Create Task Modal */}
      {showCreateTask && selectedPhaseId && (
        <CreateTaskModal
          phaseId={selectedPhaseId}
          teamMembers={teamMembers}
          onClose={() => {
            setShowCreateTask(false)
            setSelectedPhaseId(null)
          }}
          onSave={handleSaveTask}
        />
      )}

      {/* Task Detail Modal */}
      {showTaskDetail && (
        <TaskDetailModal
          task={showTaskDetail}
          onClose={() => setShowTaskDetail(null)}
          onStatusChange={(newStatus) => {
            moveTask(showTaskDetail.id, newStatus, showTaskDetail.phaseId)
            setShowTaskDetail({ ...showTaskDetail, status: newStatus })
          }}
        />
      )}

      {/* Edit Project Modal */}
      {showEditProject && (
        <EditProjectModal
          project={project}
          onClose={() => setShowEditProject(false)}
          onSave={(updatedProject) => {
            // Handle project update
            setShowEditProject(false)
          }}
        />
      )}

      {/* Project Settings Modal */}
      {showProjectSettings && (
        <ProjectSettingsModal
          project={project}
          onClose={() => setShowProjectSettings(false)}
          onSave={(settings) => {
            // Handle settings update
            setShowProjectSettings(false)
          }}
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Project Header
───────────────────────────────────────────────────────── */

function ProjectHeader({ project, onBack }: { project: any; onBack: () => void }) {
  return (
    <header className="bg-white border-b border-alignpoint-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <AlignpointLogo size="md" showText={true} />
          <div className="h-6 w-px bg-alignpoint-gray-300"></div>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-alignpoint-gray-600 hover:text-alignpoint-black"
            >
              ← Back to Dashboard
            </Button>
            <div className="h-4 w-px bg-alignpoint-gray-300"></div>
            <div>
              <h1 className="text-xl font-semibold text-alignpoint-black">{project?.title || "Project"}</h1>
              <p className="text-sm text-alignpoint-gray-600">Project Management</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-alignpoint-gray-300"
            onClick={() => setShowEditProject(true)}
          >
            Edit Project
          </Button>
          <Button
            className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
            size="sm"
            onClick={() => setShowProjectSettings(true)}
          >
            Project Settings
          </Button>
        </div>
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────
   Project Stats Cards
───────────────────────────────────────────────────────── */

function ProjectStatsCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="border-alignpoint-gray-200">
      <CardContent className="p-6 text-center">
        <div className="text-3xl font-bold text-alignpoint-red mb-2">{value}</div>
        <div className="text-sm text-alignpoint-gray-600">{title}</div>
      </CardContent>
    </Card>
  )
}

/* ─────────────────────────────────────────────────────────
   Tasks Phase View - Phase-Based Kanban
───────────────────────────────────────────────────────── */

function TasksPhaseView({
  phases,
  onTogglePhase,
  onMoveTask,
  onCreateTask,
  onViewTask,
}: {
  phases: Phase[]
  onTogglePhase: (phaseId: number) => void
  onMoveTask: (taskId: number, status: Task["status"], phaseId: number) => void
  onCreateTask: (phaseId: number) => void
  onViewTask: (task: Task) => void
}) {
  const kanbanColumns = [
    { id: "todo", title: "To Do", color: "bg-blue-100 border-blue-200" },
    { id: "in_progress", title: "In Progress", color: "bg-yellow-100 border-yellow-200" },
    { id: "in_review", title: "In Review", color: "bg-purple-100 border-purple-200" },
    { id: "done", title: "Done", color: "bg-green-100 border-green-200" },
  ]

  return (
    <div className="space-y-8">
      {phases.map((phase) => (
        <div key={phase.id} className="border border-alignpoint-gray-200 rounded-lg bg-white">
          {/* Phase Header */}
          <div className="border-b border-alignpoint-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onTogglePhase(phase.id)}
                  className="text-alignpoint-gray-400 hover:text-alignpoint-black transition-colors"
                >
                  <svg 
                    className={`w-5 h-5 transition-transform ${phase.isExpanded ? 'rotate-90' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div>
                  <h3 className="text-lg font-semibold text-alignpoint-black">{phase.title}</h3>
                  <p className="text-sm text-alignpoint-gray-600">{phase.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-alignpoint-gray-500">
                  {phase.tasks.length} task{phase.tasks.length !== 1 ? 's' : ''}
                </span>
                <Button
                  onClick={() => onCreateTask(phase.id)}
                  size="sm"
                  className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Task
                </Button>
              </div>
            </div>
          </div>

          {/* Phase Kanban Board */}
          {phase.isExpanded && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kanbanColumns.map((column) => (
                  <div key={column.id} className={`rounded-lg border-2 ${column.color} p-4`}>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-alignpoint-black">{column.title}</h4>
                      <span className="bg-white px-2 py-1 rounded-full text-xs font-medium">
                        {phase.tasks.filter(task => task.status === column.id).length}
                      </span>
                    </div>

                    <div className="space-y-3 min-h-[200px]">
                      {phase.tasks
                        .filter(task => task.status === column.id)
                        .map(task => (
                          <TaskCard 
                            key={task.id} 
                            task={task} 
                            onMove={(newStatus) => onMoveTask(task.id, newStatus, phase.id)}
                            onView={() => onViewTask(task)}
                          />
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Task Card Component
───────────────────────────────────────────────────────── */

function TaskCard({
  task,
  onMove,
  onView,
}: {
  task: Task
  onMove: (status: Task["status"]) => void
  onView: () => void
}) {
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

  return (
    <div
      className="bg-white p-4 rounded-lg border border-alignpoint-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onView}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h5 className="font-medium text-alignpoint-black text-sm line-clamp-2">{task.title}</h5>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>

        <p className="text-xs text-alignpoint-gray-600 line-clamp-2">{task.description}</p>

        {totalSubtasks > 0 && (
          <div className="text-xs text-alignpoint-gray-500">
            📋 {completedSubtasks}/{totalSubtasks} subtasks
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-alignpoint-red text-white rounded-full flex items-center justify-center text-xs font-medium">
              {task.assignee.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="text-xs text-alignpoint-gray-600">{task.assignee}</span>
          </div>
          <span className="text-xs text-alignpoint-gray-500">{task.dueDate}</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Details Tab
───────────────────────────────────────────────────────── */

function DetailsTab({ project }: { project: any }) {
  return (
    <div className="space-y-6">
      <Card className="border-alignpoint-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-alignpoint-black">Project Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-alignpoint-gray-700 leading-relaxed">
            {project?.description || "No description available for this project."}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-alignpoint-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-alignpoint-black">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Start Date:</span>
              <span className="font-medium text-alignpoint-black">
                {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Not specified"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Estimated Completion:</span>
              <span className="font-medium text-alignpoint-black">June 30, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Priority:</span>
              <span className="font-medium text-orange-600">High</span>
            </div>
            <div className="flex justify-between">
              <span className="text-alignpoint-gray-600">Status:</span>
              <span className="font-medium text-green-600">On Track</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-alignpoint-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-alignpoint-black">Project Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border border-alignpoint-gray-200 rounded">
                <span className="text-sm text-alignpoint-black">📄 Requirements Document.pdf</span>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
              <div className="flex items-center justify-between p-2 border border-alignpoint-gray-200 rounded">
                <span className="text-sm text-alignpoint-black">🎨 Design Mockups.figma</span>
                <Button variant="ghost" size="sm">Download</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/* ────���────────────────────────────────────────────────────
   Team Tab
───────────────────────────────────────────────────────── */

function TeamTab({ 
  project, 
  teamMembers,
  phases,
  setPhases 
}: { 
  project: any
  teamMembers: TeamMember[]
  phases: Phase[]
  setPhases: (phases: Phase[]) => void
}) {
  const [showAddMember, setShowAddMember] = useState(false)

  const handleToggleClientVisibility = (phaseId: number) => {
    setPhases(phases.map(phase =>
      phase.id === phaseId
        ? { ...phase, visibleToClient: !phase.visibleToClient }
        : phase
    ))
  }

  return (
    <div className="space-y-8">
      {/* Team Members Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-alignpoint-black">Team Members</h2>
          <Button 
            onClick={() => setShowAddMember(true)}
            className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Member
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="border-alignpoint-gray-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-alignpoint-red text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="font-semibold text-alignpoint-black mb-2">{member.name}</h3>
                <p className="text-sm text-alignpoint-gray-600 mb-2 capitalize">{member.role.replace('_', ' ')}</p>
                <p className="text-xs text-alignpoint-gray-500 mb-4">{member.email}</p>
                <Button variant="ghost" size="sm" className="text-alignpoint-red hover:text-alignpoint-red/80">
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Phase Visibility Settings */}
      <div>
        <h2 className="text-2xl font-bold text-alignpoint-black mb-6">Client Visibility Settings</h2>
        <Card className="border-alignpoint-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-alignpoint-black">Phase Visibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {phases.map((phase) => (
                <div key={phase.id} className="flex items-center justify-between p-4 border border-alignpoint-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-alignpoint-black">{phase.title}</h4>
                    <p className="text-sm text-alignpoint-gray-600">{phase.description}</p>
                  </div>
                  <label className="flex items-center space-x-2">
                    <span className="text-sm text-alignpoint-gray-700">Visible to Client</span>
                    <input
                      type="checkbox"
                      checked={phase.visibleToClient}
                      onChange={() => handleToggleClientVisibility(phase.id)}
                      className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                    />
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <AddMemberModal onClose={() => setShowAddMember(false)} />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Create Task Modal
───────────────────────────────────────────────────────── */

function CreateTaskModal({
  phaseId,
  teamMembers,
  onClose,
  onSave,
}: {
  phaseId: number
  teamMembers: TeamMember[]
  onClose: () => void
  onSave: (task: Omit<Task, "id" | "comments" | "createdAt">) => void
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: teamMembers[0]?.name || "",
    priority: "medium" as Task["priority"],
    dueDate: "",
    status: "todo" as Task["status"],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      phaseId,
      subtasks: [],
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-alignpoint-black">Create New Task</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Task Title *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the task..."
                rows={4}
                className="w-full p-3 border border-alignpoint-gray-300 rounded-md resize-none focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Assignee</Label>
                <select
                  value={formData.assignee}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
                >
                  {teamMembers.map((member) => (
                    <option key={member.id} value={member.name}>{member.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task["priority"] })}
                  className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-alignpoint-gray-200">
              <Button type="button" onClick={onClose} variant="ghost">Cancel</Button>
              <Button type="submit" className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                Create Task
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Task Detail Modal
─────────────────────────────────��─────────────────────── */

function TaskDetailModal({
  task,
  onClose,
  onStatusChange,
}: {
  task: Task
  onClose: () => void
  onStatusChange: (status: Task["status"]) => void
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-alignpoint-black">{task.title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="font-semibold text-alignpoint-black mb-2">Description</h3>
                <p className="text-alignpoint-gray-700">{task.description}</p>
              </div>

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
                        readOnly
                        className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded"
                      />
                      <span className={`flex-1 ${subtask.completed ? 'line-through text-alignpoint-gray-500' : 'text-alignpoint-black'}`}>
                        {subtask.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-alignpoint-black mb-2">Status</h4>
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(e.target.value as Task["status"])}
                  className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="in_review">In Review</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div>
                <h4 className="font-semibold text-alignpoint-black mb-2">Assignee</h4>
                <p className="text-alignpoint-gray-700">{task.assignee}</p>
              </div>

              <div>
                <h4 className="font-semibold text-alignpoint-black mb-2">Due Date</h4>
                <p className="text-alignpoint-gray-700">{task.dueDate}</p>
              </div>

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
   Add Member Modal
───────────────────────────────────────────────────────── */

function AddMemberModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-alignpoint-black">Add Team Member</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input placeholder="Enter team member's email" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <select className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none">
                <option value="project_manager">Project Manager</option>
                <option value="designer">Designer/Developer</option>
                <option value="tester">Tester</option>
              </select>
            </div>
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Button type="button" onClick={onClose} variant="ghost">Cancel</Button>
              <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                Add Member
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Edit Project Modal
───────────────────────────────────────────────────────── */

function EditProjectModal({
  project,
  onClose,
  onSave,
}: {
  project: any
  onClose: () => void
  onSave: (project: any) => void
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    type: project?.type || "website",
    status: project?.status || 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...project, ...formData })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-alignpoint-black">Edit Project</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Project Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Project description..."
                rows={4}
                className="w-full p-3 border border-alignpoint-gray-300 rounded-md resize-none focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Project Type</Label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full p-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
              >
                <option value="website">Website</option>
                <option value="mobile-app">Mobile App</option>
                <option value="web-app">Web Application</option>
                <option value="design">Design Project</option>
                <option value="marketing">Marketing Campaign</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-alignpoint-gray-200">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Project Settings Modal
───────────────────────────────────────────────────────── */

function ProjectSettingsModal({
  project,
  onClose,
  onSave,
}: {
  project: any
  onClose: () => void
  onSave: (settings: any) => void
}) {
  const [settings, setSettings] = useState({
    isPublic: false,
    allowComments: true,
    emailNotifications: true,
    timeTracking: project?.timeTrackingRequired || false,
    autoArchive: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(settings)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-alignpoint-black">Project Settings</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Visibility</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-alignpoint-gray-700">Make project public</span>
                  <input
                    type="checkbox"
                    checked={settings.isPublic}
                    onChange={(e) => setSettings({ ...settings, isPublic: e.target.checked })}
                    className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                  />
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Collaboration</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-alignpoint-gray-700">Allow comments on tasks</span>
                  <input
                    type="checkbox"
                    checked={settings.allowComments}
                    onChange={(e) => setSettings({ ...settings, allowComments: e.target.checked })}
                    className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-alignpoint-gray-700">Email notifications</span>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                    className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                  />
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Features</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-alignpoint-gray-700">Enable time tracking</span>
                  <input
                    type="checkbox"
                    checked={settings.timeTracking}
                    onChange={(e) => setSettings({ ...settings, timeTracking: e.target.checked })}
                    className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-alignpoint-gray-700">Auto-archive when complete</span>
                  <input
                    type="checkbox"
                    checked={settings.autoArchive}
                    onChange={(e) => setSettings({ ...settings, autoArchive: e.target.checked })}
                    className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                  />
                </label>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-red-800 mb-2">Danger Zone</h4>
              <p className="text-sm text-red-700 mb-3">Permanently delete this project and all its data.</p>
              <Button variant="outline" size="sm" className="border-red-300 text-red-700 hover:bg-red-50">
                Delete Project
              </Button>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-alignpoint-gray-200">
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                Save Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

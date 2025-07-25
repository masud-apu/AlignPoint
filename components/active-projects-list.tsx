"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ActiveProjectsList({ onSelectProject }: { onSelectProject?: (project: any) => void }) {
  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Website Redesign",
      progress: 75,
      status: "In Progress",
      dueDate: "Due in 5 days",
      teamMembers: ["Ben", "Sarah", "Mike"],
      tasksCompleted: 15,
      totalTasks: 20,
    },
    {
      id: 2,
      title: "Mobile App Development",
      progress: 45,
      status: "In Progress",
      dueDate: "Due in 12 days",
      teamMembers: ["Ben", "Alex"],
      tasksCompleted: 9,
      totalTasks: 20,
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      progress: 90,
      status: "In Progress",
      dueDate: "Due in 2 days",
      teamMembers: ["Alex", "Lisa"],
      tasksCompleted: 18,
      totalTasks: 20,
    },
    {
      id: 4,
      title: "Customer Support System",
      progress: 25,
      status: "Overdue",
      dueDate: "2 days overdue",
      teamMembers: ["Sarah", "Mike"],
      tasksCompleted: 5,
      totalTasks: 20,
    },
    {
      id: 5,
      title: "Marketing Website",
      progress: 0,
      status: "Not Started",
      dueDate: "Due in 20 days",
      teamMembers: ["Lisa"],
      tasksCompleted: 0,
      totalTasks: 15,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-alignpoint-black">Active Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeProjects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={onSelectProject} />
        ))}
      </CardContent>
    </Card>
  )
}

function ProjectCard({ project, onSelect }: { project: any; onSelect?: (project: any) => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      case "Not Started":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const getDueDateColor = (status: string, dueDate: string) => {
    if (status === "Overdue" || dueDate.includes("overdue")) {
      return "text-red-600"
    }
    if (dueDate.includes("2 days") || dueDate.includes("1 day")) {
      return "text-amber-600"
    }
    return "text-slate-600"
  }

  return (
    <div
      className="border border-alignpoint-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect?.(project)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-alignpoint-black mb-1">{project.title}</h3>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
              {project.status}
            </span>
            <span className={`text-sm font-medium ${getDueDateColor(project.status, project.dueDate)}`}>
              {project.dueDate}
            </span>
          </div>
        </div>

        {/* Team Avatars */}
        <div className="flex -space-x-2">
          {project.teamMembers.map((member: string, index: number) => (
            <div
              key={index}
              className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center border-2 border-white text-xs font-medium"
              title={member}
            >
              {member[0]}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            {project.tasksCompleted} of {project.totalTasks} tasks completed
          </span>
          <span className="font-medium text-alignpoint-black">{project.progress}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-alignpoint-red h-2 rounded-full transition-all duration-300"
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OverdueTasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [projectFilter, setProjectFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")

  // Demo overdue tasks data
  const allOverdueTasks = [
    {
      id: 1,
      title: "Final QA and bug testing",
      assignee: "Mike Johnson",
      project: "E-commerce Website",
      dueDate: "2024-05-13",
      overdueDays: 2,
      priority: "high",
      description: "Complete final quality assurance testing and fix any remaining bugs",
    },
    {
      id: 2,
      title: "Payment gateway integration",
      assignee: "Ben Developer",
      project: "Customer Support System",
      dueDate: "2024-05-14",
      overdueDays: 1,
      priority: "critical",
      description: "Integrate Stripe payment processing system",
    },
    {
      id: 3,
      title: "Database migration script",
      assignee: "Alex Admin",
      project: "Data Analytics Dashboard",
      dueDate: "2024-05-12",
      overdueDays: 3,
      priority: "medium",
      description: "Create and test database migration scripts for production deployment",
    },
    {
      id: 4,
      title: "Mobile responsive design fixes",
      assignee: "Sarah Designer",
      project: "E-commerce Website",
      dueDate: "2024-05-11",
      overdueDays: 4,
      priority: "high",
      description: "Fix responsive design issues on mobile devices",
    },
    {
      id: 5,
      title: "API documentation update",
      assignee: "Ben Developer",
      project: "Mobile App",
      dueDate: "2024-05-10",
      overdueDays: 5,
      priority: "low",
      description: "Update API documentation with latest endpoint changes",
    },
  ]

  const filteredTasks = allOverdueTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProject = projectFilter === "all" || task.project === projectFilter
    const matchesUser = userFilter === "all" || task.assignee === userFilter

    return matchesSearch && matchesProject && matchesUser
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-alignpoint-gray-100 text-alignpoint-gray-800 border-alignpoint-gray-200"
    }
  }

  const getOverdueSeverity = (days: number) => {
    if (days >= 7) return "text-red-600 font-bold"
    if (days >= 3) return "text-red-500 font-semibold"
    return "text-orange-600 font-medium"
  }

  const uniqueProjects = [...new Set(allOverdueTasks.map((t) => t.project))]
  const uniqueUsers = [...new Set(allOverdueTasks.map((t) => t.assignee))]

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-alignpoint-black">Overdue Tasks</h1>
          <p className="text-alignpoint-gray-600 mt-1">Tasks that require immediate attention</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-600">{filteredTasks.length}</div>
          <div className="text-sm text-alignpoint-gray-500">Overdue Tasks</div>
        </div>
      </div>

      {/* Alert Banner */}
      {filteredTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">Attention Required</h3>
              <p className="text-sm text-red-700">
                You have {filteredTasks.length} overdue task{filteredTasks.length !== 1 ? "s" : ""} that need immediate
                attention.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <Card className="border-alignpoint-gray-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-alignpoint-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <Input
                placeholder="Search tasks or assignees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
              />
            </div>

            {/* Project Filter */}
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              className="px-3 py-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="all">All Projects</option>
              {uniqueProjects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>

            {/* User Filter */}
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="px-3 py-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="all">All Assignees</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Overdue Tasks List */}
      <Card className="border-alignpoint-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-alignpoint-black">
            Overdue Tasks ({filteredTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-alignpoint-gray-700 mb-2">No overdue tasks found</h3>
              <p className="text-alignpoint-gray-500">
                {searchTerm || projectFilter !== "all" || userFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Great job! All tasks are on schedule."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-red-200 rounded-lg p-6 bg-red-50/30 hover:bg-red-50/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-alignpoint-black">{task.title}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-alignpoint-gray-700 mb-3">{task.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-alignpoint-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                            {task.assignee
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="text-alignpoint-gray-700">{task.assignee}</span>
                        </div>
                        <span className="text-alignpoint-gray-400">•</span>
                        <span className="bg-alignpoint-gray-100 px-2 py-1 rounded text-xs font-medium">
                          {task.project}
                        </span>
                        <span className="text-alignpoint-gray-400">•</span>
                        <span className="text-alignpoint-gray-600">Due: {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getOverdueSeverity(task.overdueDays)}`}>
                        {task.overdueDays} day{task.overdueDays !== 1 ? "s" : ""}
                      </div>
                      <div className="text-sm text-alignpoint-gray-500">overdue</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-red-200">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-alignpoint-gray-700 border-alignpoint-gray-300 hover:bg-alignpoint-gray-50 bg-transparent"
                    >
                      View Task
                    </Button>
                    <Button size="sm" className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                      Mark Complete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}

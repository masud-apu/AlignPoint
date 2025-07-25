"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface EnhancedProjectsGridProps {
  projects: any[]
  onSelect: (project: any) => void
  onCreateNew: () => void
}

export function EnhancedProjectsGrid({ projects, onSelect, onCreateNew }: EnhancedProjectsGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredProjects = projects
    .filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || getProjectStatus(project.status) === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "progress":
          return b.status - a.status
        case "recent":
        default:
          return b.id - a.id
      }
    })

  const getProjectStatus = (progress: number) => {
    if (progress === 100) return "completed"
    if (progress >= 75) return "on-track"
    if (progress >= 25) return "in-progress"
    return "at-risk"
  }

  const getStatusColor = (progress: number) => {
    const status = getProjectStatus(progress)
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "on-track":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "at-risk":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-alignpoint-gray-100 text-alignpoint-gray-800 border-alignpoint-gray-200"
    }
  }

  const getStatusLabel = (progress: number) => {
    const status = getProjectStatus(progress)
    switch (status) {
      case "completed":
        return "Completed"
      case "on-track":
        return "On Track"
      case "in-progress":
        return "In Progress"
      case "at-risk":
        return "At Risk"
      default:
        return "Unknown"
    }
  }

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-alignpoint-black">Projects</h1>
          <p className="text-alignpoint-gray-600 mt-1">Manage and monitor all your projects</p>
        </div>
        <Button onClick={onCreateNew} className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Project
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="border-alignpoint-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
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
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
                />
              </div>
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="on-track">On Track</option>
              <option value="in-progress">In Progress</option>
              <option value="at-risk">At Risk</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="recent">Most Recent</option>
              <option value="name">Name A-Z</option>
              <option value="progress">Progress</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card className="border-alignpoint-gray-200">
          <CardContent className="p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-alignpoint-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-lg font-semibold text-alignpoint-gray-700 mb-2">No projects found</h3>
            <p className="text-alignpoint-gray-500 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Get started by creating your first project"}
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button onClick={onCreateNew} className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                Create Your First Project
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-alignpoint-gray-200 hover:border-alignpoint-red/30"
              onClick={() => onSelect(project)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Project Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-alignpoint-black mb-1 line-clamp-2">{project.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-alignpoint-gray-500">
                        <span>{project.members?.length || 0} members</span>
                        <span>•</span>
                        <span>Created {new Date(project.createdAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}
                    >
                      {getStatusLabel(project.status)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-alignpoint-gray-700">Progress</span>
                      <span className="text-sm font-bold text-alignpoint-black">{project.status}%</span>
                    </div>
                    <div className="w-full bg-alignpoint-gray-200 rounded-full h-2">
                      <div
                        className="bg-alignpoint-red h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.status}%` }}
                      />
                    </div>
                  </div>

                  {/* Team Members */}
                  {project.members && project.members.length > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.members.slice(0, 3).map((member: string, index: number) => (
                          <div
                            key={index}
                            className="w-8 h-8 bg-alignpoint-gray-300 rounded-full flex items-center justify-center border-2 border-white text-xs font-medium text-alignpoint-black"
                            title={member}
                          >
                            {member[0]}
                          </div>
                        ))}
                        {project.members.length > 3 && (
                          <div className="w-8 h-8 bg-alignpoint-gray-200 rounded-full flex items-center justify-center border-2 border-white text-xs font-medium text-alignpoint-gray-600">
                            +{project.members.length - 3}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-alignpoint-red hover:text-alignpoint-red hover:bg-alignpoint-red/5"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelect(project)
                        }}
                      >
                        View Details →
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Results Summary */}
      {filteredProjects.length > 0 && (
        <div className="text-center text-sm text-alignpoint-gray-500">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      )}
    </section>
  )
}

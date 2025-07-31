"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchResult {
  id: string
  type: 'project' | 'task' | 'user' | 'file'
  title: string
  description: string
  projectName?: string
  assignee?: string
  status?: string
  priority?: string
  dueDate?: string
  lastModified?: string
}

interface SearchResultsPageProps {
  query: string
  onBackToDashboard?: () => void
}

export default function SearchResultsPage({ query, onBackToDashboard }: SearchResultsPageProps) {
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("relevance")

  // Mock search data - in real app this would come from API
  const mockSearchData: SearchResult[] = [
    {
      id: "1",
      type: "project",
      title: "E-commerce Platform Redesign",
      description: "Complete redesign of the online shopping platform with modern UI/UX",
      status: "in-progress",
      lastModified: "2025-07-25"
    },
    {
      id: "2", 
      type: "task",
      title: "Implement user authentication system",
      description: "Create secure login/logout functionality with JWT tokens",
      projectName: "E-commerce Platform Redesign",
      assignee: "Ben Developer",
      status: "in_progress",
      priority: "high",
      dueDate: "2025-08-10"
    },
    {
      id: "3",
      type: "task", 
      title: "Design landing page mockups",
      description: "Create wireframes and high-fidelity designs for the new landing page",
      projectName: "Marketing Website",
      assignee: "Sarah Designer",
      status: "done",
      priority: "medium",
      dueDate: "2025-07-30"
    },
    {
      id: "4",
      type: "task",
      title: "Set up project structure",
      description: "Initialize repository and basic folder structure",
      projectName: "E-commerce Platform Redesign",
      assignee: "Ben Developer",
      status: "done",
      priority: "high",
      dueDate: "2025-05-10"
    },
    {
      id: "5",
      type: "user",
      title: "Sarah Designer",
      description: "UI/UX Designer specializing in web and mobile interfaces",
      status: "active"
    },
    {
      id: "6",
      type: "user",
      title: "Ben Developer",
      description: "Full-stack developer with expertise in React and Node.js",
      status: "active"
    },
    {
      id: "7",
      type: "file",
      title: "Project Requirements Document.pdf",
      description: "Detailed requirements specification for the e-commerce project",
      projectName: "E-commerce Platform Redesign",
      lastModified: "2025-07-28"
    },
    {
      id: "8",
      type: "project",
      title: "Mobile App Development",
      description: "Native iOS and Android app for customer engagement",
      status: "in-progress",
      lastModified: "2025-07-20"
    }
  ]

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, selectedFilter, sortBy])

  const performSearch = (query: string) => {
    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      let results = mockSearchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.projectName?.toLowerCase().includes(query.toLowerCase()) ||
        item.assignee?.toLowerCase().includes(query.toLowerCase())
      )

      // Apply filter
      if (selectedFilter !== "all") {
        results = results.filter(item => item.type === selectedFilter)
      }

      // Apply sorting
      results.sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(b.lastModified || b.dueDate || "").getTime() - 
                   new Date(a.lastModified || a.dueDate || "").getTime()
          case "title":
            return a.title.localeCompare(b.title)
          default: // relevance
            return 0
        }
      })

      setSearchResults(results)
      setIsLoading(false)
    }, 500)
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case "project": return "📁"
      case "task": return "✅"
      case "user": return "👤"
      case "file": return "📄"
      default: return "🔍"
    }
  }

  const getStatusBadge = (status: string, type: string) => {
    if (type === "task") {
      const statusColors = {
        "todo": "bg-gray-100 text-gray-800",
        "in_progress": "bg-blue-100 text-blue-800", 
        "in_review": "bg-purple-100 text-purple-800",
        "done": "bg-green-100 text-green-800",
        "on-hold": "bg-yellow-100 text-yellow-800"
      }
      return <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
        {status.replace("_", " ")}
      </Badge>
    }
    if (type === "project") {
      return <Badge className="bg-blue-100 text-blue-800">
        {status}
      </Badge>
    }
    return null
  }

  const getPriorityBadge = (priority: string) => {
    const priorityColors = {
      "critical": "bg-red-100 text-red-800",
      "high": "bg-orange-100 text-orange-800",
      "medium": "bg-yellow-100 text-yellow-800",
      "low": "bg-gray-100 text-gray-800"
    }
    return <Badge className={priorityColors[priority as keyof typeof priorityColors] || "bg-gray-100 text-gray-800"}>
      {priority}
    </Badge>
  }

  return (
    <div className="min-h-screen bg-alignpoint-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-alignpoint-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-alignpoint-black">Search Results</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Input */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-alignpoint-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <Input
                  placeholder="Search projects, tasks, users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      performSearch(searchQuery)
                    }
                  }}
                />
              </div>
              <Button onClick={() => performSearch(searchQuery)} className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Sort */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-alignpoint-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-sm font-medium text-alignpoint-gray-700">Filter:</span>
            <select 
              value={selectedFilter} 
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-alignpoint-gray-300 rounded-md px-3 py-1 text-sm focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="all">All</option>
              <option value="project">Projects</option>
              <option value="task">Tasks</option>
              <option value="user">Users</option>
              <option value="file">Files</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-alignpoint-gray-700">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-alignpoint-gray-300 rounded-md px-3 py-1 text-sm focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-alignpoint-red mx-auto"></div>
            <p className="text-alignpoint-gray-500 mt-4">Searching...</p>
          </div>
        ) : searchQuery.trim() === "" ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-alignpoint-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-alignpoint-gray-500">Enter a search term to get started</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-alignpoint-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-alignpoint-gray-500">No results found for "{searchQuery}"</p>
            <p className="text-alignpoint-gray-400 text-sm mt-2">Try different keywords or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-alignpoint-gray-600 mb-4">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
            </p>
            
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-md transition-shadow cursor-pointer border-alignpoint-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">
                      {getResultIcon(result.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-alignpoint-black mb-1">
                            {result.title}
                          </h3>
                          <p className="text-alignpoint-gray-600 mb-3">
                            {result.description}
                          </p>
                        </div>
                        
                        <Badge variant="outline" className="ml-4 capitalize">
                          {result.type}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-alignpoint-gray-500 mb-3">
                        {result.projectName && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            {result.projectName}
                          </span>
                        )}
                        
                        {result.assignee && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {result.assignee}
                          </span>
                        )}
                        
                        {result.dueDate && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Due: {result.dueDate}
                          </span>
                        )}
                        
                        {result.lastModified && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Modified: {result.lastModified}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {result.status && getStatusBadge(result.status, result.type)}
                        {result.priority && getPriorityBadge(result.priority)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

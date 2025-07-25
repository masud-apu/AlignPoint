"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ActivityLogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [activityFilter, setActivityFilter] = useState("all")

  // Extended demo activity data
  const allActivities = [
    {
      id: 1,
      type: "task_completed",
      icon: "✅",
      message: "Ben completed the task: 'Set up product database schema'",
      timestamp: "2 minutes ago",
      project: "E-commerce Website",
      user: "Ben Developer",
      date: "2024-05-15",
    },
    {
      id: 2,
      type: "member_assigned",
      icon: "👤",
      message: "Alex added Ben to the project: 'E-commerce Website Redesign'",
      timestamp: "15 minutes ago",
      project: "E-commerce Website",
      user: "Alex Admin",
      date: "2024-05-15",
    },
    {
      id: 3,
      type: "comment",
      icon: "💬",
      message: "Sarah commented on the task: 'Integrate Stripe API'",
      timestamp: "1 hour ago",
      project: "E-commerce Website",
      user: "Sarah Designer",
      date: "2024-05-15",
    },
    {
      id: 4,
      type: "overdue_alert",
      icon: "⚠️",
      message: "Task 'Final QA and bug testing' is now overdue",
      timestamp: "2 hours ago",
      project: "Customer Support System",
      user: "System",
      date: "2024-05-15",
    },
    {
      id: 5,
      type: "task_completed",
      icon: "✅",
      message: "Alex completed the task: 'Design user dashboard mockups'",
      timestamp: "3 hours ago",
      project: "Data Analytics Dashboard",
      user: "Alex Admin",
      date: "2024-05-15",
    },
    {
      id: 6,
      type: "project_created",
      icon: "📁",
      message: "New project 'Marketing Website' was created",
      timestamp: "1 day ago",
      project: "Marketing Website",
      user: "Alex Admin",
      date: "2024-05-14",
    },
    {
      id: 7,
      type: "task_created",
      icon: "📝",
      message: "Alex created a new task: 'Implement user authentication'",
      timestamp: "1 day ago",
      project: "Mobile App",
      user: "Alex Admin",
      date: "2024-05-14",
    },
    {
      id: 8,
      type: "status_changed",
      icon: "🔄",
      message: "Ben changed task status from 'To Do' to 'In Progress'",
      timestamp: "2 days ago",
      project: "E-commerce Website",
      user: "Ben Developer",
      date: "2024-05-13",
    },
  ]

  const filteredActivities = allActivities.filter((activity) => {
    const matchesSearch =
      activity.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.project.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUser = userFilter === "all" || activity.user === userFilter
    const matchesActivity = activityFilter === "all" || activity.type === activityFilter
    const matchesDate = dateFilter === "all" || activity.date === dateFilter

    return matchesSearch && matchesUser && matchesActivity && matchesDate
  })

  const getActivityColor = (type: string) => {
    switch (type) {
      case "task_completed":
        return "text-green-600"
      case "overdue_alert":
        return "text-red-600"
      case "member_assigned":
        return "text-blue-600"
      case "comment":
        return "text-purple-600"
      case "project_created":
        return "text-indigo-600"
      case "task_created":
        return "text-orange-600"
      case "status_changed":
        return "text-yellow-600"
      default:
        return "text-alignpoint-gray-600"
    }
  }

  const uniqueUsers = [...new Set(allActivities.map((a) => a.user))]
  const uniqueDates = [...new Set(allActivities.map((a) => a.date))].sort().reverse()

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-alignpoint-black">Activity Log</h1>
        <p className="text-alignpoint-gray-600 mt-1">Complete history of all system activities</p>
      </div>

      {/* Filters */}
      <Card className="border-alignpoint-gray-200">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
              />
            </div>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="all">All Dates</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>

            {/* User Filter */}
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="px-3 py-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>

            {/* Activity Type Filter */}
            <select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              className="px-3 py-2 border border-alignpoint-gray-300 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
            >
              <option value="all">All Activities</option>
              <option value="task_completed">Task Completed</option>
              <option value="task_created">Task Created</option>
              <option value="member_assigned">Member Assigned</option>
              <option value="comment">Comments</option>
              <option value="project_created">Project Created</option>
              <option value="status_changed">Status Changed</option>
              <option value="overdue_alert">Overdue Alerts</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Activity List */}
      <Card className="border-alignpoint-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-alignpoint-black">
            Activities ({filteredActivities.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12">
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
                  d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="text-lg font-semibold text-alignpoint-gray-700 mb-2">No activities found</h3>
              <p className="text-alignpoint-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex space-x-4 p-4 rounded-lg border border-alignpoint-gray-100 hover:bg-alignpoint-gray-50/50 transition-colors"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full bg-alignpoint-gray-100 flex items-center justify-center ${getActivityColor(activity.type)}`}
                  >
                    <span className="text-lg">{activity.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-alignpoint-black font-medium">{activity.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-3 text-sm text-alignpoint-gray-500">
                        <span className="bg-alignpoint-gray-100 px-2 py-1 rounded text-xs font-medium">
                          {activity.project}
                        </span>
                        <span>by {activity.user}</span>
                      </div>
                      <span className="text-sm text-alignpoint-gray-500">{activity.timestamp}</span>
                    </div>
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

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivityFeed({ onViewActivity }: { onViewActivity?: () => void }) {
  const activities = [
    {
      id: 1,
      type: "task_completed",
      icon: "✅",
      message: "Ben completed the task: 'Set up product database schema'",
      timestamp: "2 minutes ago",
      project: "E-commerce Website",
    },
    {
      id: 2,
      type: "member_assigned",
      icon: "👤",
      message: "You added Ben to the project: 'E-commerce Website Redesign'",
      timestamp: "15 minutes ago",
      project: "E-commerce Website",
    },
    {
      id: 3,
      type: "comment",
      icon: "💬",
      message: "Sarah commented on the task: 'Integrate Stripe API'",
      timestamp: "1 hour ago",
      project: "E-commerce Website",
    },
    {
      id: 4,
      type: "overdue_alert",
      icon: "⚠️",
      message: "Task 'Final QA and bug testing' is now overdue",
      timestamp: "2 hours ago",
      project: "Customer Support System",
    },
    {
      id: 5,
      type: "task_completed",
      icon: "✅",
      message: "Alex completed the task: 'Design user dashboard mockups'",
      timestamp: "3 hours ago",
      project: "Data Analytics Dashboard",
    },
    {
      id: 6,
      type: "project_created",
      icon: "📁",
      message: "New project 'Marketing Website' was created",
      timestamp: "1 day ago",
      project: "Marketing Website",
    },
  ]

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
      default:
        return "text-slate-600"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-alignpoint-black">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {activities.map((activity) => (
            <div key={activity.id} className="flex space-x-3">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center ${getActivityColor(activity.type)}`}
              >
                <span className="text-sm">{activity.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-900">{activity.message}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-slate-500">{activity.project}</p>
                  <p className="text-xs text-slate-500">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button onClick={onViewActivity} variant="ghost" size="sm" className="w-full mt-3 text-slate-600">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}

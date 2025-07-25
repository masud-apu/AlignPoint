"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AttentionNeededPanel({ onViewOverdue }: { onViewOverdue?: () => void }) {
  const criticalItems = [
    {
      id: 1,
      taskTitle: "Final QA and bug testing",
      assignee: "Mike",
      project: "E-commerce Website",
      overdueDays: 2,
    },
    {
      id: 2,
      taskTitle: "Payment gateway integration",
      assignee: "Ben",
      project: "Customer Support System",
      overdueDays: 1,
    },
    {
      id: 3,
      taskTitle: "Database migration script",
      assignee: "Alex",
      project: "Data Analytics Dashboard",
      overdueDays: 3,
    },
  ]

  return (
    <Card className="border-red-200">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <CardTitle className="text-lg font-semibold text-red-800">Attention Needed</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {criticalItems.map((item) => (
          <div key={item.id} className="border-l-2 border-red-200 pl-3 py-2">
            <h4 className="font-medium text-slate-900 text-sm">{item.taskTitle}</h4>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-slate-600">
                <span>{item.assignee}</span> • <span>{item.project}</span>
              </div>
              <span className="text-xs font-medium text-red-600">
                {item.overdueDays} day{item.overdueDays > 1 ? "s" : ""} overdue
              </span>
            </div>
          </div>
        ))}
        <Button
          onClick={onViewOverdue}
          variant="outline"
          size="sm"
          className="w-full mt-3 text-red-700 border-red-200 hover:bg-red-50 bg-transparent"
        >
          View All Overdue Tasks
        </Button>
      </CardContent>
    </Card>
  )
}

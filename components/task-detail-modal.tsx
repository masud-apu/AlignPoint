"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { type Task } from "./project-detail-page"

interface TaskDetailModalProps {
  task: Task
  onClose: () => void
  onStatusChange: (status: Task["status"]) => void
  onSubtaskUpdate?: (taskId: number, subtasks: Task["subtasks"]) => void
}

export function TaskDetailModal({
  task,
  onClose,
  onStatusChange,
  onSubtaskUpdate
}: TaskDetailModalProps) {
  const [localTask, setLocalTask] = useState<Task>(task)

  const handleSubtaskToggle = (subtaskId: number) => {
    const updatedSubtasks = localTask.subtasks.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    )
    setLocalTask({ ...localTask, subtasks: updatedSubtasks })
    onSubtaskUpdate?.(localTask.id, updatedSubtasks)
  }

  const handleStatusChange = (newStatus: Task["status"]) => {
    onStatusChange(newStatus)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-alignpoint-black">
              {localTask.title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Task Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-alignpoint-gray-500">Assignee</Label>
                  <p className="font-medium text-alignpoint-black">{localTask.assignee}</p>
                </div>
                <div>
                  <Label className="text-sm text-alignpoint-gray-500">Reviewer</Label>
                  <p className="font-medium text-blue-600">
                    {localTask.reviewer || "Not assigned"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-alignpoint-gray-500">Priority</Label>
                  <p className="font-medium text-alignpoint-black capitalize">
                    {localTask.priority}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-alignpoint-gray-500">Due Date</Label>
                  <p className="font-medium text-alignpoint-black">{localTask.dueDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-alignpoint-gray-500">Status</Label>
                  <p className="font-medium text-alignpoint-black capitalize">
                    {localTask.status.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-alignpoint-gray-500">Created</Label>
                  <p className="font-medium text-alignpoint-black">{localTask.createdAt}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-sm text-alignpoint-gray-500">Description</Label>
              <p className="text-alignpoint-gray-700">{localTask.description}</p>
            </div>

            {/* Subtasks */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm text-alignpoint-gray-500">Subtasks</Label>
                <span className="text-sm text-alignpoint-gray-500">
                  {localTask.subtasks.filter(st => st.completed).length} of {localTask.subtasks.length} completed
                </span>
              </div>
              {localTask.subtasks.length > 0 ? (
                <div className="space-y-2">
                  {localTask.subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={subtask.completed}
                        onChange={() => handleSubtaskToggle(subtask.id)}
                        className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                      />
                      <span className={`text-sm ${subtask.completed ? 'line-through text-alignpoint-gray-400' : 'text-alignpoint-gray-700'}`}>
                        {subtask.text}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-alignpoint-gray-500">No subtasks added yet.</p>
              )}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-alignpoint-gray-200">
              <Button variant="ghost" onClick={onClose}>Close</Button>
              <Button 
                className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
                onClick={() => handleStatusChange(localTask.status === 'done' ? 'in_progress' : 'done')}
              >
                {localTask.status === 'done' ? 'Reopen Task' : 'Mark as Complete'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

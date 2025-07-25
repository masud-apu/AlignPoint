"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus } from "lucide-react"

interface Subtask {
  id: number
  text: string
  completed: boolean
}

interface SubtaskManagerProps {
  subtasks: Subtask[]
  onChange: (subtasks: Subtask[]) => void
}

export function SubtaskManager({ subtasks, onChange }: SubtaskManagerProps) {
  const [newSubtaskText, setNewSubtaskText] = useState("")

  const addSubtask = () => {
    if (!newSubtaskText.trim()) return
    
    const newSubtask: Subtask = {
      id: Date.now(),
      text: newSubtaskText.trim(),
      completed: false
    }
    
    onChange([...subtasks, newSubtask])
    setNewSubtaskText("")
  }

  const removeSubtask = (id: number) => {
    onChange(subtasks.filter(st => st.id !== id))
  }

  const updateSubtaskText = (id: number, text: string) => {
    onChange(subtasks.map(st => 
      st.id === id ? { ...st, text } : st
    ))
  }

  const toggleSubtask = (id: number) => {
    onChange(subtasks.map(st =>
      st.id === id ? { ...st, completed: !st.completed } : st
    ))
  }

  return (
    <div className="space-y-3">
      <Label>Subtasks</Label>
      
      {/* Existing Subtasks */}
      {subtasks.map((subtask) => (
        <div key={subtask.id} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={subtask.completed}
            onChange={() => toggleSubtask(subtask.id)}
            className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
          />
          <Input
            value={subtask.text}
            onChange={(e) => updateSubtaskText(subtask.id, e.target.value)}
            className="flex-1 border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeSubtask(subtask.id)}
            className="text-alignpoint-gray-500 hover:text-alignpoint-red"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      {/* Add New Subtask */}
      <div className="flex items-center space-x-2">
        <Input
          value={newSubtaskText}
          onChange={(e) => setNewSubtaskText(e.target.value)}
          placeholder="Add a subtask..."
          className="flex-1 border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addSubtask()
            }
          }}
        />
        <Button
          type="button"
          onClick={addSubtask}
          className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

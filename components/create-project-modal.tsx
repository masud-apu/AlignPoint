"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  address: string
}

interface Phase {
  id: number
  title: string
  description: string
  order: number
  visibleToClient: boolean
}

interface CreateProjectModalProps {
  onClose: () => void
  onSave: (project: any) => void
}

export function CreateProjectModal({ onClose, onSave }: CreateProjectModalProps) {
  // Mock clients data (replace with actual data source)
  const [clients, setClients] = useState<Client[]>([
    { id: "1", name: "Acme Corp", email: "contact@acme.com", phone: "123-456-7890", company: "Acme Corporation", address: "123 Business St" },
    { id: "2", name: "Tech Solutions", email: "info@techsolutions.com", phone: "098-765-4321", company: "Tech Solutions Inc", address: "456 Tech Ave" }
  ])
  
  const [showNewClientDialog, setShowNewClientDialog] = useState(false)
  const [selectedClientId, setSelectedClientId] = useState<string>("")
  const [newClientData, setNewClientData] = useState<Omit<Client, "id">>({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: ""
  })

  const [formData, setFormData] = useState({
    title: "",
    type: "website",
    clientName: "",
    instructions: "",
    timeTrackingRequired: false,
    timeTrackingMethod: "manual",
  })

  const [files, setFiles] = useState<File[]>([])
  const [links, setLinks] = useState([{ title: "", url: "" }])
  
  // Initialize with default phases
  const [phases, setPhases] = useState<Phase[]>([
    {
      id: 1,
      title: "Phase 1: Planning & Discovery",
      description: "Requirements gathering, research, and project planning",
      order: 1,
      visibleToClient: true,
    },
    {
      id: 2,
      title: "Phase 2: Design & Architecture",
      description: "UI/UX design, system architecture, and technical planning",
      order: 2,
      visibleToClient: true,
    },
    {
      id: 3,
      title: "Phase 3: Development",
      description: "Core development, feature implementation, and integration",
      order: 3,
      visibleToClient: true,
    },
    {
      id: 4,
      title: "Phase 4: Testing & Launch",
      description: "Quality assurance, testing, deployment, and go-live activities",
      order: 4,
      visibleToClient: true,
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedClient = clients.find(c => c.id === selectedClientId)
    if (!selectedClient) {
      alert("Please select a client or create a new one")
      return
    }

    const newProject = {
      id: Date.now(),
      title: formData.title,
      client: selectedClient,
      type: formData.type,
      instructions: formData.instructions,
      status: 0, // New project starts at 0%
      members: ["Alex Admin"],
      timeTrackingRequired: formData.timeTrackingRequired,
      timeTrackingMethod: formData.timeTrackingMethod,
      files: files,
      links: links.filter((link) => link.title && link.url),
      phases: phases, // Include phases in project data
      createdAt: new Date().toISOString(),
      description: formData.instructions, // Use instructions as description
    }

    onSave(newProject)
  }

  const addLink = () => {
    setLinks([...links, { title: "", url: "" }])
  }

  const updateLink = (index: number, field: string, value: string) => {
    const updatedLinks = [...links]
    updatedLinks[index] = { ...updatedLinks[index], [field]: value }
    setLinks(updatedLinks)
  }

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  // Phase management functions
  const addPhase = () => {
    const newPhase: Phase = {
      id: Date.now(),
      title: `Phase ${phases.length + 1}: New Phase`,
      description: "Enter phase description...",
      order: phases.length + 1,
      visibleToClient: true,
    }
    setPhases([...phases, newPhase])
  }

  const updatePhase = (index: number, field: keyof Phase, value: string | boolean) => {
    const updatedPhases = [...phases]
    updatedPhases[index] = { ...updatedPhases[index], [field]: value }
    setPhases(updatedPhases)
  }

  const removePhase = (index: number) => {
    if (phases.length <= 1) return // Keep at least one phase
    const updatedPhases = phases.filter((_, i) => i !== index)
    // Reorder remaining phases
    updatedPhases.forEach((phase, i) => {
      phase.order = i + 1
    })
    setPhases(updatedPhases)
  }

  const movePhase = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === phases.length - 1)
    ) return

    const newPhases = [...phases]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    // Swap phases
    const temp = newPhases[index]
    newPhases[index] = newPhases[targetIndex]
    newPhases[targetIndex] = temp
    
    // Update order numbers
    newPhases.forEach((phase, i) => {
      phase.order = i + 1
    })
    
    setPhases(newPhases)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-alignpoint-gray-200">
        <CardHeader className="border-b border-alignpoint-gray-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold text-alignpoint-black">Create New Project</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-alignpoint-gray-500 hover:text-alignpoint-black"
            >
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Project Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-alignpoint-black border-b border-alignpoint-gray-200 pb-2">
                  Project Information
                </h3>

                {/* Project Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-alignpoint-gray-700 font-medium">
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter project title"
                    required
                    className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
                  />
                </div>

                {/* Client Selection */}
                <div className="space-y-2">
                  <Label htmlFor="clientName" className="text-alignpoint-gray-700 font-medium">
                    Client *
                  </Label>
                  <div className="flex space-x-2">
                    <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                      <SelectTrigger className="w-full border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red">
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewClientDialog(true)}
                      className="whitespace-nowrap border-alignpoint-gray-300 hover:bg-alignpoint-red hover:text-white"
                    >
                      New Client
                    </Button>
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-alignpoint-gray-700 font-medium">
                    Project Type
                  </Label>
                  <select
                    id="type"
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

                {/* Instructions */}
                <div className="space-y-2">
                  <Label htmlFor="instructions" className="text-alignpoint-gray-700 font-medium">
                    Project Instructions
                  </Label>
                  <textarea
                    id="instructions"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    placeholder="Provide detailed instructions for this project..."
                    rows={4}
                    className="w-full p-3 border border-alignpoint-gray-300 rounded-md resize-none focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
                  />
                </div>

                {/* Time Tracking */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="timeTracking"
                      checked={formData.timeTrackingRequired}
                      onChange={(e) => setFormData({ ...formData, timeTrackingRequired: e.target.checked })}
                      className="rounded border-alignpoint-gray-300 text-alignpoint-red focus:ring-alignpoint-red"
                    />
                    <Label htmlFor="timeTracking" className="text-alignpoint-gray-700 font-medium">
                      Time Tracking Required
                    </Label>
                  </div>

                  {formData.timeTrackingRequired && (
                    <div className="ml-6 space-y-2">
                      <Label className="text-alignpoint-gray-700 font-medium">Time Tracking Method</Label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="timeTrackingMethod"
                            value="manual"
                            checked={formData.timeTrackingMethod === "manual"}
                            onChange={(e) => setFormData({ ...formData, timeTrackingMethod: e.target.value })}
                            className="text-alignpoint-red focus:ring-alignpoint-red"
                          />
                          <span className="text-alignpoint-gray-700">Manual Entry</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="timeTrackingMethod"
                            value="timer"
                            checked={formData.timeTrackingMethod === "timer"}
                            onChange={(e) => setFormData({ ...formData, timeTrackingMethod: e.target.value })}
                            className="text-alignpoint-red focus:ring-alignpoint-red"
                          />
                          <span className="text-alignpoint-gray-700">Timer</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Project Phases */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-alignpoint-gray-200 pb-2">
                  <h3 className="text-lg font-semibold text-alignpoint-black">Project Phases</h3>
                  <Button
                    type="button"
                    onClick={addPhase}
                    size="sm"
                    variant="outline"
                    className="text-alignpoint-red border-alignpoint-red hover:bg-alignpoint-red/5 bg-transparent"
                  >
                    + Add Phase
                  </Button>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {phases.map((phase, index) => (
                    <div key={phase.id} className="border border-alignpoint-gray-200 rounded-lg p-4 bg-alignpoint-gray-50">
                      <div className="space-y-3">
                        {/* Phase Title */}
                        <div className="flex items-center space-x-2">
                          <Input
                            value={phase.title}
                            onChange={(e) => updatePhase(index, 'title', e.target.value)}
                            placeholder="Phase title"
                            className="flex-1 text-sm border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
                          />
                          <div className="flex items-center space-x-1">
                            <Button
                              type="button"
                              onClick={() => movePhase(index, 'up')}
                              disabled={index === 0}
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-alignpoint-gray-500 hover:text-alignpoint-black disabled:opacity-30"
                            >
                              ↑
                            </Button>
                            <Button
                              type="button"
                              onClick={() => movePhase(index, 'down')}
                              disabled={index === phases.length - 1}
                              size="sm"
                              variant="ghost"
                              className="h-7 w-7 p-0 text-alignpoint-gray-500 hover:text-alignpoint-black disabled:opacity-30"
                            >
                              ↓
                            </Button>
                            {phases.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removePhase(index)}
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 text-alignpoint-red hover:bg-alignpoint-red/5"
                              >
                                ✕
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Phase Description */}
                        <textarea
                          value={phase.description}
                          onChange={(e) => updatePhase(index, 'description', e.target.value)}
                          placeholder="Phase description"
                          rows={2}
                          className="w-full p-2 text-sm border border-alignpoint-gray-300 rounded-md resize-none focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
                        />

                        {/* Client Visibility */}
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={phase.visibleToClient}
                            onChange={(e) => updatePhase(index, 'visibleToClient', e.target.checked)}
                            className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                          />
                          <span className="text-sm text-alignpoint-gray-700">Visible to Client</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* File Attachments - Full Width */}
            <div className="space-y-2">
              <Label className="text-alignpoint-gray-700 font-medium">File Attachments</Label>
              <div className="border-2 border-dashed border-alignpoint-gray-300 rounded-lg p-6 text-center hover:border-alignpoint-red/50 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-alignpoint-gray-500">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p>Click to upload files or drag and drop</p>
                    <p className="text-xs">PNG, JPG, PDF, DOC up to 10MB each</p>
                  </div>
                </label>
                {files.length > 0 && (
                  <div className="mt-3 text-sm text-alignpoint-gray-700">{files.length} file(s) selected</div>
                )}
              </div>
            </div>

            {/* Relevant Links - Full Width */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-alignpoint-gray-700 font-medium">Relevant Links</Label>
                <Button
                  type="button"
                  onClick={addLink}
                  size="sm"
                  variant="outline"
                  className="text-alignpoint-red border-alignpoint-red hover:bg-alignpoint-red/5 bg-transparent"
                >
                  + Add Link
                </Button>
              </div>
              {links.map((link, index) => (
                <div key={index} className="flex space-x-2">
                  <Input
                    placeholder="Link title"
                    value={link.title}
                    onChange={(e) => updateLink(index, "title", e.target.value)}
                    className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
                  />
                  <Input
                    placeholder="https://..."
                    value={link.url}
                    onChange={(e) => updateLink(index, "url", e.target.value)}
                    className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
                  />
                  {links.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeLink(index)}
                      size="sm"
                      variant="ghost"
                      className="text-alignpoint-red hover:bg-alignpoint-red/5"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-alignpoint-gray-200">
              <Button
                type="button"
                onClick={onClose}
                variant="ghost"
                className="text-alignpoint-gray-600 hover:text-alignpoint-black"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
                disabled={!formData.title.trim() || phases.length === 0}
              >
                Create Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* New Client Dialog */}
      <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                value={newClientData.name}
                onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                placeholder="Enter client name"
                className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                value={newClientData.company}
                onChange={(e) => setNewClientData({ ...newClientData, company: e.target.value })}
                placeholder="Enter company name (optional)"
                className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClientData.email}
                  onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newClientData.phone}
                  onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={newClientData.address}
                onChange={(e) => setNewClientData({ ...newClientData, address: e.target.value })}
                placeholder="Enter address"
                className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowNewClientDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
              onClick={() => {
                const newClient = {
                  id: Date.now().toString(),
                  ...newClientData
                }
                setClients([...clients, newClient])
                setSelectedClientId(newClient.id)
                setNewClientData({ name: "", email: "", phone: "", company: "", address: "" })
                setShowNewClientDialog(false)
              }}
            >
              Add Client
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

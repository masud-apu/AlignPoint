export interface Project {
  id: number
  name: string
  description: string
  progress: number
  startDate: string
  dueDate: string
  status: 'active' | 'completed' | 'on_hold'
  currentPhase: string
  timeline: 'on_track' | 'ahead' | 'delayed'
  notes?: string
  instructions: string
  nextMilestone: string
  teamRequests: TeamRequest[]
}

export interface TeamRequest {
  id: number
  question: string
  requestedBy: string
  requestedAt: string
  status: 'pending' | 'answered' | 'clarification_needed'
  response?: string
  responseAt?: string
}

export interface Milestone {
  id: number
  title: string
  description: string
  status: 'completed' | 'in_progress' | 'upcoming'
  dueDate: string
  completionDate?: string
  visibleToClient: boolean
}

export interface ProjectUpdate {
  id: number
  title: string
  content: string
  author: string
  date: string
  type: 'general' | 'milestone' | 'file_shared'
}

export interface SharedFile {
  id: number
  name: string
  type: string
  size: string
  sharedDate: string
  sharedBy: string
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
}

interface UserSettingsState {
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications: boolean
  projectUpdates: boolean
  taskReminders: boolean
  version: string
  lastLogin: string
  browser: string
  platform: string
}

interface SettingsSection {
  id: string
  title: string
  icon: string
  description: string
  content: React.ReactNode
}

export function SettingsContent() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "personal"
  
  const [activeSection, setActiveSection] = useState<string>("personal")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  
  const [settingsState, setSettingsState] = useState<UserSettingsState>({
    // Personal Settings
    firstName: "John",
    lastName: "Client",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "",
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: true,
    projectUpdates: true,
    taskReminders: true,
    
    // System Information (read-only)
    version: "1.0.0",
    lastLogin: "2024-07-29 09:00 AM",
    browser: "Chrome 115.0.0",
    platform: "Windows",
  })

  const handleSave = () => {
    // Save settings logic here
    alert("Settings saved successfully!")
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-alignpoint-black">Client Settings</h1>
        <p className="text-alignpoint-gray-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-6">
        <TabsList className="w-full border-b border-alignpoint-gray-200 bg-transparent p-0">
          <div className="flex space-x-6">
            <TabsTrigger
              value="personal"
              className="pb-4 text-sm font-medium text-alignpoint-gray-600 border-b-2 border-transparent data-[state=active]:border-alignpoint-red data-[state=active]:text-alignpoint-black"
            >
              Personal Settings
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="pb-4 text-sm font-medium text-alignpoint-gray-600 border-b-2 border-transparent data-[state=active]:border-alignpoint-red data-[state=active]:text-alignpoint-black"
            >
              Notification Settings
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="pb-4 text-sm font-medium text-alignpoint-gray-600 border-b-2 border-transparent data-[state=active]:border-alignpoint-red data-[state=active]:text-alignpoint-black"
            >
              System Information
            </TabsTrigger>
          </div>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-alignpoint-red text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {settingsState.firstName[0]}{settingsState.lastName[0]}
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="border-alignpoint-gray-300 mr-2">
                      Upload Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="text-alignpoint-gray-600">
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input
                      value={settingsState.firstName}
                      onChange={(e) => setSettingsState({ ...settingsState, firstName: e.target.value })}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input
                      value={settingsState.lastName}
                      onChange={(e) => setSettingsState({ ...settingsState, lastName: e.target.value })}
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={settingsState.email}
                      onChange={(e) => setSettingsState({ ...settingsState, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input
                      value={settingsState.phone}
                      onChange={(e) => setSettingsState({ ...settingsState, phone: e.target.value })}
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-alignpoint-black mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-alignpoint-gray-700 font-medium">Email notifications</span>
                      <p className="text-sm text-alignpoint-gray-500">Receive important updates via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsState.emailNotifications}
                      onChange={(e) => setSettingsState({ ...settingsState, emailNotifications: e.target.checked })}
                      className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-alignpoint-gray-700 font-medium">Push notifications</span>
                      <p className="text-sm text-alignpoint-gray-500">Get instant updates in your browser</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsState.smsNotifications}
                      onChange={(e) => setSettingsState({ ...settingsState, smsNotifications: e.target.checked })}
                      className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-alignpoint-gray-700 font-medium">Project updates</span>
                      <p className="text-sm text-alignpoint-gray-500">Get notified about project milestones and changes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsState.projectUpdates}
                      onChange={(e) => setSettingsState({ ...settingsState, projectUpdates: e.target.checked })}
                      className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                    />
                  </label>

                  <label className="flex items-center justify-between">
                    <div>
                      <span className="text-alignpoint-gray-700 font-medium">Task reminders</span>
                      <p className="text-sm text-alignpoint-gray-500">Receive reminders about upcoming tasks</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settingsState.taskReminders}
                      onChange={(e) => setSettingsState({ ...settingsState, taskReminders: e.target.checked })}
                      className="w-4 h-4 text-alignpoint-red border-alignpoint-gray-300 rounded focus:ring-alignpoint-red"
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-alignpoint-black mb-4">System Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-alignpoint-gray-600">Version:</span>
                        <span className="font-medium text-alignpoint-black">{settingsState.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-alignpoint-gray-600">Last Login:</span>
                        <span className="font-medium text-alignpoint-black">{settingsState.lastLogin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-alignpoint-gray-600">Browser:</span>
                        <span className="font-medium text-alignpoint-black">{settingsState.browser}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-alignpoint-gray-600">Platform:</span>
                        <span className="font-medium text-alignpoint-black">{settingsState.platform}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Support Information</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>For technical support, contact: support@alignpoint.com</p>
                      <p>Support hours: Monday - Friday, 9:00 AM - 5:00 PM EST</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end space-x-3">
        <Button variant="outline" onClick={() => window.history.back()}>Cancel</Button>
        <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  )
    
  const handleRemoveUser = (userId: number) => {
    if (confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter(user => user.id !== userId))
    }
  }

  const handleAddUser = (userData: { name: string; email: string; role: string }) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      avatar: userData.name.charAt(0).toUpperCase()
    }
    setUsers([...users, newUser])
    setShowAddUserModal(false)
  }

  const handleEditUser = (userId: number, userData: { name: string; email: string; role: string }) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, ...userData }
        : user
    ))
    setShowEditUserModal(false)
    setSelectedUser(null)
  }

  const openEditModal = (user: any) => {
    setSelectedUser(user)
    setShowEditUserModal(true)
  }

  interface UserFormData {
    name: string
    email: string
    role: string
  }

  interface UserModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: UserFormData) => void
    initialData?: UserFormData
  }

  const UserModal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    initialData = { name: '', email: '', role: 'developer' }
  }: UserModalProps) => {
    const [formData, setFormData] = useState(initialData)

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(formData)
    }

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{initialData.name ? 'Edit User' : 'Add New User'}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-alignpoint-black">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-alignpoint-gray-200 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-alignpoint-black">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 border border-alignpoint-gray-200 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-alignpoint-black">Role</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2 border border-alignpoint-gray-200 rounded-md focus:border-alignpoint-red focus:ring-1 focus:ring-alignpoint-red focus:outline-none"
                  required
                >
                  <option value="admin">Admin</option>
                  <option value="project_manager">Project Manager</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="tester">Tester</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                  {initialData.name ? 'Save Changes' : 'Add User'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  const settingsSections: SettingsSection[] = [
    {
      id: "personal",
      title: "Personal Settings",
      icon: "👤",
      description: "Manage your personal information and preferences",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-alignpoint-gray-300 rounded-full flex items-center justify-center text-2xl font-medium">
                A
              </div>
              <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">
                Change Avatar
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-alignpoint-black mb-1 block">First Name</label>
                <input type="text" defaultValue="Alex" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              </div>
              <div>
                <label className="text-sm font-medium text-alignpoint-black mb-1 block">Last Name</label>
                <input type="text" defaultValue="Admin" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-alignpoint-black mb-1 block">Email Address</label>
              <input type="email" defaultValue="alex@alignpoint.com" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
            </div>
            <div>
              <label className="text-sm font-medium text-alignpoint-black mb-1 block">Job Title</label>
              <input type="text" defaultValue="Administrator" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
            </div>
            <div>
              <label className="text-sm font-medium text-alignpoint-black mb-1 block">Time Zone</label>
              <select className="w-full p-2 border border-alignpoint-gray-200 rounded-md">
                <option>Pacific Time (PT)</option>
                <option>Mountain Time (MT)</option>
                <option>Central Time (CT)</option>
                <option>Eastern Time (ET)</option>
              </select>
            </div>
            <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white mt-4">
              Save Changes
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "general",
      title: "General Settings",
      icon: "⚙️",
      description: "Configure basic application settings and preferences",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Theme Preferences</h3>
              <p className="text-sm text-alignpoint-gray-500">Choose your preferred theme</p>
            </div>
            <select className="border border-alignpoint-gray-200 rounded-md p-2">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Language</h3>
              <p className="text-sm text-alignpoint-gray-500">Select your preferred language</p>
            </div>
            <select className="border border-alignpoint-gray-200 rounded-md p-2">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      title: "Notification Settings",
      icon: "🔔",
      description: "Manage your notification preferences",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Email Notifications</h3>
              <p className="text-sm text-alignpoint-gray-500">Receive notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-alignpoint-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-alignpoint-red"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Push Notifications</h3>
              <p className="text-sm text-alignpoint-gray-500">Receive push notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-alignpoint-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-alignpoint-red"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security Settings",
      icon: "🔒",
      description: "Manage your security preferences",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-alignpoint-black">Change Password</h3>
            <div className="space-y-2">
              <input type="password" placeholder="Current Password" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              <input type="password" placeholder="New Password" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              <input type="password" placeholder="Confirm New Password" className="w-full p-2 border border-alignpoint-gray-200 rounded-md" />
              <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white">Update Password</Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Two-Factor Authentication</h3>
              <p className="text-sm text-alignpoint-gray-500">Enable 2FA for additional security</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-alignpoint-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-alignpoint-red"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "time-tracking",
      title: "Time Tracking Settings",
      icon: "⏱️",
      description: "Configure time tracking preferences",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Default Work Hours</h3>
              <p className="text-sm text-alignpoint-gray-500">Set your default working hours</p>
            </div>
            <input type="number" min="1" max="24" defaultValue="8" className="w-20 p-2 border border-alignpoint-gray-200 rounded-md" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Auto-pause Timer</h3>
              <p className="text-sm text-alignpoint-gray-500">Pause timer after inactivity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-alignpoint-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-alignpoint-red"></div>
            </label>
          </div>
        </div>
      ),
    },
    {
      id: "system",
      title: "System Settings",
      icon: "🖥️",
      description: "Configure system-wide settings",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Auto-save Interval</h3>
              <p className="text-sm text-alignpoint-gray-500">Set how often changes are saved</p>
            </div>
            <select className="border border-alignpoint-gray-200 rounded-md p-2">
              <option>30 seconds</option>
              <option>1 minute</option>
              <option>5 minutes</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-alignpoint-black">Data Retention</h3>
              <p className="text-sm text-alignpoint-gray-500">Configure data retention period</p>
            </div>
            <select className="border border-alignpoint-gray-200 rounded-md p-2">
              <option>30 days</option>
              <option>60 days</option>
              <option>90 days</option>
            </select>
          </div>
        </div>
      ),
    },
    {
      id: "users",
      title: "User Management",
      icon: "👥",
      description: "Manage user accounts and permissions",
      content: (
        <div className="flex gap-6">
          {/* Role Navigation */}
          <div className="w-48 space-y-1">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-alignpoint-black">User Roles</h3>
              <Button 
                className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
                size="sm"
                onClick={() => setShowAddUserModal(true)}
              >
                Add User
              </Button>
            </div>
            {["all", "admin", "project_manager", "developer", "designer", "tester"].map((role) => {
              const count = role === "all" ? users.length : users.filter(u => u.role === role).length;
              return (
                <button
                  key={role}
                  onClick={() => setActiveSection(`users-${role}`)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === `users-${role}` || (role === "all" && activeSection === "users")
                      ? "bg-alignpoint-red/10 text-alignpoint-red border border-alignpoint-red/20"
                      : "text-alignpoint-gray-600 hover:bg-alignpoint-gray-50 hover:text-alignpoint-black"
                  }`}
                >
                  <span className="capitalize">{role === "all" ? "All Users" : `${role.replace("_", " ")}s`}</span>
                  <span className="text-sm bg-alignpoint-gray-100 px-2 py-0.5 rounded-full">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Users List */}
          <div className="flex-1">
            <div className="space-y-4">
              {(activeSection === "users" || activeSection === "users-all" 
                ? users 
                : users.filter(user => `users-${user.role}` === activeSection)
              ).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-alignpoint-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-alignpoint-gray-100 flex items-center justify-center font-medium text-alignpoint-gray-700">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-alignpoint-black">{user.name}</p>
                      <p className="text-sm text-alignpoint-gray-500">{user.email}</p>
                      <p className="text-xs text-alignpoint-gray-400 capitalize">{user.role.replace("_", " ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-alignpoint-gray-500 hover:text-alignpoint-red"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-alignpoint-gray-500 hover:text-alignpoint-red"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "information",
      title: "System Information",
      icon: "ℹ️",
      description: "View system information and details",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-alignpoint-black">Version</p>
              <p className="text-alignpoint-gray-500">1.0.0</p>
            </div>
            <div>
              <p className="font-medium text-alignpoint-black">Last Updated</p>
              <p className="text-alignpoint-gray-500">July 25, 2025</p>
            </div>
            <div>
              <p className="font-medium text-alignpoint-black">Environment</p>
              <p className="text-alignpoint-gray-500">Production</p>
            </div>
            <div>
              <p className="font-medium text-alignpoint-black">Support</p>
              <p className="text-alignpoint-gray-500">support@alignpoint.com</p>
            </div>
          </div>
          <Button className="bg-alignpoint-red hover:bg-alignpoint-red/90 text-white w-full">
            Check for Updates
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <section className="max-w-4xl mx-auto py-6">
        <div className="flex gap-6">
          <div className="w-64 space-y-1">
            {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? "bg-alignpoint-red/10 text-alignpoint-red border border-alignpoint-red/20"
                  : "text-alignpoint-gray-600 hover:bg-alignpoint-gray-50 hover:text-alignpoint-black"
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </div>
        <div className="flex-1">
          {settingsSections.map((section) => (
            section.id === activeSection && (
              <Card key={section.id} className="border border-alignpoint-gray-200">
                <CardHeader>
                  <CardTitle className="text-alignpoint-black flex items-center space-x-2">
                    <span>{section.icon}</span>
                    <span>{section.title}</span>
                  </CardTitle>
                  <p className="text-sm text-alignpoint-gray-500">{section.description}</p>
                </CardHeader>
                <CardContent>
                  {section.content}
                </CardContent>
              </Card>
            )
          ))}
        </div>
      </div>
    </section>

    {/* Add User Modal */}
    <UserModal
      isOpen={showAddUserModal}
      onClose={() => setShowAddUserModal(false)}
      onSubmit={handleAddUser}
    />

    {/* Edit User Modal */}
    {selectedUser ? (
      <UserModal
        isOpen={showEditUserModal}
        onClose={() => setShowEditUserModal(false)}
        onSubmit={(userData) => selectedUser && handleEditUser(selectedUser.id, userData)}
        initialData={{
          name: selectedUser?.name || "",
          email: selectedUser?.email || "",
          role: selectedUser?.role || ""
        }}
      />
    ) : null}
    </>
  )
}

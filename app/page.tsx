"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlignpointLogo } from "@/components/alignpoint-logo"
import AdminDashboard from "@/components/admin-dashboard"
import TeamMemberDashboard from "@/components/team-member-dashboard"
import ClientDashboard from "@/components/client-dashboard"

type UserRole = "admin" | "project_manager" | "designer" | "developer" | "tester" | "client" | null

interface UserSession {
  email: string
  name: string
  role: UserRole
  avatar: string
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [error, setError] = useState("")

  const handleLogin = () => {
    setError("")
    
    // Demo authentication logic based on email domains and names
    let session: UserSession | null = null
    
    // Admin users
    if (email.includes("alex") || email.includes("admin")) {
      session = {
        email,
        name: "Alex Admin",
        role: "admin",
        avatar: "A"
      }
    }
    // Project Manager
    else if (email.includes("priya") || email.includes("manager")) {
      session = {
        email,
        name: "Priya Manager",
        role: "project_manager",
        avatar: "P"
      }
    }
    // Designer
    else if (email.includes("sarah") || email.includes("designer")) {
      session = {
        email,
        name: "Sarah Designer", 
        role: "designer",
        avatar: "S"
      }
    }
    // Developer
    else if (email.includes("ben") || email.includes("developer")) {
      session = {
        email,
        name: "Ben Developer",
        role: "developer", 
        avatar: "B"
      }
    }
    // Tester
    else if (email.includes("tanya") || email.includes("tester")) {
      session = {
        email,
        name: "Tanya Tester",
        role: "tester",
        avatar: "T"
      }
    }
    // Client
    else if (email.includes("catherine") || email.includes("client")) {
      session = {
        email,
        name: "Catherine Client",
        role: "client",
        avatar: "C"
      }
    }
    else {
      setError("Invalid email or password")
      return
    }

    // Validate password (simple check for demo)
    if (!password) {
      setError("Invalid email or password")
      return
    }

    setUserSession(session)
  }

  // Role-based dashboard routing
  if (userSession) {
    switch (userSession.role) {
      case "admin":
        return <AdminDashboard userSession={userSession} />
      case "project_manager":
      case "designer": 
      case "developer":
      case "tester":
        return <TeamMemberDashboard userSession={userSession} />
      case "client":
        return <ClientDashboard userSession={userSession} />
      default:
        return <div>Unknown user role</div>
    }
  }

  return (
    <div className="min-h-screen bg-alignpoint-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-alignpoint-gray-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <AlignpointLogo size="lg" showText={false} />
          </div>
          <CardTitle className="text-2xl font-bold text-alignpoint-black">Welcome to Alignpoint</CardTitle>
          <CardDescription className="text-alignpoint-gray-600">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-alignpoint-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-alignpoint-gray-700 font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-alignpoint-gray-300 focus:border-alignpoint-red focus:ring-alignpoint-red"
            />
          </div>
          
          {error && (
            <div className="text-alignpoint-red text-sm font-medium">
              {error}
            </div>
          )}
          
          <Button 
            onClick={handleLogin} 
            className="w-full bg-alignpoint-red hover:bg-alignpoint-red/90 text-white"
            disabled={!email || !password}
          >
            Sign In
          </Button>
          
          <div className="text-sm text-alignpoint-gray-600 text-center mt-6">
            <p className="mb-3 font-semibold">Demo accounts:</p>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-alignpoint-black">Admin:</p>
                  <p>alex@alignpoint.com</p>
                </div>
                <div>
                  <p className="font-medium text-alignpoint-black">Project Manager:</p>
                  <p>priya@alignpoint.com</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-alignpoint-black">Designer:</p>
                  <p>sarah@alignpoint.com</p>
                </div>
                <div>
                  <p className="font-medium text-alignpoint-black">Developer:</p>
                  <p>ben@alignpoint.com</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-alignpoint-black">Tester:</p>
                  <p>tanya@alignpoint.com</p>
                </div>
                <div>
                  <p className="font-medium text-alignpoint-black">Client:</p>
                  <p>catherine@acmecorp.com</p>
                </div>
              </div>
              <p className="text-alignpoint-gray-500 mt-2">Use any password</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

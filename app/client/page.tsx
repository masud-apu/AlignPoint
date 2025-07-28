"use client"

import ClientDashboard from "@/components/client-dashboard"

// Define UserSession interface locally for now
interface UserSession {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
  // Add other properties as needed
}

export default function ClientPage() {
  // You'll need to provide actual user session data
  const userSession: UserSession = {
    id: "1",
    email: "user@example.com",
    name: "User Name",
    role: "client",
    avatar: ""
    // Add the required properties based on your UserSession interface
  }
  
  return <ClientDashboard userSession={userSession} />
}

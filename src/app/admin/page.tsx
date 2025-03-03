"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "@/components/admin/dashboard"
import { useAuth } from "@/hooks/useAuth"

export default function AdminPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!user || user.role !== "admin") {
      // router.push("/")
    }
  }, [user, router])

  // if (!user || user.role !== "admin") {
  //   return null
  // }

  return <AdminDashboard />
}

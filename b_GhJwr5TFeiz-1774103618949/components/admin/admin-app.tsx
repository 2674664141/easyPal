"use client"

import { useState } from "react"
import { AdminSidebar, AdminHeader, AdminDashboard } from "./admin-dashboard"
import { AdminUsers } from "./admin-users"
import { AdminCounselors } from "./admin-counselors"
import { AdminContent } from "./admin-content"
import { AdminAnalytics } from "./admin-analytics"
import { cn } from "@/lib/utils"

export function AdminApp() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <AdminDashboard />
      case "users":
        return <AdminUsers />
      case "counselors":
        return <AdminCounselors />
      case "content":
        return <AdminContent />
      case "analytics":
        return <AdminAnalytics />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
      />
      <div className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "ml-16" : "ml-64"
      )}>
        <AdminHeader onToggleSidebar={handleToggleSidebar} />
        <main className="p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

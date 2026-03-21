"use client"

import { useState } from "react"
import { MobileHome } from "./mobile-home"
import { MobileChat } from "./mobile-chat"
import { MobileDiary } from "./mobile-diary"
import { MobileCommunity } from "./mobile-community"
import { MobileProfile } from "./mobile-profile"
import { MobileAssessment } from "./mobile-assessment"
import { MobileRelax } from "./mobile-relax"
import { MobileArticles } from "./mobile-articles"
import { MobileSOS } from "./mobile-sos"

export function MobileApp() {
  const [currentPage, setCurrentPage] = useState("home")

  const handleNavigate = (page: string) => {
    setCurrentPage(page)
  }

  const handleBack = () => {
    setCurrentPage("home")
  }

  return (
    <div className="max-w-[390px] mx-auto bg-background min-h-screen shadow-2xl overflow-hidden">
      {currentPage === "home" && <MobileHome onNavigate={handleNavigate} />}
      {currentPage === "chat" && <MobileChat onBack={handleBack} />}
      {currentPage === "diary" && <MobileDiary onBack={handleBack} />}
      {currentPage === "community" && <MobileCommunity onBack={handleBack} />}
      {currentPage === "profile" && <MobileProfile onBack={handleBack} />}
      {currentPage === "assessment" && <MobileAssessment onBack={handleBack} />}
      {currentPage === "relax" && <MobileRelax onBack={handleBack} />}
      {currentPage === "articles" && <MobileArticles onBack={handleBack} />}
      {currentPage === "sos" && <MobileSOS onBack={handleBack} />}
    </div>
  )
}

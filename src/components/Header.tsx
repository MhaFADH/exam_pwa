"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

const Header = () => {
  const router = useRouter()

  const handleBack = () => router.back()

  return (
    <header className="p-4">
      <Button size="icon" variant="outline" onClick={handleBack}>
        <ChevronLeft />
      </Button>
    </header>
  )
}

export default Header

"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const Header = () => {
  const router = useRouter()

  const handleBack = () => router.back()

  return (
    <header className="p-4 items-center flex justify-between">
      <Button size="icon" variant="outline" onClick={handleBack}>
        <ChevronLeft />
      </Button>

      <Button variant="outline" asChild>
        <Link href="/create">Add Job</Link>
      </Button>
    </header>
  )
}

export default Header

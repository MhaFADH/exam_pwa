"use client"

import JobBoardDetails from "@/components/JobBoardDetails"
import { useParams } from "next/navigation"

export default function JobDetail() {
  const { jobId } = useParams<{ jobId: string }>()

  return (
    <div className="flex items-center justify-center grow">
      <JobBoardDetails jobId={jobId} />
    </div>
  )
}

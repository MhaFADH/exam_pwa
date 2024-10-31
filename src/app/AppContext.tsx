"use client"
import { createContext, useState, useContext, ReactNode } from "react"
import { JobBoardProps } from "@/components/JobBoard"

type AppContextType = {
  jobs: JobBoardProps[]
  setJobs: (jobs: JobBoardProps[]) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<JobBoardProps[]>([])

  return (
    <AppContext.Provider value={{ jobs, setJobs }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider")
  }
  return context
}

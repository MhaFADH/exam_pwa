"use client"
import { Job } from "@/types"
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/\s/g, "")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

type AppContextType = {
  jobs: Job[]
  setJobs: (jobs: Job[]) => void
  getJob: (jobId: string) => Job | undefined
  createJob: (job: Job) => void
}

const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<Job[]>([])

  const getJob = useCallback(
    (jobId: string) => jobs.find((job) => job.id === jobId),
    [jobs],
  )

  const createJob = useCallback(
    (job: Job) => setJobs((prevJobs) => [...prevJobs, job]),
    [setJobs],
  )

  useEffect(() => {
    const getJobs = async () => {
      const { data } = await axios.get<{ result: Job[] }>("/job")

      setJobs(data.result)
    }

    getJobs()
  }, [setJobs])

  const subscribeToPush = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        ),
      })

      await axios.post("/subscribe", { sub: sub.toJSON() })
    } catch (error) {
      console.error(error)
    }

    //await subscribeUser(sub.toJSON())
  }

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
      updateViaCache: "none",
    })
    const sub = await registration.pushManager.getSubscription()

    if (sub) {
      await axios.post("/subscribe", { sub: sub.toJSON() })
    }
  }

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      registerServiceWorker()
    }
  }, [])

  useEffect(() => {
    subscribeToPush()
  }, [])

  return (
    <AppContext.Provider value={{ jobs, setJobs, getJob, createJob }}>
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

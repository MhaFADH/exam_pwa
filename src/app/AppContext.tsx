"use client"
import { items } from "@/components/SelectFrameworks"
import { Job } from "@/types"
import { faker } from "@faker-js/faker/locale/fr"
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
  console.log(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .replace(/\s/g, "")

  console.log(base64)

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
    setJobs((prevJobs) => {
      if (prevJobs.length > 0) {
        return prevJobs
      }

      const jobOffers = Array.from({ length: 6 }, () => ({
        id: faker.string.uuid(),
        title: faker.person.jobTitle(),
        company: faker.company.name(),
        location: `${faker.location.streetAddress()}, ${faker.location.country()} (${faker.helpers.arrayElement(["Télétravail", "Hybride", "Présentiel"])})`,
        salary: faker.number.int({ min: 30000, max: 100000 }),
        startDate: faker.date.soon(),
        description: faker.lorem.sentences(2),
        skills: faker.helpers.arrayElements(
          items.map(({ label }) => label),
          2,
        ),
      })) as unknown as Job[]

      return jobOffers
    })
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

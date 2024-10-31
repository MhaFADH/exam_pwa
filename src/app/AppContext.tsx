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

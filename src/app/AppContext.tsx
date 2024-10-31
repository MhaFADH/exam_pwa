"use client"
import { JobBoardProps } from "@/components/JobBoard"
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
  jobs: JobBoardProps[]
  setJobs: (jobs: JobBoardProps[]) => void
  getJob: (jobId: string) => JobBoardProps | undefined
}

const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobs] = useState<JobBoardProps[]>([])

  const getJob = useCallback(
    (jobId: string) => jobs.find((job) => job.id === jobId),
    [jobs],
  )

  useEffect(() => {
    setJobs((prevJobs) => {
      if (prevJobs.length > 0) {
        return prevJobs
      }

      const jobOffers = Array.from({ length: 6 }, () => ({
        id: faker.string.uuid(),
        title: faker.word.words({ count: { min: 4, max: 10 } }),
        company: faker.company.name(),
        location: `${faker.location.streetAddress()}, ${faker.location.country()} (${faker.helpers.arrayElement(["Télétravail", "Hybride", "Présentiel"])})`,
        salary: `${faker.number.int({ min: 30000, max: 70000 })} € - ${faker.number.int({ min: 70000, max: 100000 })} € par an`,
        startDate: faker.date.soon().toLocaleDateString("fr-FR"),
        description: faker.lorem.sentences(2),
        skills: faker.helpers.arrayElements(
          [
            "React",
            "Node.js",
            "TypeScript",
            "MongoDB",
            "Docker",
            "GraphQL",
            "Next.js",
          ],
          4,
        ),
      }))

      return jobOffers
    })
  }, [setJobs])

  return (
    <AppContext.Provider value={{ jobs, setJobs, getJob }}>
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

"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { faker } from "@faker-js/faker"
import JobBoardDetails from "@/components/JobBoardDetails"

export default function JobDetail() {
  const { jobId } = useParams()
  const [jobOffer, setJobOffer] = useState(null)

  useEffect(() => {
    if (jobId) {
      const offer = {
        id: jobId,
        title: faker.name.jobTitle(),
        company: faker.company.name(),
        location: `${faker.address.city()}, ${faker.address.country()} (${faker.helpers.arrayElement(["Télétravail", "Hybride", "Présentiel"])})`,
        salary: `${faker.number.int({ min: 30000, max: 70000 })} € - ${faker.number.int({ min: 70000, max: 100000 })} € par an`,
        startDate: faker.date.soon().toLocaleDateString("fr-FR"),
        description: faker.lorem.sentences(4),
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
      }
      setJobOffer(offer)
    }
  }, [jobId])

  if (!jobOffer) {
    return <div>Loading...</div>
  }

  return <JobBoardDetails jobOffer={jobOffer} />
}

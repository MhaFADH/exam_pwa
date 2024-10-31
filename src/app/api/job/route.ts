import { items } from "@/statics"
import { Job } from "@/types"
import { faker } from "@faker-js/faker/locale/fr"
import fs from "fs"
import { NextRequest, NextResponse } from "next/server"

export const GET = () => {
  const jobs = fs.readFileSync("jobs.json", "utf-8")

  if (jobs.length === 0) {
    const newJobs = Array.from({ length: 6 }, () => ({
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

    fs.writeFileSync("jobs.json", JSON.stringify(newJobs))

    return NextResponse.json({ result: newJobs })
  }

  return NextResponse.json({ result: JSON.parse(jobs) })
}

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as Job

  const jobs = fs.readFileSync("jobs.json", "utf-8")

  const newJob = {
    ...body,
    id: faker.string.uuid(),
  }

  const newJobs = [...JSON.parse(jobs), newJob]

  fs.writeFileSync("jobs.json", JSON.stringify(newJobs))

  return NextResponse.json({ result: newJob })
}

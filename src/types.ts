import { skillSchema } from "@/schemas"
import { z } from "zod"

export type Skill = z.infer<typeof skillSchema>

export type Job = {
  title: string
  company: string
  location: string
  salary: number
  startDate: string
  description: string
  skills: Skill[]
  id: string
}

import { z } from "zod"

export const skillSchema = z.enum([
  "React",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "Docker",
  "GraphQL",
  "Next.js",
])

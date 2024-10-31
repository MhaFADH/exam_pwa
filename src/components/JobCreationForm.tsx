"use client"

import DateInput from "@/components/DateInput"
import InputField from "@/components/InputField"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  salary: z.coerce.number().min(1),
  startDate: z.date(),
  description: z.string().min(1),
  skills: z.string().min(1),
})

const JobCreationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: 0,
      description: "",
      skills: "",
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  console.log(form.formState.errors)

  return (
    <Card className="max-w-[600px] w-full h-fit">
      <CardHeader>
        <CardTitle>Create New Job Listing</CardTitle>
        <CardDescription>
          Fill in the details for the new job position.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <InputField control={form.control} name="title" label="Job Title" />
            <InputField control={form.control} name="company" label="Company" />
            <InputField
              control={form.control}
              name="location"
              label="Location"
            />
            <InputField
              control={form.control}
              name="salary"
              label="Salary"
              type="number"
            />
            <DateInput name="startDate" label="Date" form={form} />

            <InputField
              control={form.control}
              name="description"
              label="Job Description"
            />
            <InputField control={form.control} name="skills" label="Skills" />

            <Button className="" type="submit">
              Create Job Listing
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default JobCreationForm

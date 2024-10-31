"use client"

import { useAppContext } from "@/app/AppContext"
import CustomInput from "@/components/CustomInput"
import DateInput from "@/components/DateInput"
import InputField from "@/components/InputField"
import SelectFrameworks from "@/components/SelectFrameworks"
import SubscribeButton from "@/components/SubscribeButton"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { skillSchema } from "@/schemas"
import { faker } from "@faker-js/faker/locale/fr"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

const formSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  salary: z.coerce.number().min(1),
  startDate: z.date(),
  description: z.string().min(1),
  skills: z.array(skillSchema),
})

const JobCreationForm = () => {
  const { createJob } = useAppContext()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: 0,
      description: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/job", data)

      createJob({
        id: faker.string.uuid(),
        ...data,
        startDate: data.startDate.toString(),
      })
      toast("Création réussie de l'offre d'emploi")
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Card className="max-w-[600px] w-full h-fit">
      <CardHeader>
        <CardTitle>Créer une nouvelle liste d&apos;emplois</CardTitle>
        <CardDescription>
          Complétez les détails du nouveau poste.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <InputField
              control={form.control}
              name="title"
              label="Titre du job"
            />
            <InputField
              control={form.control}
              name="company"
              label="Entreprise"
            />
            <InputField
              control={form.control}
              name="location"
              label="Localisation"
            />
            <InputField
              control={form.control}
              name="salary"
              label="Salaire"
              type="number"
            />
            <DateInput name="startDate" label="Date" form={form} />

            <InputField
              control={form.control}
              name="description"
              label="Description du job"
            />
            <CustomInput form={form} name="skills" label="Compétences">
              <SelectFrameworks
                onItemsChange={(items) => {
                  const labels = items.map((item) => item.label)

                  form.setValue("skills", labels)
                  form.clearErrors("skills")
                }}
              />
            </CustomInput>
            <SubscribeButton
              title="Nouveau job"
              message="Créer avec success"
              className=""
              type="submit"
            >
              Création d&apos;un job
            </SubscribeButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default JobCreationForm

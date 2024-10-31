"use client"
import { useAppContext } from "@/app/AppContext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Job } from "@/types"
import { Briefcase, Calendar, DollarSign, MapPin } from "lucide-react"
import Link from "next/link"

type JobBoardProps = Job

const JobBoard = ({
  title,
  company,
  location,
  salary,
  startDate,
  description,
  skills,
  id,
}: JobBoardProps) => {
  return (
    <Card className="w-full max-w-md flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-lg">{company}</CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm">
            CDI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 grow">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <DollarSign size={16} />
          <span>{salary}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar size={16} />
          <span>Date de début : {startDate.toLocaleDateString("fr-FR")}</span>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Description du poste :</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {skills.map((skill, index) => (
            <Badge variant="outline" key={index}>
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" className="flex items-center" asChild>
          <Link href={`/${id}`}>
            <Briefcase className="mr-2 h-4 w-4" />
            Voir plus
          </Link>
        </Button>
        <Button className="flex-1 ml-4">Postuler maintenant</Button>
      </CardFooter>
    </Card>
  )
}

export default function JobBoardOffers() {
  const { jobs } = useAppContext()

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {jobs.map((offer) => (
        <JobBoard key={offer.id} {...offer} />
      ))}
    </div>
  )
}

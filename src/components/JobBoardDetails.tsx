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
import {
  Building,
  Calendar,
  Clock,
  DollarSign,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react"

type Props = {
  jobId: string
}

const JobBoardDetails = ({ jobId }: Props) => {
  const { getJob } = useAppContext()
  const job = getJob(jobId)

  if (!job) {
    return <p>Aucune offre d&apos;emploi sélectionnée.</p>
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
            <CardDescription className="text-xl mt-2">
              {job.company}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-lg">
            CDI
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-sm">
            <MapPin size={18} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <DollarSign size={18} />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar size={18} />
            <span>
              Date de début : {job.startDate.toLocaleDateString("fr-FR")}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Clock size={18} />
            <span>Temps plein, 39h/semaine</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <GraduationCap size={18} />
            <span>Bac+5 en Informatique ou équivalent</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users size={18} />
            <span>Équipe de 10-15 personnes</span>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Description du poste :</h3>
          <p className="text-sm text-muted-foreground">{job.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Responsabilités :</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>
              Développer et maintenir des applications web full stack
              performantes et évolutives
            </li>
            <li>
              Collaborer étroitement avec l&apos;équipe de design pour
              implémenter des interfaces utilisateur intuitives et réactives
            </li>
            <li>
              Optimiser les performances des applications et assurer leur
              scalabilité
            </li>
            <li>
              Participer activement aux revues de code et au mentorat des
              développeurs juniors
            </li>
            <li>
              Contribuer à l&apos;architecture technique et aux choix
              technologiques des projets
            </li>
            <li>
              Assurer la qualité du code à travers des tests unitaires et
              d&apos;intégration
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Qualifications requises :
          </h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>3+ ans d&apos;expérience en développement web full stack</li>
            <li>Maîtrise de React, Node.js, et TypeScript</li>
            <li>
              Expérience solide avec les bases de données NoSQL (MongoDB) et SQL
            </li>
            <li>
              Connaissance approfondie des principes de CI/CD et des outils
              associés
            </li>
            <li>
              Expérience avec les architectures microservices et les conteneurs
              (Docker)
            </li>
            <li>
              Bonne compréhension des principes de sécurité web et des
              meilleures pratiques
            </li>
            <li>
              Capacité à travailler de manière autonome et en équipe dans un
              environnement agile
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Compétences techniques :
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {job.skills.map((skill, index) => (
              <Badge variant="outline" key={index}>
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Avantages :</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>
              Salaire compétitif avec bonus annuel basé sur les performances
            </li>
            <li>5 semaines de congés payés + RTT</li>
            <li>Mutuelle d&apos;entreprise de qualité</li>
            <li>Plan d&apos;épargne entreprise (PEE) avec abondement</li>
            <li>Formation continue et conférences</li>
            <li>
              Environnement de travail moderne et flexible (2 jours de
              télétravail par semaine)
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <Building className="size-24" />
          <span className="text-sm">
            À propos de {job.company}: Leader dans le développement de solutions
            SaaS innovantes, nous sommes une entreprise en pleine croissance,
            offrant un environnement de travail stimulant et des opportunités
            d&apos;évolution passionnantes.
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="w-full sm:w-auto">Postuler maintenant</Button>
      </CardFooter>
    </Card>
  )
}

export default JobBoardDetails

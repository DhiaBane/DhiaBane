import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Clock, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "À propos de RestauPilot",
  description:
    "Découvrez l'histoire, la mission et l'équipe derrière RestauPilot, la plateforme de gestion de restaurants tout-en-un.",
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">À propos de RestauPilot</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  RestauPilot est une plateforme complète de gestion de restaurants conçue pour simplifier les
                  opérations quotidiennes, optimiser les processus et améliorer l'expérience client dans le secteur de
                  la restauration.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Image d'équipe RestauPilot"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Notre Mission</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nous aidons les restaurateurs à se concentrer sur ce qu'ils font de mieux : créer des expériences
                  culinaires exceptionnelles.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Clock className="h-8 w-8 text-primary" />
                  <CardTitle>Efficacité</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Automatisez les tâches répétitives et optimisez vos processus pour gagner du temps et réduire les
                    erreurs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle>Expérience client</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Offrez un service exceptionnel grâce à des outils de gestion des réservations, de fidélisation et de
                    feedback.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle>Croissance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Prenez des décisions éclairées grâce à des analyses détaillées et des insights basés sur l'IA.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Notre Histoire</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Fondée en 2023, RestauPilot est née de la passion pour la gastronomie et la technologie.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-8 mt-12">
              <p className="text-muted-foreground">
                Tout a commencé lorsque notre fondateur, un ancien restaurateur, a constaté les défis quotidiens
                auxquels sont confrontés les établissements de restauration. De la gestion des stocks à la coordination
                du personnel, en passant par l'optimisation des réservations et la fidélisation des clients, les
                restaurateurs jonglent avec de nombreuses responsabilités.
              </p>
              <p className="text-muted-foreground">
                C'est ainsi qu'est née l'idée de RestauPilot : une plateforme tout-en-un qui centralise et simplifie
                l'ensemble des opérations d'un restaurant. Notre équipe de développeurs, designers et experts en
                restauration a travaillé en étroite collaboration avec des restaurateurs pour créer une solution qui
                répond véritablement à leurs besoins.
              </p>
              <p className="text-muted-foreground">
                Aujourd'hui, RestauPilot aide des centaines d'établissements à travers le monde à optimiser leurs
                opérations, à améliorer l'expérience client et à développer leur activité.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Rejoignez-nous</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Prêt à transformer la gestion de votre restaurant ?
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/demo">
                  <Button size="lg">
                    Essayer la démo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Users, BookOpen, Award, CheckCircle2, Play } from "lucide-react"
import coursesData from "@/data/courses.json"
import { EnrollButton } from "@/components/enroll-button"

export default async function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = coursesData.find((c) => c.id === id)

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Curso no encontrado</h1>
          <Button asChild>
            <Link href="/cursos">Volver a cursos</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge>{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
                <Badge variant="outline">
                  <Award className="mr-1 h-3 w-3" />
                  Certificado NFT
                </Badge>
              </div>
              <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">{course.title}</h1>
              <p className="mb-6 text-lg text-muted-foreground">{course.description}</p>
              <div className="mb-6 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-primary text-primary" />
                    <span className="text-lg font-semibold">{course.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({course.reviews} valoraciones)</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  {course.students.toLocaleString()} estudiantes
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={course.instructorAvatar || "/placeholder.svg"}
                  alt={course.instructor}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <div className="text-sm text-muted-foreground">Instructor</div>
                  <div className="font-semibold">{course.instructor}</div>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button size="lg" variant="secondary" className="gap-2">
                      <Play className="h-5 w-5" />
                      Vista Previa
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="mb-2 text-3xl font-bold">
                      {course.price} {course.currency}
                    </div>
                    <div className="text-muted-foreground">${course.priceUSD} USD</div>
                  </div>
                  <EnrollButton courseId={course.id} />
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duración</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Lecciones</span>
                      <span className="font-medium">{course.lessons}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Idioma</span>
                      <span className="font-medium">{course.language}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Certificado</span>
                      <span className="font-medium">NFT Verificable</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="px-6 py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* What You'll Learn */}
          <section>
            <h2 className="mb-6 text-3xl font-bold">Lo que aprenderás</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {course.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          {/* Course Content */}
          <section>
            <h2 className="mb-6 text-3xl font-bold">Contenido del curso</h2>
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>{course.lessons} lecciones</span>
                  <span>{course.duration} de contenido</span>
                </div>
                <div className="space-y-2">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {index + 1}
                        </div>
                        <span className="font-medium">{topic}</span>
                      </div>
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* Requirements */}
          <section>
            <h2 className="mb-6 text-3xl font-bold">Requisitos</h2>
            <ul className="space-y-2">
              {course.requirements.map((req, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-muted-foreground">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          {/* Instructor */}
          <section>
            <h2 className="mb-6 text-3xl font-bold">Sobre el instructor</h2>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={course.instructorAvatar || "/placeholder.svg"}
                    alt={course.instructor}
                    className="h-20 w-20 rounded-full"
                  />
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">{course.instructor}</h3>
                    <p className="mb-4 text-muted-foreground">
                      Experto en {course.category} con años de experiencia en la industria blockchain. Ha ayudado a
                      miles de estudiantes a dominar las tecnologías Web3.
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <div className="font-semibold">{course.students.toLocaleString()}</div>
                        <div className="text-muted-foreground">Estudiantes</div>
                      </div>
                      <div>
                        <div className="font-semibold">{course.rating}</div>
                        <div className="text-muted-foreground">Valoración</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, BookOpen, Users, DollarSign, TrendingUp, Edit, Trash2 } from "lucide-react"

export default function MyCoursesPage() {
  const [myCourses] = useState([
    {
      id: "my-1",
      title: "Desarrollo de DApps con React",
      status: "Publicado",
      students: 45,
      revenue: "2.25",
      rating: 4.7,
      reviews: 12,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "my-2",
      title: "Smart Contracts Avanzados",
      status: "En Revisión",
      students: 0,
      revenue: "0",
      rating: 0,
      reviews: 0,
      image: "/placeholder.svg?height=200&width=300",
    },
  ])

  const totalRevenue = myCourses.reduce((sum, course) => sum + Number.parseFloat(course.revenue), 0)
  const totalStudents = myCourses.reduce((sum, course) => sum + course.students, 0)

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Mis Cursos</h1>
            <p className="text-lg text-muted-foreground">Gestiona tus cursos y revisa tus estadísticas</p>
          </div>
          <Button asChild size="lg">
            <Link href="/subir-curso">
              <Plus className="mr-2 h-5 w-5" />
              Nuevo Curso
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{myCourses.length}</div>
                  <div className="text-sm text-muted-foreground">Cursos Totales</div>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <div className="text-sm text-muted-foreground">Estudiantes</div>
                </div>
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} ETH</div>
                  <div className="text-sm text-muted-foreground">Ingresos Totales</div>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">+24%</div>
                  <div className="text-sm text-muted-foreground">Crecimiento</div>
                </div>
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses List */}
        <Tabs defaultValue="todos" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="publicados">Publicados</TabsTrigger>
            <TabsTrigger value="revision">En Revisión</TabsTrigger>
            <TabsTrigger value="borradores">Borradores</TabsTrigger>
          </TabsList>

          <TabsContent value="todos">
            <div className="space-y-4">
              {myCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="h-32 w-48 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="mb-2 flex items-start justify-between">
                          <div>
                            <h3 className="mb-2 text-xl font-semibold">{course.title}</h3>
                            <Badge variant={course.status === "Publicado" ? "default" : "secondary"}>
                              {course.status}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                        <div className="mt-auto grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Estudiantes</div>
                            <div className="text-lg font-semibold">{course.students}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Ingresos</div>
                            <div className="text-lg font-semibold">{course.revenue} ETH</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Valoración</div>
                            <div className="text-lg font-semibold">
                              {course.rating > 0 ? `${course.rating} ⭐` : "Sin valoraciones"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="publicados">
            <div className="space-y-4">
              {myCourses
                .filter((c) => c.status === "Publicado")
                .map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="h-32 w-48 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-semibold">{course.title}</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Estudiantes</div>
                              <div className="text-lg font-semibold">{course.students}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Ingresos</div>
                              <div className="text-lg font-semibold">{course.revenue} ETH</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Valoración</div>
                              <div className="text-lg font-semibold">{course.rating} ⭐</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="revision">
            <div className="space-y-4">
              {myCourses
                .filter((c) => c.status === "En Revisión")
                .map((course) => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <img
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          className="h-32 w-48 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="mb-2 text-xl font-semibold">{course.title}</h3>
                          <Badge variant="secondary">{course.status}</Badge>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Tu curso está siendo revisado por nuestro equipo. Te notificaremos cuando esté aprobado.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="borradores">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <BookOpen className="mb-4 h-16 w-16 text-muted-foreground" />
                <h3 className="mb-2 text-xl font-semibold">No tienes borradores</h3>
                <p className="mb-6 text-center text-muted-foreground">
                  Los cursos que guardes como borrador aparecerán aquí
                </p>
                <Button asChild>
                  <Link href="/subir-curso">
                    <Plus className="mr-2 h-4 w-4" />
                    Crear Curso
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

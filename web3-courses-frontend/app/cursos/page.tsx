"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Clock, BookOpen } from "lucide-react"
import coursesData from "@/data/courses.json"

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const categories = ["Todos", "Blockchain", "Desarrollo", "NFTs", "DeFi", "Trading"]

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Todos" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Explora Nuestros Cursos</h1>
          <p className="text-lg text-muted-foreground">
            Descubre cursos de blockchain, Web3 y criptomonedas impartidos por expertos
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          {filteredCourses.length} {filteredCourses.length === 1 ? "curso encontrado" : "cursos encontrados"}
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link key={course.id} href={`/cursos/${course.id}`}>
              <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Badge className="absolute right-2 top-2">{course.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="outline">{course.level}</Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-muted-foreground">({course.reviews})</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold leading-tight group-hover:text-primary">{course.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {course.lessons} lecciones
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructorAvatar || "/placeholder.svg"}
                      alt={course.instructor}
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="text-sm font-medium">{course.instructor}</span>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {course.price} {course.currency}
                      </div>
                      <div className="text-sm text-muted-foreground">${course.priceUSD} USD</div>
                    </div>
                    <Button>Ver Curso</Button>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">No se encontraron cursos que coincidan con tu búsqueda</p>
          </div>
        )}
      </div>
    </div>
  )
}

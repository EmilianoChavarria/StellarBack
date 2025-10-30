"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Plus, X, DollarSign, Award, CheckCircle2 } from "lucide-react"

export default function UploadCoursePage() {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState("basico")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "Principiante",
    price: "",
    duration: "",
    language: "Español",
    image: null as File | null,
    topics: [] as string[],
    requirements: [] as string[],
    whatYouWillLearn: [] as string[],
  })

  const [newTopic, setNewTopic] = useState("")
  const [newRequirement, setNewRequirement] = useState("")
  const [newLearning, setNewLearning] = useState("")

  const categories = ["Blockchain", "Desarrollo", "NFTs", "DeFi", "Trading", "Web3"]
  const levels = ["Principiante", "Intermedio", "Avanzado"]

  const handleAddItem = (type: "topics" | "requirements" | "whatYouWillLearn", value: string, setter: Function) => {
    if (value.trim()) {
      setCourseData((prev) => ({
        ...prev,
        [type]: [...prev[type], value.trim()],
      }))
      setter("")
    }
  }

  const handleRemoveItem = (type: "topics" | "requirements" | "whatYouWillLearn", index: number) => {
    setCourseData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCourseData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    // Simulación de subida de curso
    setTimeout(() => {
      alert("¡Curso subido exitosamente! Será revisado por nuestro equipo.")
      router.push("/mis-cursos")
    }, 2000)
  }

  const isBasicComplete =
    courseData.title && courseData.description && courseData.category && courseData.level && courseData.image
  const isContentComplete = courseData.topics.length > 0 && courseData.whatYouWillLearn.length > 0
  const isPricingComplete = courseData.price && courseData.duration

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Subir Nuevo Curso</h1>
          <p className="text-lg text-muted-foreground">
            Comparte tu conocimiento con la comunidad y gana criptomonedas
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card className={isBasicComplete ? "border-primary" : ""}>
            <CardContent className="flex items-center gap-3 p-4">
              {isBasicComplete ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2" />
              )}
              <span className="font-medium">Información Básica</span>
            </CardContent>
          </Card>
          <Card className={isContentComplete ? "border-primary" : ""}>
            <CardContent className="flex items-center gap-3 p-4">
              {isContentComplete ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2" />
              )}
              <span className="font-medium">Contenido del Curso</span>
            </CardContent>
          </Card>
          <Card className={isPricingComplete ? "border-primary" : ""}>
            <CardContent className="flex items-center gap-3 p-4">
              {isPricingComplete ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <div className="h-5 w-5 rounded-full border-2" />
              )}
              <span className="font-medium">Precio y Duración</span>
            </CardContent>
          </Card>
        </div>

        {/* Form Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="basico">Básico</TabsTrigger>
            <TabsTrigger value="contenido">Contenido</TabsTrigger>
            <TabsTrigger value="precio">Precio</TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basico">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>Proporciona los detalles fundamentales de tu curso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del Curso *</Label>
                  <Input
                    id="title"
                    placeholder="Ej: Introducción a Blockchain"
                    value={courseData.title}
                    onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe de qué trata tu curso..."
                    rows={4}
                    value={courseData.description}
                    onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Categoría *</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Badge
                          key={cat}
                          variant={courseData.category === cat ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setCourseData({ ...courseData, category: cat })}
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Nivel *</Label>
                    <div className="flex flex-wrap gap-2">
                      {levels.map((level) => (
                        <Badge
                          key={level}
                          variant={courseData.level === level ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setCourseData({ ...courseData, level })}
                        >
                          {level}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Imagen del Curso *</Label>
                  <div className="flex items-center gap-4">
                    <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="flex-1" />
                    {courseData.image && (
                      <Badge variant="outline" className="gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {courseData.image.name}
                      </Badge>
                    )}
                  </div>
                </div>

                <Button onClick={() => setCurrentTab("contenido")} className="w-full">
                  Continuar al Contenido
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="contenido">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temas del Curso</CardTitle>
                  <CardDescription>Agrega los temas principales que cubrirás</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ej: Fundamentos de Blockchain"
                      value={newTopic}
                      onChange={(e) => setNewTopic(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddItem("topics", newTopic, setNewTopic)}
                    />
                    <Button onClick={() => handleAddItem("topics", newTopic, setNewTopic)} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {courseData.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="gap-2">
                        {topic}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveItem("topics", index)} />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Lo que Aprenderán</CardTitle>
                  <CardDescription>Describe los resultados de aprendizaje</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ej: Entender qué es blockchain"
                      value={newLearning}
                      onChange={(e) => setNewLearning(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddItem("whatYouWillLearn", newLearning, setNewLearning)
                      }
                    />
                    <Button onClick={() => handleAddItem("whatYouWillLearn", newLearning, setNewLearning)} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {courseData.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        <span className="flex-1">{item}</span>
                        <X
                          className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
                          onClick={() => handleRemoveItem("whatYouWillLearn", index)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Requisitos</CardTitle>
                  <CardDescription>¿Qué necesitan saber los estudiantes antes de empezar?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ej: Conocimientos básicos de informática"
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddItem("requirements", newRequirement, setNewRequirement)
                      }
                    />
                    <Button
                      onClick={() => handleAddItem("requirements", newRequirement, setNewRequirement)}
                      size="icon"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {courseData.requirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 rounded-lg border p-3">
                        <span className="flex-1">{req}</span>
                        <X
                          className="h-4 w-4 shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
                          onClick={() => handleRemoveItem("requirements", index)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => setCurrentTab("precio")} className="w-full">
                Continuar al Precio
              </Button>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="precio">
            <Card>
              <CardHeader>
                <CardTitle>Precio y Duración</CardTitle>
                <CardDescription>Establece el precio y duración de tu curso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Precio en ETH *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="0.05"
                        value={courseData.price}
                        onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Precio aproximado: ${(Number.parseFloat(courseData.price || "0") * 3000).toFixed(2)} USD
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duración Total *</Label>
                    <Input
                      id="duration"
                      placeholder="Ej: 8 horas"
                      value={courseData.duration}
                      onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                    />
                  </div>
                </div>

                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Beneficios del Instructor</h3>
                    </div>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        <span>Recibe el 85% de cada venta directamente en tu wallet</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        <span>Pagos instantáneos mediante smart contracts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        <span>Certificados NFT automáticos para tus estudiantes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                        <span>Sin intermediarios, control total de tu contenido</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <div className="rounded-lg border border-muted bg-muted/30 p-4">
                  <h3 className="mb-3 font-semibold">Resumen del Curso</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Título</span>
                      <span className="font-medium">{courseData.title || "Sin título"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categoría</span>
                      <span className="font-medium">{courseData.category || "Sin categoría"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nivel</span>
                      <span className="font-medium">{courseData.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temas</span>
                      <span className="font-medium">{courseData.topics.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Precio</span>
                      <span className="font-medium">{courseData.price || "0"} ETH</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!isBasicComplete || !isContentComplete || !isPricingComplete || isSubmitting}
                  size="lg"
                  className="w-full"
                >
                  {isSubmitting ? "Subiendo Curso..." : "Publicar Curso"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

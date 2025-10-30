"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import coursesData from "@/data/courses.json"
import { PaymentForm } from "@/components/payment-form"

export default async function PaymentPage({ params }: { params: Promise<{ id: string }> }) {
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
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href={`/cursos/${course.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al curso
          </Link>
        </Button>

        <h1 className="mb-8 text-3xl font-bold">Finalizar Compra</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <PaymentForm courseId={course.id} />

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold leading-tight">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Precio del curso</span>
                    <span className="font-medium">
                      {course.price} {course.currency}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gas estimado</span>
                    <span className="font-medium">0.002 ETH</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <span className="font-semibold">Total</span>
                  <div className="text-right">
                    <div className="text-xl font-bold">
                      {(Number.parseFloat(course.price) + 0.002).toFixed(3)} {course.currency}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ≈ ${(Number.parseFloat(course.priceUSD) + 6).toFixed(2)} USD
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>Acceso inmediato al curso</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>Certificado NFT al completar</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>Acceso de por vida</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

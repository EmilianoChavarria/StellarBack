import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, ExternalLink, Award, BookOpen } from "lucide-react"
import coursesData from "@/data/courses.json"

export default async function PaymentConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const course = coursesData.find((c) => c.id === id)

  if (!course) {
    return null
  }

  const transactionHash = "0x" + Math.random().toString(16).substr(2, 64)

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-12 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h1 className="mb-4 text-3xl font-bold">¡Pago Exitoso!</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Tu compra ha sido procesada correctamente. Ya tienes acceso al curso.
          </p>

          <div className="mb-8 rounded-lg border bg-muted/30 p-6 text-left">
            <div className="mb-4 flex items-start gap-4">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="mb-1 font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">{course.instructor}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monto pagado</span>
                <span className="font-medium">
                  {course.price} {course.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fecha</span>
                <span className="font-medium">{new Date().toLocaleDateString("es-ES")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hash de transacción</span>
                <button className="flex items-center gap-1 font-mono text-xs text-primary hover:underline">
                  {transactionHash.slice(0, 10)}...{transactionHash.slice(-8)}
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-4">
              <BookOpen className="mb-2 h-8 w-8 text-primary" />
              <h3 className="mb-1 font-semibold">Comienza a Aprender</h3>
              <p className="text-sm text-muted-foreground">Accede al contenido completo del curso ahora mismo</p>
            </div>
            <div className="rounded-lg border p-4">
              <Award className="mb-2 h-8 w-8 text-secondary" />
              <h3 className="mb-1 font-semibold">Gana tu NFT</h3>
              <p className="text-sm text-muted-foreground">Completa el curso y recibe tu certificado NFT</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href={`/cursos/${course.id}/aprender`}>Ir al Curso</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/wallet">Ver mi Wallet</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

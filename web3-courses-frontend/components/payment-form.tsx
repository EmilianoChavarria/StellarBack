"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Wallet, CreditCard, Shield } from "lucide-react"

export function PaymentForm({ courseId }: { courseId: string }) {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)
    // Simulación de pago
    setTimeout(() => {
      // Guardar curso comprado
      const purchasedCourses = JSON.parse(localStorage.getItem("purchasedCourses") || "[]")
      purchasedCourses.push({
        courseId: courseId,
        purchaseDate: new Date().toISOString(),
        transactionHash: "0x" + Math.random().toString(16).substr(2, 64),
      })
      localStorage.setItem("purchasedCourses", JSON.stringify(purchasedCourses))
      router.push(`/pago/confirmacion/${courseId}`)
    }, 2000)
  }

  return (
    <div className="lg:col-span-2">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Método de Pago</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rounded-lg border p-4">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex flex-1 cursor-pointer items-center gap-3">
                  <Wallet className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-semibold">Wallet de Criptomonedas</div>
                    <div className="text-sm text-muted-foreground">Paga con ETH desde tu wallet</div>
                  </div>
                  <Badge>Recomendado</Badge>
                </Label>
              </div>

              <div className="flex items-center space-x-3 rounded-lg border p-4 opacity-50">
                <RadioGroupItem value="card" id="card" disabled />
                <Label htmlFor="card" className="flex flex-1 cursor-not-allowed items-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  <div className="flex-1">
                    <div className="font-semibold">Tarjeta de Crédito</div>
                    <div className="text-sm text-muted-foreground">Próximamente disponible</div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {paymentMethod === "wallet" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Información de la Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="mb-2 text-sm font-medium">Dirección conectada</div>
              <div className="font-mono text-sm">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <Shield className="h-5 w-5 shrink-0 text-primary" />
              <div className="text-sm">
                <div className="mb-1 font-semibold">Transacción Segura</div>
                <div className="text-muted-foreground">
                  El pago se procesará mediante un smart contract verificado. Recibirás acceso instantáneo al curso tras
                  la confirmación.
                </div>
              </div>
            </div>
            <Button onClick={handlePayment} disabled={isProcessing} size="lg" className="w-full">
              {isProcessing ? "Procesando..." : "Confirmar Pago"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function EnrollButton({ courseId }: { courseId: string }) {
  const router = useRouter()

  const handleEnroll = () => {
    router.push(`/pago/${courseId}`)
  }

  return (
    <Button onClick={handleEnroll} size="lg" className="mb-4 w-full">
      Inscribirse Ahora
    </Button>
  )
}

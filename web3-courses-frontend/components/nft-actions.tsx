"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Download, CheckCircle2 } from "lucide-react"

export function NFTActions() {
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Mi Certificado NFT",
        text: "Mira mi certificado NFT del curso",
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="mt-4 flex gap-3">
      <Button variant="outline" className="flex-1 bg-transparent" onClick={handleShare}>
        {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Share2 className="mr-2 h-4 w-4" />}
        {copied ? "Copiado" : "Compartir"}
      </Button>
      <Button variant="outline" className="flex-1 bg-transparent">
        <Download className="mr-2 h-4 w-4" />
        Descargar
      </Button>
    </div>
  )
}

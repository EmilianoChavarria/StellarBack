import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, CheckCircle2 } from "lucide-react"
import nftsData from "@/data/nfts.json"
import { NFTActions } from "@/components/nft-actions"

export default async function NFTDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const nft = nftsData.find((n) => n.id === id)

  if (!nft) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">NFT no encontrado</h1>
          <Button asChild>
            <Link href="/wallet">Volver a Wallet</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/wallet">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Wallet
          </Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* NFT Image */}
          <div>
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
                <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="h-full w-full object-cover" />
                {nft.verified && (
                  <Badge className="absolute right-4 top-4 gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Verificado
                  </Badge>
                )}
              </div>
            </Card>

            <NFTActions />
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            <div>
              <h1 className="mb-2 text-3xl font-bold">{nft.name}</h1>
              <p className="text-muted-foreground">{nft.description}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detalles del Certificado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Curso</span>
                  <Link href={`/cursos/${nft.courseId}`} className="font-medium hover:text-primary hover:underline">
                    {nft.courseName}
                  </Link>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Instructor</span>
                  <span className="font-medium">{nft.instructor}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha de Emisión</span>
                  <span className="font-medium">{new Date(nft.completionDate).toLocaleDateString("es-ES")}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token ID</span>
                  <span className="font-mono font-medium">#{nft.tokenId}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Blockchain</span>
                  <span className="font-medium">{nft.blockchain}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estándar</span>
                  <span className="font-medium">{nft.standard}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contrato Inteligente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="mb-2 text-sm text-muted-foreground">Dirección del Contrato</div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded bg-muted px-3 py-2 font-mono text-sm">{nft.contractAddress}</code>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a
                    href={`https://etherscan.io/address/${nft.contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver en Etherscan
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atributos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {nft.attributes.map((attr, index) => (
                    <div key={index} className="rounded-lg border p-3">
                      <div className="mb-1 text-xs text-muted-foreground">{attr.trait_type}</div>
                      <div className="font-medium">{attr.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

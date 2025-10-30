"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Award, ExternalLink, Copy, CheckCircle2 } from "lucide-react"
import nftsData from "@/data/nfts.json"

export default function WalletPage() {
  const [copiedAddress, setCopiedAddress] = useState(false)
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Mi Wallet</h1>
          <p className="text-lg text-muted-foreground">Gestiona tus certificados NFT y activos digitales</p>
        </div>

        {/* Wallet Info Card */}
        <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="mb-2 text-sm font-medium text-muted-foreground">Dirección de Wallet</div>
                  <div className="mb-2 flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 font-mono text-sm">{walletAddress}</code>
                    <Button size="sm" variant="ghost" onClick={handleCopyAddress}>
                      {copiedAddress ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verificada
                    </Badge>
                    <span>•</span>
                    <span>Ethereum Mainnet</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ver en Etherscan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{nftsData.length}</div>
                  <div className="text-sm text-muted-foreground">Certificados NFT</div>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{nftsData.length}</div>
                  <div className="text-sm text-muted-foreground">Cursos Completados</div>
                </div>
                <CheckCircle2 className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Verificados</div>
                </div>
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* NFT Gallery */}
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="list">Lista</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            {nftsData.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Award className="mb-4 h-16 w-16 text-muted-foreground" />
                  <h3 className="mb-2 text-xl font-semibold">No tienes certificados aún</h3>
                  <p className="mb-6 text-center text-muted-foreground">
                    Completa cursos para ganar certificados NFT verificables
                  </p>
                  <Button asChild>
                    <Link href="/cursos">Explorar Cursos</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {nftsData.map((nft) => (
                  <Link key={nft.id} href={`/wallet/nft/${nft.id}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                        {nft.verified && (
                          <Badge className="absolute right-2 top-2 gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verificado
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="mb-2 font-semibold leading-tight group-hover:text-primary">{nft.name}</h3>
                        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{nft.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Token #{nft.tokenId}</span>
                          <span>{new Date(nft.completionDate).toLocaleDateString("es-ES")}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {nftsData.map((nft) => (
                <Link key={nft.id} href={`/wallet/nft/${nft.id}`}>
                  <Card className="transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <div>
                              <h3 className="mb-1 font-semibold">{nft.name}</h3>
                              <p className="text-sm text-muted-foreground">{nft.courseName}</p>
                            </div>
                            {nft.verified && (
                              <Badge variant="outline" className="gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                Verificado
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>Token #{nft.tokenId}</span>
                            <span>•</span>
                            <span>{nft.instructor}</span>
                            <span>•</span>
                            <span>{new Date(nft.completionDate).toLocaleDateString("es-ES")}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

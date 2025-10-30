import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Shield, Coins, Award, Zap, TrendingUp, Users, BookOpen, Rocket, CheckCircle2 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            Impulsado por Blockchain
          </div>
          <h1 className="mb-6 text-balance text-5xl font-bold text-foreground md:text-7xl">
            Aprende Web3 y Gana Certificados NFT
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-xl leading-relaxed text-muted-foreground">
            La primera plataforma educativa descentralizada donde aprendes blockchain, criptomonedas y Web3 mientras
            ganas certificados NFT verificables.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="text-base">
              <Link href="/cursos">Explorar Cursos</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent text-base">
              <Link href="/subir-curso">Enseñar en la Plataforma</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Estudiantes Activos</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Award className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">5K+</div>
                  <div className="text-sm text-muted-foreground">Certificados NFT</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Cursos Disponibles</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              ¿Por Qué Elegir Nuestra Plataforma?
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Experimenta el futuro de la educación en línea con transparencia, propiedad y compensación justa.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">Seguridad Blockchain</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Todas las transacciones y certificados están asegurados en blockchain, garantizando autenticidad y
                  previniendo fraudes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                  <Coins className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">Pagos Directos</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Los smart contracts aseguran que los creadores reciban pagos instantáneos sin intermediarios que tomen
                  comisiones.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                  <Award className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">Certificados NFT</h3>
                <p className="leading-relaxed text-muted-foreground">
                  Gana certificados NFT únicos y verificables que demuestran tus habilidades y pueden mostrarse en
                  cualquier lugar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">Cómo Funciona</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Comienza tu viaje de aprendizaje en Web3 en solo 3 simples pasos
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Conecta tu Wallet</h3>
              <p className="leading-relaxed text-muted-foreground">
                Conecta tu wallet de criptomonedas (MetaMask, WalletConnect, etc.) o crea una cuenta con email para
                comenzar.
              </p>
            </div>

            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-2xl font-bold text-secondary-foreground">
                2
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Elige y Aprende</h3>
              <p className="leading-relaxed text-muted-foreground">
                Explora nuestra biblioteca de cursos, compra con criptomonedas y comienza a aprender de inmediato con
                contenido de alta calidad.
              </p>
            </div>

            <div className="relative">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-2xl font-bold text-accent-foreground">
                3
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">Gana tu NFT</h3>
              <p className="leading-relaxed text-muted-foreground">
                Completa el curso y recibe automáticamente un certificado NFT verificable en tu wallet que demuestra tus
                logros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Creators Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
            <CardContent className="p-12">
              <div className="grid gap-12 md:grid-cols-2">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                    <Rocket className="h-4 w-4" />
                    Para Creadores
                  </div>
                  <h2 className="mb-6 text-balance text-3xl font-bold text-foreground md:text-4xl">
                    Monetiza tu Conocimiento sin Intermediarios
                  </h2>
                  <p className="mb-8 leading-relaxed text-muted-foreground">
                    Crea y vende cursos directamente a estudiantes de todo el mundo. Recibe pagos instantáneos en
                    criptomonedas sin comisiones abusivas.
                  </p>
                  <Button size="lg" asChild>
                    <Link href="/subir-curso">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Comenzar a Enseñar
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">85% de Comisión</h4>
                      <p className="text-sm text-muted-foreground">
                        Mantén la mayor parte de tus ganancias, solo cobramos 15% vs 50% de otras plataformas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">Pagos Instantáneos</h4>
                      <p className="text-sm text-muted-foreground">
                        Recibe ETH directamente en tu wallet sin esperar días o semanas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">NFTs Automáticos</h4>
                      <p className="text-sm text-muted-foreground">
                        Tus estudiantes reciben certificados NFT automáticamente al completar
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-primary" />
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">Control Total</h4>
                      <p className="text-sm text-muted-foreground">
                        Tú decides el precio, contenido y actualizaciones de tus cursos
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="mx-auto max-w-4xl border-border bg-primary/5">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
              ¿Listo para Transformar tu Aprendizaje?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
              Únete a miles de estudiantes y creadores construyendo el futuro de la educación descentralizada.
            </p>
            <Button size="lg" asChild>
              <Link href="/registro">Crear Cuenta Gratis</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="mt-20 border-t border-border bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Plataforma</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/cursos" className="text-sm text-muted-foreground hover:text-foreground">
                    Explorar Cursos
                  </Link>
                </li>
                <li>
                  <Link href="/subir-curso" className="text-sm text-muted-foreground hover:text-foreground">
                    Enseñar
                  </Link>
                </li>
                <li>
                  <Link href="/wallet" className="text-sm text-muted-foreground hover:text-foreground">
                    Mi Wallet
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentación
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Comunidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Carreras
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 LearnChain. Todos los derechos reservados. Construido con tecnología blockchain.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

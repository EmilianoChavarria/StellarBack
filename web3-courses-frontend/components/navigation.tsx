"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">LearnChain</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/cursos"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Cursos
            </Link>
            <Link
              href="/subir-curso"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Enseñar
            </Link>
            <Link
              href="/wallet"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Mi Wallet
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

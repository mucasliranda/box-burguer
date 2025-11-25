import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { ChevronRight, Zap, Trophy, Flame } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="container relative z-10 px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Velocidade no Sabor</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight text-balance">
              Sabores que vencem na
              <span className="text-primary"> primeira volta</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Hambúrgueres artesanais inspirados na emoção da Fórmula 1. Ingredientes premium, sabor campeão.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/menu">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg h-14 px-8">
                  Ver Cardápio
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/menu?category=combo">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-transparent">
                  Ver Combos
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-2 h-32 bg-primary/20 rotate-12 blur-sm" />
        <div className="absolute bottom-20 right-10 w-2 h-40 bg-secondary/20 -rotate-12 blur-sm" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 mx-auto">
                <Flame className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Opção Biturbo</h3>
              <p className="text-muted-foreground text-pretty">
                Turbine seu hambúrguer com carne e queijo extra para máxima potência de sabor
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-secondary/10 mx-auto">
                <Trophy className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Qualidade Premium</h3>
              <p className="text-muted-foreground text-pretty">
                Ingredientes selecionados e carnes nobres para um sabor de pódio
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10 mx-auto">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Entrega Rápida</h3>
              <p className="text-muted-foreground text-pretty">
                Preparamos seu pedido com a velocidade e precisão de um pit stop
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Pronto para a pole position do sabor?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            Faça seu pedido agora e experimente a adrenalina dos nossos hambúrgueres!
          </p>
          <Link href="/menu">
            <Button size="lg" variant="secondary" className="text-lg h-14 px-8">
              Fazer Pedido Agora
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

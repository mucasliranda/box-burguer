"use client"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home } from "lucide-react"

export default function OrderSuccessPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container px-4 max-w-2xl">
          <Card className="border-primary/20">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Pedido Confirmado!</h1>
                <p className="text-lg text-muted-foreground">Seu pedido foi recebido e está sendo preparado</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Número do pedido:</span>
                  <span className="font-bold text-foreground">#{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tempo estimado:</span>
                  <span className="font-bold text-primary">30-40 minutos</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground max-w-md mx-auto text-pretty">
                Você receberá atualizações sobre o status do seu pedido em breve. Prepare-se para uma experiência de
                sabor campeão!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button size="lg" onClick={() => router.push("/menu")}>
                  <Home className="mr-2 h-5 w-5" />
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

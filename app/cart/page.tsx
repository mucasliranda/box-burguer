"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore()

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  const handleGoToCheckout = () => {
    router.push("/checkout")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center space-y-6 px-4">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground">Adicione deliciosos hambúrgueres ao seu carrinho!</p>
            </div>
            <Button onClick={() => router.push("/menu")} size="lg">
              Ver Cardápio
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container px-4 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Seu Carrinho</h1>
            <p className="text-muted-foreground">
              {totalItems} {totalItems === 1 ? "item" : "itens"} no carrinho
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative h-24 w-24 md:h-32 md:w-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-lg text-foreground truncate">{item.product.name}</h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Customizations */}
                        {item.product.category === "burger" && (
                          <div className="space-y-2 mb-3">
                            {item.customizations.biturbo && (
                              <Badge className="bg-primary/10 text-primary border-primary/20">
                                <Zap className="h-3 w-3 mr-1" />
                                Biturbo
                              </Badge>
                            )}

                            {item.customizations.removedIngredients.length > 0 && (
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium">Sem:</span>{" "}
                                {item.customizations.removedIngredients.join(", ")}
                              </p>
                            )}

                            {item.customizations.addedIngredients.length > 0 && (
                              <p className="text-sm text-muted-foreground">
                                <span className="font-medium">Extras:</span>{" "}
                                {item.customizations.addedIngredients
                                  .map((ing) => `${ing.quantity}x ${ing.name}`)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                        )}

                        {item.product.includeFries && (
                          <Badge variant="secondary" className="mb-3">
                            + Batata Grátis
                          </Badge>
                        )}

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <p className="text-xl font-bold text-primary">
                            R$ {(item.totalPrice * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-foreground">Resumo do Pedido</h2>

                  <div className="space-y-2 py-4 border-y border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground font-medium">R$ {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxa de entrega</span>
                      <span className="text-foreground font-medium">Grátis</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">R$ {totalPrice.toFixed(2)}</span>
                  </div>

                  <Button className="w-full h-12 text-lg" onClick={handleGoToCheckout}>
                    Finalizar Compra
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/menu")}>
                    Adicionar mais itens
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { products, extraIngredients } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Minus, Plus, ArrowLeft, Zap } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import type { CartItem } from "@/lib/types"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const addItem = useCartStore((state) => state.addItem)
  const [quantity, setQuantity] = useState(1)
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([])
  const [addedIngredients, setAddedIngredients] = useState<{ id: string; quantity: number }[]>([])
  const [biturbo, setBiturbo] = useState(false)
  const product = products.find((p) => p.id === params.id)
  const addableIngredients = extraIngredients // Define addableIngredients outside of useMemo

  const totalPrice = useMemo(() => {
    let price = product?.basePrice || 0

    // Add extras
    addedIngredients.forEach((added) => {
      const ingredient = addableIngredients.find((i) => i.id === added.id)
      if (ingredient) {
        price += ingredient.price * added.quantity
      }
    })

    // Add Biturbo
    if (biturbo) {
      const cheesePrice = addableIngredients.find((i) => i.id === "extra-cheese")?.price || 3
      const meatPrice = addableIngredients.find((i) => i.id === "extra-meat")?.price || 8
      price += cheesePrice + meatPrice
    }

    return price
  }, [product, addedIngredients, biturbo]) // Removed addableIngredients from dependencies

  const toggleRemoveIngredient = (id: string) => {
    setRemovedIngredients((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const updateAddedIngredient = (id: string, change: number) => {
    setAddedIngredients((prev) => {
      const existing = prev.find((i) => i.id === id)
      if (!existing && change > 0) {
        return [...prev, { id, quantity: 1 }]
      }
      if (existing) {
        const newQuantity = existing.quantity + change
        if (newQuantity <= 0) {
          return prev.filter((i) => i.id !== id)
        }
        return prev.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i))
      }
      return prev
    })
  }

  const toggleBiturbo = () => {
    setBiturbo(!biturbo)
  }

  const handleAddToCart = () => {
    if (!product) return

    const addedIngredientsWithDetails = addedIngredients.map((added) => {
      const ingredient = addableIngredients.find((i) => i.id === added.id)
      return {
        id: added.id,
        name: ingredient?.name || "",
        price: ingredient?.price || 0,
        quantity: added.quantity,
      }
    })

    const cartItem: CartItem = {
      product,
      quantity,
      customizations: {
        removedIngredients,
        addedIngredients: addedIngredientsWithDetails,
        biturbo,
      },
      totalPrice: totalPrice * quantity,
      id: `${product.id}-${Date.now()}`,
    }

    addItem(cartItem)
    router.push("/cart")
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Produto não encontrado</p>
        </div>
      </div>
    )
  }

  // Non-burger products go directly to cart without customization
  if (product.category !== "burger") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container px-4 max-w-4xl">
            <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>

              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground mb-6">{product.description}</p>

                <p className="text-4xl font-bold text-primary mb-8">R$ {product.basePrice.toFixed(2)}</p>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-4">
                    <Label>Quantidade:</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full h-14 text-lg" onClick={handleAddToCart}>
                    Adicionar ao Carrinho - R$ {(product.basePrice * quantity).toFixed(2)}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Burger customization logic
  const defaultIngredients = product.ingredients?.filter((i) => i.isDefault) || []

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container px-4 max-w-6xl">
          <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Image and Info */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.includeFries && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">+ Batata Grátis</Badge>
                )}
              </div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-lg">{product.description}</p>
              </div>
            </div>

            {/* Customization Panel */}
            <div className="space-y-6">
              {/* Biturbo Option */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Checkbox id="biturbo" checked={biturbo} onCheckedChange={toggleBiturbo} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <Label htmlFor="biturbo" className="text-lg font-bold text-primary cursor-pointer">
                          Modo Biturbo
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Turbine seu hambúrguer com carne e queijo extra para máxima potência de sabor
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        + R${" "}
                        {(
                          (addableIngredients.find((i) => i.id === "extra-cheese")?.price || 3) +
                          (addableIngredients.find((i) => i.id === "extra-meat")?.price || 8)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Remove Ingredients */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Remover Ingredientes</h3>
                  <div className="space-y-3">
                    {defaultIngredients
                      .filter((ingredient) => ingredient.removable)
                      .map((ingredient) => (
                        <div key={ingredient.id} className="flex items-center gap-3">
                          <Checkbox
                            id={`remove-${ingredient.id}`}
                            checked={removedIngredients.includes(ingredient.id)}
                            onCheckedChange={() => toggleRemoveIngredient(ingredient.id)}
                          />
                          <Label htmlFor={`remove-${ingredient.id}`} className="flex-1 cursor-pointer text-foreground">
                            {ingredient.name}
                          </Label>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Add Ingredients */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-foreground">Adicionar Extras</h3>
                  <div className="space-y-4">
                    {addableIngredients.map((ingredient) => {
                      const added = addedIngredients.find((i) => i.id === ingredient.id)
                      const currentQuantity = added?.quantity || 0

                      return (
                        <div key={ingredient.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{ingredient.name}</p>
                            <p className="text-sm text-muted-foreground">+ R$ {ingredient.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateAddedIngredient(ingredient.id, -1)}
                              disabled={currentQuantity === 0}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-foreground">{currentQuantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 bg-transparent"
                              onClick={() => updateAddedIngredient(ingredient.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quantity and Add to Cart */}
              <Card className="sticky bottom-4">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Quantidade:</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold text-foreground">{quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-foreground">Total:</span>
                      <span className="text-3xl font-bold text-primary">R$ {(totalPrice * quantity).toFixed(2)}</span>
                    </div>

                    <Button className="w-full h-14 text-lg" onClick={handleAddToCart}>
                      Adicionar ao Carrinho
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

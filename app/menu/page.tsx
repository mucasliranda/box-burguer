"use client"

import { useEffect, useState, useTransition } from "react"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products-data"
import { Button } from "@/components/ui/button"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"

export default function MenuPage() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [isPending, startTransition] = useTransition()

  const categories = [
    { id: "all", name: "Todos" },
    { id: "burger", name: "Hambúrgueres" },
    { id: "side", name: "Acompanhamentos" },
    { id: "drink", name: "Bebidas" },
    { id: "dessert", name: "Sobremesas" },
  ]

  const filteredProducts = categoryFilter !== "all" ? products.filter((p) => p.category === categoryFilter) : products

  const handleCategoryChange = (categoryId: string) => {
    if (categoryFilter === categoryId) return
    startTransition(async () => {
      setCategoryFilter(categoryId)
    })
  }

  return (
    <div className="min-h-screen flex flex-col container">
      <Header />

      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Nosso Cardápio</h1>
            <p className="text-muted-foreground text-lg">Escolha seu sabor campeão</p>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={categoryFilter === category.id ? "default" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <ProductsList categoryFilter={categoryFilter} />
        </div>
      </main>
    </div>
  )
}

function ProductsList({ categoryFilter }: { categoryFilter: string }) {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    setIsLoading(true)
    timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => {
      if (timeout) clearTimeout(timeout)
    }
  }, [categoryFilter])

  const filteredProducts = categoryFilter !== "all" ? products.filter((p) => p.category === categoryFilter) : products

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">Nenhum produto encontrado nesta categoria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  )
}
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const categoryLabels = {
    burger: "Hambúrguer",
    side: "Acompanhamento",
    drink: "Bebida",
    combo: "Combo",
  }

  return (
    <Card className="overflow-hidden group hover:border-primary transition-colors">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">
          {categoryLabels[product.category]}
        </Badge>
        {product.includeFries && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">+ Batata Grátis</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1 text-balance">{product.name}</h3>
        <p className="text-sm min-h-[120px] text-muted-foreground mb-3 line-clamp-6 text-pretty">{product.description}</p>
        <p className="text-2xl font-bold text-primary">R$ {product.basePrice.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/product/${product.id}`} className="w-full">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Adicionar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

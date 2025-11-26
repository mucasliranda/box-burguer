"use client"

import Link from "next/link"
import { ShoppingCart, Menu, Home, UtensilsCrossed, Package, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems())
  const [open, setOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Cardápio", href: "/menu", icon: UtensilsCrossed },
    { name: "Sobremesas", href: "/menu?category=dessert", icon: Package },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Flag className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-none text-foreground">BoxBurguer</h1>
              <p className="text-xs text-muted-foreground">Racing Flavors</p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="outline" size="icon" className="relative bg-transparent">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-left">
                  <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                    <Flag className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">BoxBurguer</div>
                    <div className="text-xs text-muted-foreground font-normal">Racing Flavors</div>
                  </div>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-2 mt-8">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-primary transition-all duration-200 group"
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                      <span className="text-base font-medium">{item.name}</span>
                    </Link>
                  )
                })}
              </nav>

              <div className="absolute bottom-8 left-6 right-6">
                <div className="p-4 rounded-lg bg-accent/50 border border-border">
                  <p className="text-sm font-semibold mb-1">Carrinho</p>
                  <p className="text-xs text-muted-foreground">
                    {totalItems === 0
                      ? "Seu carrinho está vazio"
                      : `${totalItems} ${totalItems === 1 ? "item" : "itens"} no carrinho`}
                  </p>
                  <Link href="/cart" onClick={() => setOpen(false)}>
                    <Button className="w-full mt-3" size="sm">
                      Ver Carrinho
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

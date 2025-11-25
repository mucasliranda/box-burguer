export interface Product {
  id: string
  name: string
  description: string
  basePrice: number
  category: "burger" | "side" | "drink" | "combo"
  image: string
  ingredients?: Ingredient[]
  includeFries?: boolean
}

export interface Ingredient {
  id: string
  name: string
  price: number
  removable: boolean
  addable: boolean
  isDefault: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  customizations: {
    removedIngredients: string[]
    addedIngredients: { id: string; name: string; price: number; quantity: number }[]
    biturbo: boolean
  }
  totalPrice: number
  id: string
}

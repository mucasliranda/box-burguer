"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type CategoryContextType = {
  category: string
  setCategory: (category: string) => void
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<string>("all")

  return <CategoryContext.Provider value={{ category, setCategory }}>{children}</CategoryContext.Provider>
}

export function useCategory() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error("useCategory must be used within a CategoryProvider")
  }
  return context
}

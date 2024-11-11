"use client"

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { fetchProducts } from "@/services/product.service"

type Product = {
  id: number
  title: string
  description: string
  category: string
  price: string
  thumbnail: string
}

type ProductContextType = {
  products: Product[]
  isLoading: boolean
  isError: Error | null;
  selectedCategory: string;
  selectedPricedOrder: string;
  setCategoryFilter: (category: string) => void;
  categories: string[]
  setPriceOrder: (order: string) => void;

}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<Error | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedPricedOrder, setSelectedPricedOrder] = useState<string>("asc")


  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      setIsError(null)

      try {
        const data = await fetchProducts("/products")
        setProducts(data.products)
      } catch (error) {
        setIsError(error as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [])
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products


  const sortedProducts = filteredProducts.sort((a, b) => {
    const priceA = parseFloat(a.price)
    const priceB = parseFloat(b.price)

    return selectedPricedOrder === "asc"
      ? priceA - priceB
      : priceB - priceA
  })

  const categories = Array.from(new Set(products.map((product) => product.category)))
  const setCategoryFilter = (category: string) => {
    setSelectedCategory(category)
  }

  const setPriceOrder = (order: string) => {
    setSelectedPricedOrder(order)
  }

  return (
    <ProductContext.Provider value={{ products: sortedProducts, isLoading, isError, selectedPricedOrder, setPriceOrder, selectedCategory, setCategoryFilter, categories }}>
      {children}
    </ProductContext.Provider>
  )
}


export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductContext must be used within a ProductProvider")
  }

  return context
}
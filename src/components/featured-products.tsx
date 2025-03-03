"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import ProductCard from "@/components/product-card"

// Mock data for featured products
const mockProducts = [
  {
    id: "1",
    name: "Classic Brown Teddy Bear",
    description: "A soft and cuddly companion for all ages",
    price: 29.99,
    category: "teddy-bears",
    images: ["/placeholder.svg?height=400&width=400"],
    inStock: true,
  },
  {
    id: "2",
    name: "Vanilla Dreams Perfume",
    description: "A sweet and warm fragrance for everyday wear",
    price: 59.99,
    category: "perfumes",
    images: ["/placeholder.svg?height=400&width=400"],
    inStock: true,
  },
  {
    id: "3",
    name: "Giant Panda Teddy Bear",
    description: "An adorable panda bear that's perfect for hugs",
    price: 39.99,
    category: "teddy-bears",
    images: ["/placeholder.svg?height=400&width=400"],
    inStock: true,
  },
  {
    id: "4",
    name: "Midnight Rose Perfume",
    description: "An elegant and sophisticated floral scent",
    price: 79.99,
    category: "perfumes",
    images: ["/placeholder.svg?height=400&width=400"],
    inStock: false,
  },
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with a delay
    const timer = setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-1/3" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

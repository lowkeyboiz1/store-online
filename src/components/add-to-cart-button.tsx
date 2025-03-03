"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  inStock: boolean
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })

    toast.success(`${quantity} × ${product.name} has been added to your cart.`)
  }

  return (
    <div className="flex flex-1 items-center gap-2">
      <div className="flex h-10 items-center rounded-md border">
        <button
          type="button"
          className="flex h-full w-10 items-center justify-center border-r text-muted-foreground transition-colors hover:bg-muted"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </button>
        <span className="flex h-full min-w-[40px] items-center justify-center px-2 text-center">{quantity}</span>
        <button type="button" className="flex h-full w-10 items-center justify-center border-l text-muted-foreground transition-colors hover:bg-muted" onClick={() => setQuantity(quantity + 1)}>
          +
        </button>
      </div>
      <Button className="flex-1 gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
        <ShoppingCart className="h-5 w-5" />
        Add to Cart
      </Button>
    </div>
  )
}

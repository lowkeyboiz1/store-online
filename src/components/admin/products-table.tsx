"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "Classic Brown Teddy Bear",
    category: "teddy-bears",
    price: 29.99,
    stock: 45,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Vanilla Dreams Perfume",
    category: "perfumes",
    price: 59.99,
    stock: 28,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Giant Panda Teddy Bear",
    category: "teddy-bears",
    price: 39.99,
    stock: 32,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Midnight Rose Perfume",
    category: "perfumes",
    price: 79.99,
    stock: 0,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Baby Blue Teddy Bear",
    category: "teddy-bears",
    price: 24.99,
    stock: 18,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function ProductsTable() {
  const [products, setProducts] = useState(mockProducts)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((product) => product.id))
    }
  }

  const handleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id))
    setSelectedProducts(selectedProducts.filter((productId) => productId !== id))
    toast.success("The product has been deleted successfully.")
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox checked={selectedProducts.length === products.length && products.length > 0} onCheckedChange={handleSelectAll} aria-label="Select all products" />
              </TableHead>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox checked={selectedProducts.includes(product.id)} onCheckedChange={() => handleSelectProduct(product.id)} aria-label={`Select ${product.name}`} />
                </TableCell>
                <TableCell>
                  <div className="relative h-10 w-10 overflow-hidden rounded-md">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.category.replace("-", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={product.stock === 0 ? "destructive" : product.stock < 10 ? "outline" : "secondary"}>{product.stock === 0 ? "Out of stock" : product.stock}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          variant="destructive"
          size="sm"
          disabled={selectedProducts.length === 0}
          onClick={() => {
            setProducts(products.filter((product) => !selectedProducts.includes(product.id)))
            setSelectedProducts([])
            toast.success(`${selectedProducts.length} products have been deleted.`)
          }}
        >
          Delete Selected
        </Button>
      </div>
    </div>
  )
}

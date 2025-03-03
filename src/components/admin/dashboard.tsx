"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Package, ShoppingCart, Users, Settings, PlusCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ProductsTable from "@/components/admin/products-table"
import AddProductForm from "@/components/admin/add-product-form"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const pathname = usePathname()

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345.67",
      change: "+12.5%",
      changeType: "positive",
      icon: BarChart3,
    },
    {
      title: "Orders",
      value: "156",
      change: "+8.2%",
      changeType: "positive",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      value: "48",
      change: "+24",
      changeType: "neutral",
      icon: Package,
    },
    {
      title: "Customers",
      value: "2,345",
      change: "+4.6%",
      changeType: "positive",
      icon: Users,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center gap-4 px-4">
          <Link href="/admin" className="font-semibold">
            Admin Dashboard
          </Link>
          <nav className="hidden md:flex md:flex-1 md:items-center md:gap-4 md:px-4">
            <Link href="/admin" className={`text-sm font-medium ${pathname === "/admin" ? "text-primary" : "text-muted-foreground"}`}>
              Dashboard
            </Link>
            <Link href="/admin/products" className={`text-sm font-medium ${pathname === "/admin/products" ? "text-primary" : "text-muted-foreground"}`}>
              Products
            </Link>
            <Link href="/admin/orders" className={`text-sm font-medium ${pathname === "/admin/orders" ? "text-primary" : "text-muted-foreground"}`}>
              Orders
            </Link>
            <Link href="/admin/customers" className={`text-sm font-medium ${pathname === "/admin/customers" ? "text-primary" : "text-muted-foreground"}`}>
              Customers
            </Link>
            <Link href="/admin/settings" className={`text-sm font-medium ${pathname === "/admin/settings" ? "text-primary" : "text-muted-foreground"}`}>
              Settings
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddProduct(!showAddProduct)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {showAddProduct ? (
          <Card>
            <CardHeader>
              <CardTitle>Add New Product</CardTitle>
              <CardDescription>Fill in the details to add a new product to your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <AddProductForm onCancel={() => setShowAddProduct(false)} />
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className={`text-xs ${stat.changeType === "positive" ? "text-green-500" : stat.changeType === "negative" ? "text-red-500" : "text-muted-foreground"}`}>
                        {stat.change} from last month
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full rounded-md border">
                      {/* Chart would go here */}
                      <div className="flex h-full items-center justify-center text-muted-foreground">Sales Chart</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>You have 12 orders this week.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center">
                          <div className="space-y-1">
                            <p className="text-sm font-medium leading-none">Order #{1000 + i}</p>
                            <p className="text-sm text-muted-foreground">
                              Customer {i} • ${(Math.random() * 100).toFixed(2)}
                            </p>
                          </div>
                          <div className="ml-auto font-medium">{new Date().toLocaleDateString()}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your product inventory, update details, and track stock levels.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 pb-4">
                    <Input placeholder="Search products..." className="max-w-sm" />
                    <Button variant="outline">Search</Button>
                  </div>
                  <ProductsTable />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>View and manage customer orders, track shipments, and process returns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 pb-4">
                    <Input placeholder="Search orders..." className="max-w-sm" />
                    <Button variant="outline">Search</Button>
                  </div>
                  <div className="rounded-md border">
                    <div className="h-[400px] w-full flex items-center justify-center text-muted-foreground">Orders table would go here</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="customers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customers</CardTitle>
                  <CardDescription>View customer information, purchase history, and contact details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 pb-4">
                    <Input placeholder="Search customers..." className="max-w-sm" />
                    <Button variant="outline">Search</Button>
                  </div>
                  <div className="rounded-md border">
                    <div className="h-[400px] w-full flex items-center justify-center text-muted-foreground">Customers table would go here</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

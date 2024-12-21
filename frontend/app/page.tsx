import { SignIn } from "@clerk/nextjs"
import Header from "@/components/Header"
import ProductCard from "@/components/ProductCard"

// This is a mock function to simulate fetching products from an API
async function getProducts() {
  // In a real application, you would fetch this data from your backend
  return [
    { id: "1", title: "Textbook", description: "Intro to Computer Science", price: 30, image: "/placeholder.svg?height=200&width=200", category: "Books" },
    { id: "2", title: "Desk Lamp", description: "Adjustable LED lamp", price: 15, image: "/placeholder.svg?height=200&width=200", category: "Furniture" },
    { id: "3", title: "Backpack", description: "Lightly used backpack", price: "Free", image: "/placeholder.svg?height=200&width=200", category: "Accessories" },
    // Add more mock products as needed
  ]
}

export default async function Home() {
  const products = await getProducts()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Latest Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
  )
}


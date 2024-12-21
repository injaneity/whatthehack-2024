"use client"; // Marks this as a Client Component

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import allProducts from "@/public/data.json";
import { useUser } from "@clerk/clerk-react";

function filterProducts(searchQuery: string | undefined, currentUsername: string) {
  if (!searchQuery) {
    return allProducts.filter((product) => {
      return product.username !== currentUsername && product.status !== "reserved";
    });
  }

  const lowerCaseQuery = searchQuery.toLowerCase();

  return allProducts.filter((product) => {
    const matchesUsername = product.username !== currentUsername;
    const isNotReserved = product.status !== "reserved";
    const matchesQuery =
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery));
    return matchesUsername && isNotReserved && matchesQuery;
  });
}

export default function Home({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const { user } = useUser();
  const currentUsername = user?.username ?? ""; // Retrieve the current user's username
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    if (currentUsername) { // Ensure `currentUsername` is not empty
      const searchQuery = searchParams.query || "";
      const filteredProducts = filterProducts(searchQuery, currentUsername);
      setProducts(filteredProducts);
    }
  }, [searchParams, currentUsername]); // Depend on `currentUsername`

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Marketplace</h1>

        {/* Display current username */}
        {currentUsername && <p className="mb-4 text-gray-700">Logged in as: {currentUsername}</p>}

        {/* Search Bar */}
        <form method="GET" className="mb-6">
          <input
            type="text"
            name="query"
            placeholder="Search products..."
            defaultValue={searchParams.query}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          ) : (
            <p className="text-gray-700">No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
"use client"; // Marks this as a Client Component

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import allProducts from "@/public/data.json";
import { useUser } from "@clerk/clerk-react";

import ListingList from '../components/ListingList';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function sortProducts(products: typeof allProducts, sortOption: string) {
  if (sortOption === "a-z") {
    return [...products].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
  } else if (sortOption === "z-a") {
    return [...products].sort((a, b) =>
      b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
    );
  } else if (sortOption === "price-low-high") {
    return [...products].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high-low") {
    return [...products].sort((a, b) => b.price - a.price);
  } else if (sortOption === "new-to-old") {
    return [...products].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } else if (sortOption === "old-to-new") {
    return [...products].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  }
  return products;
}

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
  const searchQuery = searchParams.query || ""; // Extract the search query from searchParams
  const [sortOption, setSortOption] = useState("new-to-old"); // Default to "New to Old"

  useEffect(() => {
    if (currentUsername) {
      const filteredProducts = filterProducts(searchQuery, currentUsername);
      const sortedProducts = sortProducts(filteredProducts, sortOption);
      setProducts(sortedProducts);
    }
  }, [searchQuery, currentUsername, sortOption]);

  return (
    <div className="min-h-screen bg-[#F6F3E8]">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 px-4">Marketplace</h1>
        <div className="flex flex-row flex-wrap gap-4 justify-start w-full">
          <div className="pl-4 pb-3">
            <Select onValueChange={(value) => setSortOption(value)} defaultValue="new-to-old">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="a-z">A-Z</SelectItem>
                  <SelectItem value="z-a">Z-A</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="new-to-old">New to Old</SelectItem>
                  <SelectItem value="old-to-new">Old to New</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Search Bar */}
          <form
            method="GET"
            className="mb-6 flex flex-grow items-center gap-2 px-4"
          >
            <Input
              className="flex-grow"
              type="text"
              name="query"
              placeholder="Search products..."
              defaultValue={searchQuery}
            />
            <Button
              type="submit"
              className="px-4 py-2 bg-[#5964C6] text-white rounded-lg hover:bg-[#3A3F74]"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Conditional Rendering */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-gray-700 text-2xl">No products found!</p>
          </div>
        )}
      </main>
    </div>
  );
}
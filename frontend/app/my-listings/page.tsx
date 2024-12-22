"use client"; // Marks this as a Client Component

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { Listing } from "@/types/listings";
import { getAllListings } from "@/api/listings";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function sortProducts(listings:Listing[], sortOption: string) {
  if (sortOption === "a-z") {
    return listings.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
  } else if (sortOption === "z-a") {
    return [...listings].sort((a, b) =>
      b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
    );
  } else if (sortOption === "price-low-high") {
    return [...listings].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high-low") {
    return [...listings].sort((a, b) => b.price - a.price);
  } else if (sortOption === "new-to-old") {
    return [...listings].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortOption === "old-to-new") {
    return [...listings].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
  return listings;
}

function filterProducts(
  searchQuery: string | undefined,
  currentUsername: string,
  listings: Listing[]
) {
  if (!searchQuery) {
    return listings.filter((listing) => {
      return listing.username === currentUsername;
    });
  }

  const lowerCaseQuery = searchQuery.toLowerCase();

  return listings.filter((product) => {
    const matchesUsername = product.username === currentUsername;
    const matchesQuery =
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery));
    return matchesUsername && matchesQuery;
  });
}

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { user } = useUser();
  const currentUsername = user?.username ?? ""; // Retrieve the current user's username
  const [products, setProducts] = useState<Listing[]>();
  const searchQuery = searchParams.query || ""; // Extract the search query from searchParams
  const [sortOption, setSortOption] = useState("new-to-old"); // Default to "New to Old"

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getAllListings();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        alert("Failed to fetch listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const initializeProducts = () => {
      const filteredProducts = filterProducts(searchQuery, currentUsername, listings);
      const sortedProducts = sortProducts(filteredProducts, sortOption);
      setProducts(sortedProducts);
    };
  
    if (!loading) {
      initializeProducts(); // Ensure this runs when `listings` is loaded
    }
  }, [searchQuery, currentUsername, sortOption, listings, loading]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#F6F3E8]">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 px-4">My Listings</h1>
        <div className="flex flex-row flex-wrap gap-3 justify-start w-full">
          <div className="pl-4 pb-3">
            <Select onValueChange={(value) => setSortOption(value)} defaultValue="new-to-old">
              <SelectTrigger className="w-[180px] bg-[#5964C6] text-white rounded-lg">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent className="bg-[#5964C6]">
                <SelectGroup className="text-white rounded-lg">
                  <SelectLabel className="text-white">Sort by</SelectLabel>
                  <SelectItem value="a-z" className="text-white">A-Z</SelectItem>
                  <SelectItem value="z-a" className="text-white">Z-A</SelectItem>
                  <SelectItem value="price-low-high" className="text-white">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low" className="text-white">Price: High to Low</SelectItem>
                  <SelectItem value="new-to-old" className="text-white">New to Old</SelectItem>
                  <SelectItem value="old-to-new" className="text-white">Old to New</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Search Bar */}
          <form
            method="GET"
            className="mb-6 flex flex-grow items-center gap-3 pr-4"
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
              variant="reverse"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Conditional Rendering */}
        {products && products.length > 0 ? (
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
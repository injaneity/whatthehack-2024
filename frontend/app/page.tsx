"use client"; // Marks this as a Client Component

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
//import ListingList from "../components/ListingList";
import { Listing } from "@/types/listings";
import { getAllListings } from "@/api/listings";

function filterProducts(
  searchQuery: string | undefined,
  currentUsername: string,
  listings: Listing[]
) {
  if (!searchQuery) {
    return listings.filter((listing) => {
      return (
        listing.username !== currentUsername && listing.status !== "reserved"
      );
    });
  }

  const lowerCaseQuery = searchQuery.toLowerCase();

  return listings.filter((listing) => {
    const matchesUsername = listing.username !== currentUsername;
    const isNotReserved = listing.status !== "reserved";
    const matchesQuery =
      listing.title.toLowerCase().includes(lowerCaseQuery) ||
      listing.description.toLowerCase().includes(lowerCaseQuery) ||
      listing.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery));
    return matchesUsername && isNotReserved && matchesQuery;
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
    if (currentUsername) {
      // Ensure `currentUsername` is not empty
      const filteredProducts = filterProducts(searchQuery, currentUsername, listings);
      setProducts(filteredProducts);
    }
  }, [searchQuery, currentUsername]); // Depend on `currentUsername` and `searchQuery`

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-[#F6F3E8]">
      <Header />
      {/* <ListingList /> */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 px-4">
          Marketplace
        </h1>

        {/* Search Bar */}
        <form method="GET" className="mb-6 flex items-center gap-2 px-4 ">
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

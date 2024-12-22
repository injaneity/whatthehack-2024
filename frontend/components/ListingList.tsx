"use client";

import React, { useEffect, useState } from "react";
import { getAllListings, deleteListing } from "../api/listings";
import { Listing } from "../types/listings";

const ListingList: React.FC = () => {
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

  const handleDelete = async (listingId: string) => {
    try {
      await deleteListing(listingId);
      setListings((prev) => prev.filter((listing) => listing.id !== listingId));
      alert("Listing deleted successfully!");
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Failed to delete listing.");
    }
  };

  if (loading)
    return (
      <p className="text-gray-700 text-3xl font-bold flex items-center justify-center h-[50vh]">
        Loading...
      </p>
    );

  return (
    <div>
      <h1>All Listings</h1>
      {listings.length === 0 ? (
        <p>No listings available.</p>
      ) : (
        <ul>
          {listings.map((listing) => (
            <li key={listing.id}>
              <h3>{listing.title}</h3>
              <p>
                <strong>Price:</strong> ${listing.price}
              </p>
              <p>
                <strong>Description:</strong> {listing.description}
              </p>
              <p>
                <strong>Status:</strong> {listing.status}
              </p>
              <p>
                <strong>Tags:</strong> {listing.tags.join(", ")}
              </p>
              <p>
                <strong>URL:</strong>{" "}
                <a href={listing.url} target="_blank" rel="noopener noreferrer">
                  {listing.url}
                </a>
              </p>
              <button onClick={() => handleDelete(listing.id)}>Delete</button>
              <a
                href={`/update-listing/${listing.id}`}
                style={{ marginLeft: "10px" }}
              >
                Update
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListingList;

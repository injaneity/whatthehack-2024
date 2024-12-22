"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { updateListing } from "@/api/listings";
import { UpdateListingData } from "@/types/listings";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  tags: string[];
  url: string;
  status: string;
  username: string;
}

export enum Status {
  Available = "available",
  Reserved = "reserved",
  Complete = "complete",
}

export default function ProductCard({
  id,
  title,
  description,
  price,
  url,
  username,
  status: initialStatus,
}: ProductCardProps) {
  const telegramLink = `https://telegram.me/${username}`;
  const { user } = useUser();
  const currentUsername = user?.username ?? "";
  const [showTelegramButton, setShowTelegramButton] = useState(true);
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (username === currentUsername) {
      setShowTelegramButton(false);
    }
  }, [username, currentUsername]);

  const buttonText = () => {
    if (username == currentUsername) {
        if (status == Status.Reserved) {
            return "Reserved";
        } else if (status == Status.Complete) {
            return "Complete";
        }
        return "Available";
    } else {
        if (status == Status.Reserved) {
            return "Complete Purchase";
        } else if (status == Status.Complete) {
            return "Complete";
        }
        return "Reserve";
    }
};

const handleButtonClick = async () => {
  try {
      if (username !== currentUsername && Status.Available) {
          const updatedData: UpdateListingData = {
              buyer_username: currentUsername,
              status: Status.Reserved,
          };

          const response = await updateListing(id, updatedData);
          setStatus(Status.Reserved);
          console.log("Listing successfully updated to reserved", response);
      } else if (username !== currentUsername && Status.Reserved) {
          const updatedData: UpdateListingData = {
              status: Status.Complete,
          };

          const response = await updateListing(id, updatedData);
          setStatus(Status.Complete);
          console.log("Listing successfully updated to complete", response);
      }
  } catch (error) {
      console.error("Error updating listing:", error);
  }
};

  return (
    <Card className="w-[350px] flex flex-col">
      <CardHeader className="p-4">
        <CardTitle>{title}</CardTitle>
        <div className="relative w-full h-48 overflow-hidden rounded-lg pt-2">
          <img
            src={url}
            alt={`Image of ${title}`}
            className="w-full h-full object-cover"
          />
        </div>
        <CardDescription className="text-left">{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between items-center gap-3 mt-auto">
        <span className="text-lg font-bold">
          {price === 0 ? "Free" : `$${price}`}
        </span>
        <div className="flex items-center gap-3">
          {showTelegramButton && (
            <a
              className="inline-block"
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/telegram.png"
                alt="Contact on Telegram"
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </a>
          )}
          <Button onClick={handleButtonClick}>{buttonText()}</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

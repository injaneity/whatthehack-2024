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

export default function ProductCard({
  title,
  description,
  price,
  url,
  username,
  status,
}: ProductCardProps) {
  const telegramLink = `https://telegram.me/${username}`;
  const { user } = useUser();
  const currentUsername = user?.username ?? "";
  const [showTelegramButton, setShowTelegramButton] = useState(true);

  useEffect(() => {
    if (username === currentUsername) {
      setShowTelegramButton(false);
    }
  }, [username, currentUsername]);
  
  const buttonText = () => {
    if (username == currentUsername) {
      if (status == "reserved") {
        return "Reserved";
      } else if (status == "completed") {
        return "Completed";
      }
      return "Available";
    } else {
      if (status == "reserved") {
        return "Complete Purchase";
      } else if (status == "completed") {
        return "Completed";
      }
      return "Reserve";
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
          <Button>{buttonText()}</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

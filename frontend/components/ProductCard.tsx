"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  tags,
  url,
  status,
  username,
}: ProductCardProps) {
  const telegramLink = `https://telegram.me/${username}`;

  return (
    <Card className="w-full max-w-sm mx-auto rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:outline hover:outline-[2px] hover:outline-black hover:shadow-[0px_10px_15px_rgba(0,0,0,0.3)]">
      <CardHeader>
        <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
          <Carousel className="relative w-full h-full">
            <CarouselContent>
              <CarouselItem
                className="relative w-full h-48 flex items-center justify-center"
              >
                <img
                  src={url}
                  alt={`Image of ${title}`}
                  className="object-cover w-full h-full"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-200"
            />
            <CarouselNext
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-200"
            />
          </Carousel>
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-xs text-gray-500">Listed by: {username}</p>
        <p className="text-xs text-gray-500">Tags: {tags.join(", ")}</p>
        <p className="text-xs text-gray-500">Status: {status}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-auto">
        <span className="text-lg font-bold">
          {price === 0 ? "Free" : `$${price}`}
        </span>
        <div className="flex items-center gap-3">
          <a href={telegramLink} target="_blank" rel="noopener noreferrer">
            <img
              src="/assets/telegram.png"
              alt="Contact on Telegram"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          </a>
          <Button>Reserve</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

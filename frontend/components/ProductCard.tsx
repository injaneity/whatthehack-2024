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
  price: number | "Free";
  image: string | string[];
}

export default function ProductCard({ title, description, price, image }: ProductCardProps) {
  const images = Array.isArray(image) ? image : [image]; // Ensure images is always an array

  return (
    <Card className="w-full max-w-sm mx-auto border border-transparent rounded-lg shadow-md hover:border-black hover:border-[3px] hover:shadow-xl transition duration-300">
      <CardHeader>
        <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
          <Carousel className="relative w-full h-full">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem
                  key={index}
                  className="relative w-full h-48 flex items-center justify-center"
                >
                  <img
                    src={src}
                    alt={`Image ${index + 1} for ${title}`}
                    className="object-cover w-full h-full"
                  />
                </CarouselItem>
              ))}
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
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">
          {price === 0 ? "Free" : `$${price}`}
        </span>
        <div className="flex items-center gap-3">
          <img
            src='/assets/telegram.png'
            alt="Telegram"
            width={40}
            height={40}
            className="cursor-pointer"
          />
          <Button>Reserve</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

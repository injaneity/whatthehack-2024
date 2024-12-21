"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import telegramIcon from "@/components/icons/telegram.png";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: number | "Free";
  image: string | string[]; // Allow single or multiple images
  category: string;
}

export default function ProductCard({ title, description, price, image, category }: ProductCardProps) {
  const images = Array.isArray(image) ? image : [image]; // Ensure images is always an array
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <div className="relative w-full h-48 cursor-pointer" onClick={handleImageClick}>
          <Image
            src={images[currentImageIndex]}
            alt={`${title} image ${currentImageIndex + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-lg"
          />
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <Badge>{category}</Badge>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold">
          {price === 0 ? "Free" : `$${price}`}
        </span>
        <div className="flex items-center gap-3">
          <Image
            src={telegramIcon}
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


"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
          {price === 0 ? 'Free' : `$${price}`}
        </span>
        <div className="flex items-center gap-3">
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
          <Button>Reserve</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

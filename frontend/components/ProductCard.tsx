"use client"

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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
  username
}: ProductCardProps) {

  const telegramLink = `https://telegram/me/${username}`

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <img
          src={url}
          alt={`Image of ${title}`}
          className="object-cover w-full h-full"
        />
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <a href={telegramLink} target="_blank" rel="noopener noreferrer">
        <img
          src="/assets/teelgram.png"
          alt="Contact on Telegram"
          width={40}
          height={40}
          className="cursor-pointer"
          />
      </a>

      <CardFooter className="flex justify-between">
        <Button>Reserve</Button>
        <Button variant="neutral">Deploy</Button>
      </CardFooter>
    </Card>
  )
}
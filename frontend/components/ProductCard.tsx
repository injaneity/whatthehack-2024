import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProductCardProps {
  id: string
  title: string
  description: string
  price: number | "Free"
  image: string
  category: string
}

export default function ProductCard({ id, title, description, price, image, category }: ProductCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <span className="px-5 py-10">
          {id}
      </span>
      <CardHeader>
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
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
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  )
}


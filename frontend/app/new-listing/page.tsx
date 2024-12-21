'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Header from "@/components/Header"

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'

const categories = [
  "Books",
  "Electronics",
  "Furniture",
  "Clothing",
  "Kitchen",
  "Sports",
  "Other"
]

export default function NewListing() {
  const [images, setImages] = useState<File[]>([])
  const router = useRouter()

  const formSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    
    // Add images to formData
    images.forEach((image, index) => {
      formData.append(`image-${index}`, image)
    })

    // Here you would typically send the formData to your server
    // For now, we'll just log it and redirect
    console.log(Object.fromEntries(formData))
    router.push('/')
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <Card>
      <h1 className="text-3xl font-bold text-gray-900 p-6">Create New Listing</h1>
        <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">

          {/* Title */}
          <FormItem>
            <FormLabel htmlFor="title">Title</FormLabel>
            <FormControl>
              <Input id="title" name="title" required />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* Description */}
          <FormItem>
            <FormLabel htmlFor="description">Description</FormLabel>
            <FormControl>
              <Textarea id="description" name="description" required />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* Price */}
          <FormItem>
            <FormLabel htmlFor="price">Price</FormLabel>
            <FormControl>
              <Input id="price" name="price" type="number" min="0" step="0.01" required />
            </FormControl>
            <FormMessage />
          </FormItem>

          {/* Price */}
          <FormItem>
            <Label htmlFor="category">Category</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                ))}
              </SelectContent>
              </Select>
          </FormItem>

          {/* Images */}
          <FormItem>
            <Label htmlFor="images">Images</Label>
              <Input id="images" type="file" accept="image/*" multiple onChange={handleImageUpload} />
              {images.length > 0 && (
                <div className="mt-2">
                  <p>{images.length} image(s) selected</p>
                </div>
              )}
          </FormItem>

          <Button type="submit">Create Listing</Button>
        </form>
        </Form>
      </Card>
      </main>
    </div>
  )
}



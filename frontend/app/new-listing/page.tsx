'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Header from "@/components/Header"
import { useUser } from '@clerk/clerk-react';

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'

// Import your utility functions
import { createListing } from '@/api/listings';
import { formatCreateListingData } from '@/utils/formatData';
import { CreateListingData } from '@/types'; // Adjust the path as needed

// Define the validation schema using Zod
const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  price: z.preprocess((val) => Number(val), z.number().min(0, { message: 'Price must be positive.' })),
  description: z.string().min(1, { message: 'Description is required.' }),
  // Note: Username is handled separately via Clerk's useUser hook
  // File is handled separately via state
})

export default function NewListing() {
  
  const [file, setFile] = useState<File | null>(null)
  const router = useRouter()
  const { user, isLoaded } = useUser();

  // Initialize React Hook Form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
    },
  });

  // Destructure necessary methods and states from form
  const { handleSubmit, register, formState: { errors, isSubmitting } } = form;

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Ensure the user is loaded and has a username
    if (!isLoaded) {
      console.error('User data is still loading.')
      return
    }

    if (!user) {
      console.error('User is not authenticated.')
      return
    }

    // Determine the username. Adjust based on your user object structure.
    const username = user.username || user.firstName || 'Anonymous';

    // Create a FormData object to hold form data and file
    const formData = new FormData()
    formData.append('username', username)
    formData.append('title', data.title)
    formData.append('price', data.price.toString())
    formData.append('description', data.description)
    if (file) {
      formData.append('file', file)
    }

    // Log the FormData contents for debugging
    console.log('FormData contents before formatting:')
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`)
    }

    try {
      // Format the form data using your utility function
      const formattedData: CreateListingData = formatCreateListingData(formData)
      console.log('Formatted Data:', formattedData)

      // Send the formatted data using your createListing function
      const response = await createListing(formattedData)

      if (response.ok) {
        console.log('Listing created successfully.')
        router.push('/') // Redirect on success
      } else {
        const errorData = await response.json()
        console.error('Failed to create listing:', errorData)
        // Optionally, display an error message to the user here
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error)
      // Optionally, display an error message to the user here
    }
  }

  // Handle file input changes
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      console.log('File selected:', event.target.files[0].name)
    }
  }

  // Optional: If user data is loaded after component mounts, you can set default values here
  useEffect(() => {
    if (isLoaded && user) {
      // If you decide to include username in the form, set it here
      // form.setValue('username', user.username || '')
    }
  }, [isLoaded, user, form])

  return (
    <div className="min-h-screen bg-[#F6F3E8]">
      <Header />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card>
          <h1 className="text-3xl font-bold text-gray-900 p-6">Create New Listing</h1>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">

              {/* Title */}
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <FormControl>
                  <Input 
                    id="title" 
                    placeholder="Title" 
                    {...register('title')} 
                  />
                </FormControl>
                <FormMessage>
                  {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                </FormMessage>
              </FormItem>

              {/* Price */}
              <FormItem>
                <FormLabel htmlFor="price">Price</FormLabel>
                <FormControl>
                  <Input 
                    id="price" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    placeholder="Price" 
                    {...register('price', { valueAsNumber: true })} 
                  />
                </FormControl>
                <FormMessage>
                  {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                </FormMessage>
              </FormItem>

              {/* Description */}
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Textarea 
                    id="description" 
                    placeholder="Description" 
                    {...register('description')} 
                  />
                </FormControl>
                <FormMessage>
                  {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </FormMessage>
              </FormItem>

              {/* File Upload */}
              <FormItem>
                <Label htmlFor="file">File</Label>
                <Input 
                  id="file" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  required 
                />
                {file && (
                  <div className="mt-2">
                    <p>Selected file: {file.name}</p>
                  </div>
                )}
              </FormItem>

              {/* Submit Button */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Create Listing'}
              </Button>
            </form>
          </Form>
        </Card>
      </main>
    </div>
  )
}

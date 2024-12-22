// src/components/CreateListing.tsx
import React, { useState } from 'react';
import { createListing } from '@/api/listings';
import { formatCreateListingData } from '@/utils/formatData';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Form } from './ui/form';
import { Button } from './ui/button';
import Header from './Header';
import { Card } from './ui/card';
import { useUser } from '@clerk/clerk-react';

const CreateListing: React.FC = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    username: user?.username ?? '',
    title: '',
    price: 0,
    description: '',
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("ym")
    e.preventDefault();
    try {
      const formattedData = formatCreateListingData(formData);
      const response = await createListing(formattedData);
      console.log('Listing created:', response);
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3E8]">
      <Header />
      <main className="max-w-4xl mx-auto py-4 sm:px-6 lg:px-8">
      <Card className="p-6">
        <form onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-gray-900 p-4">Create New Listing</h1>
        <Input type="text" name="title" placeholder="Title" onChange={handleChange} />
        <div><br/></div>

        <Input type="number" name="price" placeholder="Price" onChange={handleChange} />
        <div><br/></div>

        <Textarea name="description" placeholder="Description" onChange={handleChange}></Textarea>
        <div><br/></div>

        <Input type="file" name="file" onChange={handleChange} />
        <div><br/></div>

        <Button>
          <div>
            <button type="submit">
              Create Listing
            </button>
          </div>
        </Button>
        </form>
          
      </Card>
      </main>

      
    </div>
    
  );
};

export default CreateListing;

// src/components/CreateListing.tsx
import React, { useState } from 'react';
import { createListing } from '@/api/listings';
import { formatCreateListingData } from '@/utils/formatData';
import { Input } from './ui/input';

const CreateListing: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
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
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <input type="number" name="price" placeholder="Price" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <Input type="file" name="file" onChange={handleChange} />
      <button type="submit">Create Listing</button>
    </form>
  );
};

export default CreateListing;

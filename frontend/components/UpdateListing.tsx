import React, { useState, useEffect } from 'react';
import { updateListing } from '@/api/listings';
import { UpdateListingData } from '@/types/listings';
import { Textarea } from '@/components/ui/textarea';
import { Select } from './ui/select';
import { Button } from './ui/button';
import { useUser } from '@clerk/clerk-react';
import { Input } from './ui/input';

interface UpdateListingProps {
  listingId: string;
}

const UpdateListing: React.FC<UpdateListingProps> = ({ listingId }) => {
  const { user } = useUser();

  const [formData, setFormData] = useState<UpdateListingData>({
    username: user?.username ?? '',
    title: '',
    price: undefined,
    description: '',
    status: undefined,
  });

  useEffect(() => {
    if (user?.username) {
      setFormData((prev) => ({
        ...prev,
        username: user.username ?? "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure all existing form values are sent, even if unmodified
      const updatedData = Object.fromEntries(
        Object.entries(formData).filter(([v]) => v !== undefined && v !== '')
      ) as UpdateListingData;

      const response = await updateListing(listingId, updatedData);
      console.log('Listing updated:', response);
      alert('Listing updated successfully!');

    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing.');
    }
  };

  // Render conditionally based on `user`
  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="title" placeholder="New Title" onChange={handleChange} />
      <Input type="number" name="price" placeholder="New Price" onChange={handleChange} />
      <Textarea name="description" placeholder="New Description" onChange={handleChange}></Textarea>
      <Select name="status" onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="available">Available</option>
        <option value="reserved">Reserved</option>
        <option value="complete">Complete</option>
      </Select>
      <Button type="submit">Update Listing</Button>
    </form>
  );
};

export default UpdateListing;

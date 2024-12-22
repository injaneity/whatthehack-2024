import axiosInstance from '@/utils/axiosInstance';
import axios from 'axios';
import { UpdateListingData, Listing } from '@/types/listings';

export const createListing = async (formData: FormData): Promise<Listing> => {
  const response = await axiosInstance.post('/listings/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getAllListings = async (): Promise<Listing[]> => {
  const response = await axiosInstance.get('/listings/');
  return response.data;
};

export const updateListing = async (listingId: string, data: UpdateListingData): Promise<Listing> => {
    console.log(data);
    try {
        const response = await axiosInstance.put<Listing>(`/listings/${listingId}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
          console.error('Status code:', error.response?.status);
          console.error('Headers:', error.response?.headers);
          throw new Error(error.response?.data?.detail || 'Failed to update listing');
        } else {
          console.error('Unexpected error:', error);
          throw new Error('An unexpected error occurred');
        }
      }
};    

export const deleteListing = async (listingId: string): Promise<{ message: string }> => {
  const response = await axiosInstance.delete(`/listings/${listingId}`);
  return response.data;
};

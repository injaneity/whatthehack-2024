import { CreateListingData } from '@/types/listings';

export const formatCreateListingData = (data: CreateListingData): FormData => {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('title', data.title);
  formData.append('price', data.price.toString());
  formData.append('description', data.description);
  if (data.file) formData.append('file', data.file); // Ensure file is a File object
  return formData;
};

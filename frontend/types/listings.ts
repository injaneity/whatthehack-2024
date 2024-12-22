export interface Listing {
    id: string;
    username: string;
    buyer_username: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    url: string;
    status: 'available' | 'reserved' | 'complete';
    createdAt: string;
  }
  
  export interface CreateListingData {
    username: string;
    title: string;
    price: number;
    description: string;
    file: File | null;
  }
  
  export interface UpdateListingData {
    username:string;
    title?: string;
    price?: number;
    description?: string;
    status?: 'available' | 'reserved' | 'complete';
  }
  
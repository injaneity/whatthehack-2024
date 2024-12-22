export enum Status {
    Available = "available",
    Reserved = "reserved",
    Complete = "complete",
}


export interface Listing {
    id: string;
    username: string;
    buyer_username: string;
    title: string;
    price: number;
    description: string;
    tags: string[];
    url: string;
    status: Status;
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
    username?:string;
    buyer_username?: string;
    title?: string;
    price?: number;
    description?: string;
    status?: Status;
  }
  
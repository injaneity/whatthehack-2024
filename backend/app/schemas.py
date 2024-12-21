# schemas.py
from pydantic import BaseModel, Field
from typing import Optional

class ListingCreate(BaseModel):
    listing_id: int = Field(..., example=2)
    listing_owner_id: int = Field(..., example=3)
    tags: str = Field(..., example="wood")
    description: str = Field(..., example="ikea table")
    price: float = Field(..., example=1200.00)
    listing_image_url: str = Field(..., example="Singapore")
    status: str = Field(..., example=1)

class ListingRead(BaseModel):
    id: int
    title: str
    description: Optional[str]
    price: float
    location: str
    owner_id: int

    class Config:
        orm_mode = True

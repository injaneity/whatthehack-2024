from pydantic import BaseModel, Field, AnyUrl
from typing import List, Optional

class ListingBase(BaseModel):
    username: str = Field(..., example="john_doe")
    price: float = Field(..., example=99.99)
    description: str = Field(..., example="A wonderful product that you will love.")
    url: Optional[AnyUrl] = Field(None, example="https://example.com/image.jpg")

class ListingCreate(ListingBase):
    # The file will be handled separately in the endpoint
    pass

class ListingUpdate(BaseModel):
    username: Optional[str]
    price: Optional[float]
    description: Optional[str]
    url: Optional[AnyUrl]

class ListingOut(ListingBase):
    id: str = Field(..., example="64a7c0f2b4d1f2a5c8e9f0d1")
    tags: List[str] = Field(..., example=["A", "wonderful", "product"])

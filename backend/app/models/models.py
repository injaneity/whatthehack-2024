from enum import Enum
from pydantic import BaseModel, Field, AnyUrl
from typing import List, Optional

from datetime import datetime

class ListingStatus(str, Enum):
    available = "available"
    reserved = "reserved"
    complete = "complete"

class ListingBase(BaseModel):
    username: str
    buyer_username: str
    title: str
    price: float
    description: str
    tags: List[str]
    url: str
    status: ListingStatus = ListingStatus.available
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ListingCreate(ListingBase):
    # The file will be handled separately in the endpoint
    pass

class ListingUpdate(BaseModel):
    username: str
    buyer_username: Optional[str]
    price: Optional[float]
    description: Optional[str]
    url: Optional[AnyUrl]
    status: Optional[ListingStatus]

class ListingOut(ListingBase):
    id: str = Field(..., example="64a7c0f2b4d1f2a5c8e9f0d1")
    tags: List[str] = Field(..., example=["A", "wonderful", "product"])

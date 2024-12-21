from typing import List
from app.models.models import ListingOut
from app.services.vision import get_tags

def extract_tags(file_url: str) -> List[str]:
    return get_tags(file_url)

def listing_helper(listing) -> ListingOut:
    return ListingOut(
        id=listing.get("id"),
        username=listing["username"],
        title=listing["title"],
        price=listing["price"],
        description=listing["description"],
        tags=listing["tags"],
        url=listing.get("url"),
        status=listing["status"],
        created_at=listing["created_at"]  # Include created_at
    )

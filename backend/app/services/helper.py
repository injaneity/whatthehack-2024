from typing import List
from app.models.models import ListingOut

def extract_tags(description: str) -> List[str]:
    words = description.split()
    return words[:3] if len(words) >= 3 else words

def listing_helper(listing) -> ListingOut:
    return ListingOut(
        id=listing.get("id"),
        username=listing["username"],
        buyer_username=listing["buyer_username"],
        title=listing["title"],
        price=listing["price"],
        description=listing["description"],
        tags=listing["tags"],
        url=listing.get("url"),
        status=listing["status"],
        created_at=listing["created_at"]  # Include created_at
    )

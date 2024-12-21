from typing import List
from app.models.models import ListingOut

def extract_tags(description: str) -> List[str]:
    words = description.split()
    return words[:3] if len(words) >= 3 else words

def listing_helper(listing) -> ListingOut:
    return ListingOut(
        id=str(listing["_id"]),
        username=listing["username"],
        price=listing["price"],
        description=listing["description"],
        tags=listing["tags"],
        url=listing.get("url")
    )
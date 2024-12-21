from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List
from bson.objectid import ObjectId

from app.models.models import ListingOut, ListingStatus, ListingUpdate
from app.database import listing_collection
from app.services.s3 import upload_file_to_s3
from app.services.helper import extract_tags, listing_helper

from uuid import uuid4
from datetime import datetime

router = APIRouter()

@router.post("/listings/", response_model=ListingOut)
async def create_listing(
    username: str = Form(...),
    title: str = Form(...),  # Add title
    price: float = Form(...),
    description: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        # Extract tags from description
        tags = extract_tags(description)

        # Upload file to S3
        file_url = upload_file_to_s3(file.file, file.filename)
        
        listing_id = str(uuid4())
        current_time = datetime.utcnow()

        # Create a listing document with a default status
        listing_data = {
            "id": listing_id,
            "username": username,
            "title": title,
            "price": price,
            "description": description,
            "tags": tags,
            "url": file_url,
            "status": ListingStatus.available.value,  # Default status
            "created_at": current_time  # Add created_at
        }

        # Insert the listing into the database
        result = await listing_collection.insert_one(listing_data)
        new_listing = await listing_collection.find_one({"_id": result.inserted_id})
        return listing_helper(new_listing)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create listing.")

@router.get("/listings/", response_model=List[ListingOut])
async def get_all_listings():
    try:
        cursor = listing_collection.find()
        listings = await cursor.to_list(length=100)  # Adjust length as needed
        return [listing_helper(listing) for listing in listings]
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to retrieve listings.")

@router.get("/listings/{listing_id}", response_model=ListingOut)
async def get_listing_by_id(listing_id: str):
    try:
        # Query the database by the custom 'id' field
        listing = await listing_collection.find_one({"id": listing_id})
        if not listing:
            raise HTTPException(status_code=404, detail="Listing not found")
        return listing_helper(listing)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve listing.")

    
@router.get("/listings/username/{username}", response_model=List[ListingOut])
async def get_listings_by_username(username: str):
    try:
        # Query the database for listings by username
        print(username)
        cursor = listing_collection.find({"username": username})
        listings = await cursor.to_list(length=100)
        if not listings:
            raise HTTPException(status_code=404, detail="No listings found for the given username")
        return [listing_helper(listing) for listing in listings]
    except Exception as e:
        print(f"Error retrieving listings by username: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve listings.")


@router.put("/listings/{listing_id}", response_model=ListingOut)
async def update_listing(listing_id: str, listing: ListingUpdate):
    update_data = {k: v for k, v in listing.dict().items() if v is not None}

    # Extract tags if description is updated
    if "description" in update_data:
        update_data["tags"] = extract_tags(update_data["description"])

    try:
        result = await listing_collection.update_one(
            {"id": listing_id},
            {"$set": update_data}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Listing not found")
        updated_listing = await listing_collection.find_one({"id": listing_id})
        return listing_helper(updated_listing)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to update listing.")


@router.delete("/listings/{listing_id}", response_model=dict)
async def delete_listing(listing_id: str):
    try:
        result = await listing_collection.delete_one({"_id": ObjectId(listing_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Listing not found")
        return {"message": "Listing deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to delete listing.")

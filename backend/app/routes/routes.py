from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List, Optional
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

        # Upload file to S3
        file_url = upload_file_to_s3(file.file, file.filename)

        # Extract tags from description
        tags = extract_tags(file_url)
        
        listing_id = str(uuid4())
        current_time = datetime.utcnow()

        # Create a listing document with a default status
        listing_data = {
            "id": listing_id,
            "username": username,
            "buyer_username": "",
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
        print(e)
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

    
@router.get("/listings/seller/{username}", response_model=List[ListingOut])
async def get_listings_by_seller(username: str):
    try:
        # Query the database for listings by username
        print(username)
        cursor = listing_collection.find({"username": username})
        listings = await cursor.to_list(length=100)
        if not listings:
            raise HTTPException(status_code=404, detail="No listings found for the given username")
        return [listing_helper(listing) for listing in listings]
    except Exception as e:
        print(f"Error retrieving listings by seller: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve listings.")
    
@router.get("/listings/buyer/{username}", response_model=List[ListingOut])
async def get_listings_by_buyer(username: str):
    try:
        # Query the database for listings by username
        cursor = listing_collection.find({"buyer_username": username})
        listings = await cursor.to_list(length=100)
        if not listings:
            raise HTTPException(status_code=404, detail="No listings found for the given username")
        return [listing_helper(listing) for listing in listings]
    except Exception as e:
        print(f"Error retrieving listings by buyer: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve listings.")

@router.put("/listings/{listing_id}", response_model=ListingOut)
async def update_listing(
    listing_id: str,
    username: Optional[str] = Form(None),  # Make fields optional
    buyer_username: Optional[str] = Form(None),
    title: Optional[str] = Form(None),
    price: Optional[float] = Form(None),
    description: Optional[str] = Form(None),
    status: Optional[str] = Form(None)
):
    try:
        update_data = {
            "username": username,
            "buyer_username": buyer_username,
            "title": title,
            "price": price,
            "description": description,
            "status": status
        }

        update_data = {key: value for key, value in update_data.items() if value is not None}

        if not update_data:
            raise HTTPException(status_code=400, detail="No valid fields to update.")

        result = await listing_collection.update_one(
            {"id": listing_id},
            {"$set": update_data}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Listing not found")

        updated_listing = await listing_collection.find_one({"id": listing_id})
        return listing_helper(updated_listing)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update listing: {str(e)}")




@router.delete("/listings/{listing_id}", response_model=dict)
async def delete_listing(listing_id: str):
    try:
        result = await listing_collection.delete_one({"id": listing_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Listing not found")
        return {"message": "Listing deleted successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Failed to delete listing.")

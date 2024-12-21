from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ServerSelectionTimeoutError
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DATABASE_NAME = os.getenv("DATABASE_NAME", "mydatabase")
COLLECTION_NAME = "listing"

client = AsyncIOMotorClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
db = client[DATABASE_NAME]
listing_collection = db[COLLECTION_NAME]

async def create_indexes():
    try:
        await listing_collection.create_index("id", unique=True)
        print("Indexes created successfully.")
    except ServerSelectionTimeoutError as err:
        print(f"Failed to connect to MongoDB: {err}")
        exit(1)
    except Exception as err:
        print(f"An error occurred while creating indexes: {err}")
        exit(1)

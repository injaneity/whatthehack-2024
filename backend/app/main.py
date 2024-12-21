# main.py

from fastapi import FastAPI
from app.database import create_indexes
from app.routes.routes import router

app = FastAPI(title="Listings API", version="1.0")

@app.on_event("startup")
async def startup_event():
    await create_indexes()
    
app.include_router(router)
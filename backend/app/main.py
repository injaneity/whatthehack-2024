from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_indexes
from app.routes.routes import router

app = FastAPI(title="Listings API", version="1.0")

origins = [
    "http://localhost:3000",  # Frontend in development
    "http://54.151.179.131", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.on_event("startup")
async def startup_event():
    await create_indexes()
    
app.include_router(router)
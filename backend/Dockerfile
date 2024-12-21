# Use official Python image as the base
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN apt-get update && apt-get install -y openssl libssl-dev

# Copy project
COPY ./app /app/app
COPY .env /app/.env

# Expose the port FastAPI will run on
EXPOSE 8000

# Set the command to run FastAPI with your specified script
CMD ["fastapi", "dev", "app/main.py"]

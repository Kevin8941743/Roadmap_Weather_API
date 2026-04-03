# Roadmap Weather API

A Node.js + Express API to fetch weather data for a given location, with caching using Redis.

---

## Features

- Fetch weather data from Visual Crossing Weather API (https://www.visualcrossing.com/weather-api)
- Redis caching to reduce API calls and speed up responses
- Rate limiting to prevent abuse
- Dockerized setup for easy deployment
- Supports environment variables for API keys and Redis URL

---

## Prerequisites

- Node.js v20+
- Redis (or use Docker)
- NPM

---

## Environment Variables

Create a `.env` file in the project root with:

API_KEY=your_visualcrossing_api_key  
REDIS_URL=your_redis_url

---

## Install & Run Locally

1. Install dependencies: npm install  
2. Run server: node server.js  

Server will run at: http://localhost:3000

---

## API Endpoints

### Get Weather Data

Endpoint: GET /climate/:location

Example Request: GET /climate/London

Response:  



Behavior:  
- If data exists in Redis cache, returns cached data.  
- Otherwise, fetches from Visual Crossing API and stores it in Redis for 30 minutes.

---


4. Make a request: curl http://localhost:3000/climate/London

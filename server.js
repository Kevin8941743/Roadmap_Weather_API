import express from "express"
import { createClient } from "redis"
import axios from "axios"
import rateLimit from "express-rate-limit"
import dotenv from "dotenv"

const app = express()
const client = createClient({
    url: process.env.REDIS_URL
})
const PORT = 3000
dotenv.config()



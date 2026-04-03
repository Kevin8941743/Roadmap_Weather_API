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

await client.connect()

const API_KEY = process.env.API_KEY

const limiter = rateLimit({
    max: 10,
    windowMs: 10 * 60 * 1000,
    message: "You cannot send any requests for 10 minutes!"
})

app.get("/climate/:item", limiter, async (req, res) => {

    const user_input = req.params.item
    console.log(`User requesting: ${user_input}`)



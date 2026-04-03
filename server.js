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

    const cache = await client.get(user_input)

    if (cache) {
        console.log(`Cache found for ${user_input}`)
        return res.json(JSON.parse(cache))
    }

    console.log(`${user_input} was not found in cache, searching in database...`)

    const data = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${user_input}?key=${API_KEY}`)

    await client.setEx(user_input, 1800, JSON.stringify(data.data))

    res.json(data.data)



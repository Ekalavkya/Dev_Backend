import express from "express"
import cors from 'cors'
import cookieParsal from "cookies-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))
app.use(express.json({ limit: "18kb" }))
app.use(express.urlencoded({ extended: true, limit: "18kb" }))
app.use(express.static("public"))
app.use (cookieParsal())
export { app }
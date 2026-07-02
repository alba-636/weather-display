import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { getPosition } from './controllers/positionController.js'
import GPSHandler from './features/gpsHandler.js'

console.log('Hello, World!')

// Load .env environement variables.
config()

const corsOptions = {
  origin: process.env.CORS,
  methods: 'GET'
}

GPSHandler.instance.startListening()

const app = express()
app.use(cors(corsOptions))

app.get('/api/position', getPosition)
app.get('/api/ping', (_, res) => { res.status(200).json({ status: 200 }) })

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}.`)
})


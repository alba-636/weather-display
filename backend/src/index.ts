import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { getPosition } from './controllers/positionController.js'

console.log('Hello, World!')

// Load .env environement variables.
config()

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET'
}

const app = express()
app.use(cors(corsOptions))

app.get('/api/position', getPosition)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}.`)
})


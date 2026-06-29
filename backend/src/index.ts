import express from 'express'
import { config } from 'dotenv'
import { getPosition } from './controllers/positionController.js'

console.log('Hello, World!')

// Load .env environement variables.
config()

const app = express()

app.get('/api/position', getPosition)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}.`)
})


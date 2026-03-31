import express from 'express'
import path from 'path'
import dotenv from 'dotenv'

// import the router from your routes file
import carsRouter from './routes/cars.js'

dotenv.config()

const PORT = process.env.PORT || 5001

const app = express()

app.use(express.json())

// Enable CORS manually for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// specify the api path for the server to use
app.use('/cars', carsRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'))
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
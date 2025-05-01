import express, { json } from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies.js'

const PORT = process.env.PORT ?? 3200

const app = express()

// Middleware

app.use(json())
app.use(cors())

app.disable('x-powered-by')

// Movies
app.use('/movies', moviesRouter)

// NOT FOUND

app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

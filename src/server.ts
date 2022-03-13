import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(__dirname, '..', '.env') })

import bodyParser from 'body-parser'
import routes from './routes/todo.route'
import { initializeDatabase } from './config/database'
import express, { Request, Response } from 'express'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use('/todos', routes)

app.get('/', (req: Request, res: Response) => res.send('🚀 Welcome to the API'))

initializeDatabase().then(() => {
   app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
   })
})

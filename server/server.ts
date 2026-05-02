import * as Path from 'node:path'
import express from 'express'
import dotenv from 'dotenv'
import courseworkRoutes from './routes/coursework'
import jokeRoutes from './routes/joke'

dotenv.config()

const server = express()
server.use(express.json())

server.use('/api/v1/coursework', courseworkRoutes)
server.use('/api/v1/joke', jokeRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

if (process.env.NODE_ENV !== 'production') {
  import('dotenv')
    .then((dotenv) => dotenv.config())
    .catch((err) => {
      console.error('Failed to load dotenv: ', err)
    })
}

export default server

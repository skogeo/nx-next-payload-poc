import express from 'express'
import payload from 'payload'

require('dotenv').config()
const app = express()

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'my-secret',
    express: app,
  })

  app.listen(3000, async () => {
    console.log(
      "Express is now listening for incoming connections on port 3000."
    )
  })
}

start()

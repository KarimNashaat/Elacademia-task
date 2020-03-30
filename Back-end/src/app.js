require('./db/mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

const userRouter = require('./routers/user')

app.use(cors())

app.use(express.json())
app.use(userRouter)

module.exports = app
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const notesRoutes = require('./routes/notes')
const authRoutes = require('./routes/auth')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/notes', notesRoutes)
app.use('/api/auth', authRoutes)

// connection to db
mongoose.connect(process.env.MONG)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

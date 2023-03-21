// this file is the entrypoint to the server

const bodyparser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')

// this imports the various routes of the server
const artist = require('./routes/artist')
const user = require('./routes/user')
const song = require('./routes/song')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' });

connectDB(); // the DB connection must be invoked before app.express

const app = express();

app.use(bodyparser.json());
app.use(cors({
    origin: '*'
}))

// middleware to use for all routes go here:
app.use(logger)
app.use(errorHandler)

// these are defining the routes
app.use('/artist', artist)
app.use('/user', user)
app.use('/song', song)

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log( `Error: ${err.message}` ) 
    server.close(() => process.exit(1))
})

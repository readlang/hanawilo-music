// this file is the entrypoint to the server
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const logger = require('./middlewares/logger')
const errorHandler = require('./middlewares/error')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
const xss = require('xss-clean')

// this imports the various routes of the server
const artist = require('./routes/artist')
const user = require('./routes/user')
const song = require('./routes/song')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' });

connectDB(); // the DB connection must be invoked before app.express

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: '*' // this is wildcard string, allowing any site
}))

// middleware to use for all routes go here:
app.use(cookieParser())
app.use(fileupload()) // allows grabbing data out of uploaded files

app.use(mongoSanitize())
app.use(xss())

app.use(hpp())
app.use(helmet())
app.use(logger)
app.use(errorHandler)

// this is a pretty relaxed rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // max api calls in window
})
app.use(limiter)

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

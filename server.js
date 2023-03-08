// this file is the entrypoint to the server

const bodyparser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

// this imports the various routes of the server
const artist = require('./routes/artist')
const user = require('./routes/user')
const song = require('./routes/song')

dotenv.config({ path: './config/config.env' });
const app = express();

app.use(bodyparser.json());

// these are defining the routes
app.use('/artist', artist)
app.use('/user', user)
app.use('/song', song)

const PORT = process.env.PORT || 5001

const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

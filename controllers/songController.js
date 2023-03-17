//  For '/song' endpoints
const getSongs = (req, res, next) => {
    // query param check:
    if (Object.keys(req.query).length) {
        const {
            songTitle,
            artist,
            genre
        } = req.query

        const filter = []

        if (songTitle) filter.push(songTitle)
        if (artist) filter.push(artist)
        if (genre) filter.push(genre)

        for (const query of filter) {
            console.log(`Searching song by: ${query}`)
        }
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Show me all the songs!' })
}

const postSong = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Create a new song.' })
}

const deleteSongs = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Delete many songs.' })
}


//  For '/song/:songId' endpoints
const getSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `show me the song with the ID of ${req.params.songId}` })
}

const updateSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `update the song with the ID of ${req.params.songId}` })
}

const deleteSong = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `delete the song with the ID of ${req.params.songId}` })
}


module.exports = {
    getSongs,
    postSong,
    deleteSongs,

    getSong,
    updateSong,
    deleteSong
}
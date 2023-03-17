// For '/artist' endpoints
const getArtists = (req, res, next) => {
    if (Object.keys(req.query).length) {
        const {
            firstName,
            lastName,
            genre
        } = req.query

        const filter = []

        if (firstName) filter.push(firstName)
        if (lastName) filter.push(lastName)
        if (genre) filter.push(genre)

        for (const query of filter) {
            console.log(`Searching artist by: ${query}`)
        }
    }
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Show me all the artists!' })
}

const postArtist = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Create a new artist.' })
}

const deleteArtists = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Delete all artists.' })
}

// For '/artist/:artistId' endpoints
const getArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `show me the artist with the ID of ${req.params.artistId}` })
}

const updateArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `update the artist with the ID of ${req.params.artistId}` })
}

const deleteArtist = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `delete the artist with the ID of ${req.params.artistId}` })
}

module.exports = {
    getArtists,
    postArtist,
    deleteArtists,

    getArtist,
    updateArtist,
    deleteArtist
}
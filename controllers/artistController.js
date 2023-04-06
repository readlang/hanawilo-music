const Artist = require('../models/Artist')

// For '/artist' endpoints
const getArtists = async (req, res, next) => {

    const filter = {}
    const options = {}

    if (Object.keys(req.query).length) {
        const {
            limit,
            sortByGenre,
            firstName,
            lastName,
            genre
        } = req.query

        if (firstName) filter.firstName = firstName
        if (lastName) filter.lastName = lastName
        if (genre) filter.genre = genre

        if (limit) options.limit = limit
        if (sortByGenre) options.sort = {
            category: sortByGenre === 'asc' ? 1 : -1
        }
    }
    try {
        const artists = await Artist.find()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(artists)
    } catch (error) {
        next(error)
    }
}

const postArtist = async (req, res, next) => {
    try {
        const artist = await Artist.create(req.body)
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json( artist )
    } catch (error) {
        next(error)
    }
}

const deleteArtists = async (req, res, next) => {
    try {
        const deletedArtists = await Artist.deleteMany()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( deletedArtists )
    } catch (error) {
        next(error)
    }
}

// For '/artist/:artistId' endpoints
const getArtist = async (req, res, next) => {
    try {
        const artist = await Artist.findById(req.params.artistId)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( artist )
    } catch (error) {
        next(error)
    }
}

const updateArtist = async (req, res, next) => {
    try {
        const artist = await Artist.findByIdAndUpdate( req.params.artistId, req.body, {new: true} )
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( artist )
    } catch (error) {
        next(error)
    }
}

const deleteArtist = async (req, res, next) => {
    try {
        const deletedArtist = await Artist.findByIdAndDelete( req.params.artistId )
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( deletedArtist )
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getArtists,
    postArtist,
    deleteArtists,

    getArtist,
    updateArtist,
    deleteArtist
}
const Artist = require('../models/Artist')
const path = require('path') // built in node module allows you to read the path

// For '/artist' endpoints
const getArtists = async (req, res, next) => {

    const filter = {}
    const options = {}
    const fields = [] // example: ["firstName", "lastName", "genre"]

    if (Object.keys(req.query).length) {
        const {
            firstName,
            lastName,
            genre, 
            limit,
            sortByGenre
        } = req.query

        if (firstName) filter.firstName = firstName
        if (lastName) filter.lastName = lastName
        if (genre) filter.genre = genre

        if (limit) options.limit = limit
        if (sortByGenre) options.sort = {
            genre: sortByGenre === 'asc' ? 1 : -1
        }
    }
    console.log("filter: ", filter, "options: ", options)

    try {
        const artists = await Artist.find(filter, fields, options)
        
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

const postArtistImage = async (req, res, next) => {
    try {
        const err = {msg: "Error uploading image"}
        if (!req.files ) next(err)
        
        const file = req.files.file

        if (!file.mimetype.startsWith('image')) next(err)
        if (file.size > process.env.MAX_FILE_SIZE) next(err)

        file.name = `photo_${req.params.artistId}${path.parse(file.name).ext}`
        const filePath = process.env.FILE_UPLOAD_PATH + file.name

        file.mv(filePath, async (err) => {
            await Artist.findByIdAndUpdate(req.params.artistId, { image: file.name })
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({msg: "Image uploaded!"})
            
        })
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
    deleteArtist,

    postArtistImage
}
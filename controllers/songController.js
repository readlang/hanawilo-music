const Song = require('../models/Song')

//  For '/song' endpoints
const getSongs = async (req, res, next) => {
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
    try {
        const songs = await Song.find()   
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(songs)
    } catch (error) {
        next(error)
    }
}

const postSong = async (req, res, next) => {
    try {
        const song = await Song.create(req.body)
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(song)
    } catch (error) {
        next(error)
    }
}

const deleteSongs = async (req, res, next) => {
    try {
        const deletedSongs = await Song.deleteMany()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deletedSongs)
    } catch (error) {
        next(error)
    }
}

//  For '/song/:songId' endpoints
const getSong = async (req, res, next) => {
    try {
        const song = await Song.findById(req.params.songId)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song) 
    } catch (error) {
        next(error)
    }
}

const updateSong = async (req, res, next) => {
    try {
        const song = await Song.findByIdAndUpdate( req.params.songId, req.body, {new: true} )
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song)
    } catch (error) {
        next(error)
    }
}

const deleteSong = async (req, res, next) => {
    try {
        const deletedSong = await Song.findByIdAndDelete( req.params.songId )
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(deletedSong) 
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getSongs,
    postSong,
    deleteSongs,

    getSong,
    updateSong,
    deleteSong
}
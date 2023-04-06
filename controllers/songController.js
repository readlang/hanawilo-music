const Song = require('../models/Song')

//  For '/song' endpoints
const getSongs = async (req, res, next) => {

    const filter = {}
    const options = {}
    if (Object.keys(req.query).length) {
        const {
            limit,
            sortByArtist,
            songTitle,
            artist,
            genre,
        } = req.query

        if (songTitle) filter.songTitle = songTitle
        if (artist) filter.artist = artist
        if (genre) filter.genre = genre

        if (limit) options.limit = limit
        if (sortByArtist) options.sort = {
            category: sortByArtist === 'asc' ? 1 : -1
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

const getSongRatings = async (req, res, next) => {
    try {
        const song = await Song.findById( req.params.songId )
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song.ratings)  // not sure if this .ratings is correct !!!
    } catch (error) {
        next(error)
    }
}

const postSongRating = async (req, res, next) => {
    try {
        const result = await Song.findById( req.params.songId )
        result.ratings.push( req.body )   // not sure if this is correct !!!
        await result.save()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)  
    } catch (error) {
        next(error)
    }
}

const deleteSongRatings = async (req, res, next) => {
    try {
        const song = await Song.findById( req.params.songId )
        song.ratings = []
        await song.save()   // not sure if this is correct !!!
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(song)  
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
    deleteSong,

    getSongRatings,
    postSongRating,
    deleteSongRatings
}
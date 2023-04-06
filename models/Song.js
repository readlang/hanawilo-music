const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this is known as a sub-document schema
const RatingSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

// this is the main schema
const SongSchema = new Schema({
    songTitle: {
        type: String,
        required: true,
        maxLength: 20
    },
    artist: {
        type: String,
        unique: true,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    ratings: [RatingSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Song', SongSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        maxLength: 10
    },
    gender: {
        type: String,
        required: true,
        enum: [
            'Male', 'Female', 'male', 'female'
        ]
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: (email) => validator.isEmail(email)
    },
    password: {
        type: String,
        required: true,
        validate: (password) => validator.isStrongPassword(password)
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 15
    }, 
    lastName: {
        type: String,
        required: true,
        maxLength: 15
    }
}, {
    timestamps: true
})

// pre- and post-hooks go here...
UserSchema.pre('save', function(next) {
    // recall this refers to self and "this" keyword won't work on arrow functions
    this.userName = this.userName.trim(); 
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    next()
})

UserSchema.post('save', function() {  // not sure if 'save' is correct
    this.gender = this.gender.toUpperCase();
    // don't have to execute next in a post hook
})

UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

module.exports = mongoose.model('User', UserSchema)
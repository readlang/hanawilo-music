const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const crypto = require('crypto') // build in JS library

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
            'Male', 'Female', 'male', 'female', 'MALE', 'FEMALE'
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
    },
    admin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
}, {
    timestamps: true
})

// pre- and post-hooks go here...

// -MIGHT HAVE TO DELETE THIS ONE TO USE SECOND PREHOOK-
UserSchema.pre('save', function(next) {
    // recall this refers to self and "this" keyword won't work on arrow functions
    this.userName = this.userName.trim(); 
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    next()
})

// 
UserSchema.pre('save', async function(next) {
    // if the password was never modified coming from the user, 
    // it means that the use is hitting the login endpoint
    // so no need to hash the password
    if (!this.isModified('password')) next()

    // default of 10 rounds for salt is good
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// UserSchema.post('save', function() {  // not sure if 'save' is correct
//     this.gender = this.gender.toUpperCase();
//     // don't have to execute next in a post hook
// })

// these are not pre or post hooks
// they are methods on the user class instance
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}

// recall that "this" refers to the User object instance that you are dealing with
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password )
}

// Token is not a JWT token, but rather a random string
UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000 

    return resetToken
}

module.exports = mongoose.model('User', UserSchema)
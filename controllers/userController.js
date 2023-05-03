const User = require('../models/User');
const crypto = require('crypto')

// For '/user' endpoints
const getUsers = async (req, res, next) => {

    const filter = {}
    const options = {}
    const fields = []

    // if req has query params, destructure them into the various variables:
    if (Object.keys(req.query).length) {
        const {
            userName,
            age,
            limit,
            sortByAge,
        } = req.query

        if (userName) filter.userName = userName
        if (age) filter.age = age
        
        if (limit) options.limit = limit
        if (sortByAge) options.sort = {
            age: sortByAge === 'asc' ? 1 : -1
        }
    }
    console.log("filter: ", filter, "options: ", options)

    try {
        const users = await User.find(filter, fields, options)  

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(users)
    } catch (error) {
        next(error)
    }
}

const postUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        
        sendTokenResponse(user, 201, res)
        
        // res
        // .status(201)
        // .setHeader('Content-Type', 'application/json')
        // .json( user )
    } catch (error) {
        next(error)
    }
}

const deleteUsers = async (req, res, next) => {
    try {
        const deletedUsers = await User.deleteMany()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( deletedUsers )
    } catch (error) {
        next(error)
    }
}

//  For '/user/:userId' endpoints
const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( user )
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate( req.params.userId, req.body, {new: true} )
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( user )
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete( req.params.userId )
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json( deletedUser )
    } catch (error) {
        next(error)
    }
}

// for '/login' endpoint
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) throw new Error("Please provide an email and password")

        const user = await User.findOne({ email }).select('+password')
        if (!user) throw new Error("User or email does not exist")

        const isMatch = await user.matchPassword(password)
        if (!isMatch) throw new Error('Invalid Password')

        sendTokenResponse(user, 200, res)
        
    } catch (error) {
        next(error)
    }
}

// to request a password reset email
const forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (!user) throw new Error('User/email not found')
    
        const resetToken = user.getResetPasswordToken()

        try {
            // you would send an email here to reset password
            // npm "Nodemailer" is a tool to do this
            await user.save({ validateBeforeSave: false }) // will skip any pre-hooks

            res.status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ 
                msg: `Password has been reset with reset token: ${resetToken}`
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false }) // will skip any pre-hooks
            next( new Error('Failed to reset password') )
        }

    } catch (error) {
        next(error)
    }
}

// for a user to change their password after requesting an email password reset
const resetPassword = async (req, res, next) => {
    try {
        const resetPasswordToken = crypto.createHash('sha256').update(req.query.resetToken).digest('hex')
        
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }  // greaterthan
        })
        
        if (!user) throw new Error('Invalid reset token from user!')
        
        user.password = req.body.password
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save() // save to the database
        
        sendTokenResponse(user, 200, res) 
    } catch (error) {
        next(error)
    }
}

// for a user who knows their password to change it
const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('+password')
        
        const passwordMatches = await user.matchPassword(req.body.password)
        if (!passwordMatches) throw new Error('Password is incorrect')
        
        user.password = req.body.newPassword
        
        await user.save() // this actually saves the data to DB
        
        sendTokenResponse(user, 200, res)
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000 ),
        httpOnly: true // so the cookie can't be accessed by the client side (preventing XSS)
    })
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: 'Successfully logged out!'})
}

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date( Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
        httpOnly: true
    }
    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({success: true, token})
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,

    getUser,
    updateUser,
    deleteUser,
    login,

    forgotPassword,
    resetPassword,
    updatePassword,
    logout
}
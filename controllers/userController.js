const User = require('../models/User');

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
    const { email, password } = req.body

    if (!email || !password) throw new Error("Please provide an email and password")

    const user = await User.findOne({ email }).select('+password')

    if (!user) throw new Error("User or email does not exist")

    const isMatch = await user.matchPassword(password)

    if (!isMatch) throw new Error('Invalid Credentials')

    sendTokenResponse(user, 200, res)
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
    login
}
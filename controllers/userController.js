const User = require('../models/User');

// For '/user' endpoints
const getUsers = async (req, res, next) => {

    const filter = {}
    const options = {}
    // if req has query params, destructure them into the various variables:
    if (Object.keys(req.query).length) {
        const {
            limit,
            sortByAge,
            userName,
            age,
            //gender,
        } = req.query

        if (userName) filter.userName = userName
        if (age) filter.age = age
        
        if (limit) options.limit = limit
        if (sortByAge) options.sort = {
            category: sortByAge === 'asc' ? 1 : -1
        }
    }

    try {
        const users = await User.find()        
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
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json( user )
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

module.exports = {
    getUsers,
    postUser,
    deleteUsers,

    getUser,
    updateUser,
    deleteUser
}
// this will check if there is auth in the header and make sure its a JWT
// this will decode the JWT and use the decoded id to look up the user
// this user will be appended to the request and passed on to other requests
// placed as middleware at getUser (get one user) endpoint

const User = require('../models/User');
const jwt = require('jsonwebtoken')

const protectedRoute = async (req, res, next) => {
    let token;
    
    console.log("Headers: ", req.headers)

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        next( new Error('Not authorized to access this route (auth)'))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded JWT: ", decoded)

        req.user = await User.findById(decoded.id)
        console.log("User: ", req.user)
        
        next()
    } catch (error) {
        next( new Error('Error processing the JWT token! (auth)') )
    }
}

module.exports = protectedRoute
// For '/user' endpoints
const getUsers = (req, res, next) => {

    if (Object.keys(req.query).length) {
        const {
            userName,
            gender,
        } = req.query

        const filter = []

        if (userName) filter.push(userName)
        if (gender) filter.push(gender)

        for (const query of filter) {
            console.log(`Searching user by: ${query}`)
        }
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Show me all the users!' })
}

const postUser = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Create a new user.' })
}

const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: 'Delete the users.' })
}


//  For '/user/:userId' endpoints
const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `show me the user with the ID of ${req.params.userId}` })
}

const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `update the user with the ID of ${req.params.userId}` })
}

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ message: `delete the user with the ID of ${req.params.userId}` })
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,

    getUser,
    updateUser,
    deleteUser
}
// For testing out features...

const getTest = (req, res, next) => {
    try {
        console.log(req.headers)
        res
        // .status(200)
        // .setHeader('Content-Type', 'text/html')
        .sendFile(__dirname + "/test.html")
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTest
}
const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) =>{
    //Extract the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error : 'unauthorized'})

    try {
        //verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //Attach user info to the request object
        req.user = decoded
        next();
    } catch (error) {
        console.error(err)
        res.status(401).json({error : 'invalid token'})
    }
}

//generate JWT token
const generateToken = (userData) =>{
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn : 3000})
}

module.exports = {jwtAuthMiddleware, generateToken}
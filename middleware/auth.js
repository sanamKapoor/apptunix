const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        if(req.user){
            next()
        } else {
            const token = req.headers.authorization;
            if(!token){
                return res.status(403).json({ msg: "Unauthenticated" })
            }
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if(err){
                    return res.status(400).json({ msg: 'Invalid Token' })
                }
                req.user = decoded.id;
                next(); 
            });
        } 
    } catch (error) {
        return res.status(500).json({ msg: "Server Error with Authentication" })
    }
}
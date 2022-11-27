const jwt = require('jsonwebtoken');
const JWT_SECRET = "uditsharma";

const fetchUser = (req, res, next) => {
    
    const token = req.header('auth-token');
    if(!token) return res.status(400).json({msg: "Invalid Token", success: false});

    try {
        
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) { res.status(500).json({msg: "Internal Server Error", success: false}) }

}

module.exports = fetchUser;
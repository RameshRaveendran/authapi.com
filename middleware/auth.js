const jwt = require('jsonwebtoken');

const authmiddleware = (req ,res , next) => {
    try {
        // read header
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                message: 'No token provided'
            });
        }
        // extract token
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({
                message: 'Invalid token format'
            });
        }
        // varify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // attach user info
        req.user = decoded;
        // continue
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

module.exports = authmiddleware;
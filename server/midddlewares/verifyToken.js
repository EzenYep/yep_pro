const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ error: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate token' });
        }
        // if everything good, save to request for use in other routes
        req.user = {
            id: decoded.member_id,
            state: decoded.member_state,
        };
        next();
    });
};

module.exports = verifyToken;
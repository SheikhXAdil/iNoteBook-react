const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Adilisagoodboy';

const fetchuser = (req,res,next) => {
// GET user id from jwt token and append to req object
    const token = req.header("auth-token")
    if (!token) {
        return res.status(401).json({ errors: "please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        
    } catch (error) {
        return res.status(401).json({ errors: "please authenticate using a valid token" });
    }
    next()

}

module.exports = fetchuser
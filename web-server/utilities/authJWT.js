import jwt from 'jsonwebtoken';


const authenticateJWT = (req, res, next) => {
    let token = req.header('Authorization');
    
    // If token is not found in the Authorization header, try to get it from cookies
    if (!token && req.cookies) {
        token = req.cookies.token;
        console.debug('authenticateJWT token from cookies: ', token);
    }
  
    if (!token) {
        console.debug('Access Denied');
        return res.redirect('../static/login.html');
        //return res.status(401).send('Access Denied');
    }
    
    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

export default authenticateJWT;
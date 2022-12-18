const jwt = require('jsonwebtoken');
const responseMessage = require('../response.json')

exports.userAuthentication = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 'admindata', (err, user) => {

            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json(responseMessage.AuthenticationError);
    }
}


exports.adminAuthentication = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, 'userdata', (err, user) => {
            if (err) {

            }
            req.user = user;
            next();
        });
    }
    else {
        return res.status(401).json(responseMessage.AuthenticationError);
    }
}

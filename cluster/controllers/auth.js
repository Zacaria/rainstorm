import jwt from 'jsonwebtoken';

import config from '../config';

/**
 * Authentication based on apiKeyClient setup in app config.
 * @param req
 * @param res
 * @returns return json web token if api key valid
 */
function authentication(req, res) {
    if (req.headers['api-key'] === config().apiKeyClient) {
        let token = jwt.sign(config().apiKeyClient, config().apiKeyPrivate);
        return res.json({message: 'Login success.', token: token});
    } else {
        return res.status(403).json({success: false, message: 'Invalid apiKey.'});
    }
}

/**
 * Token validation.
 * @param req
 * @param res
 * @param next
 * @returns return 403 error with message if token is invalid
 */
function isValidToken(req, res, next) {
    // check header or url parameters or post parameters for token
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config().apiKeyPrivate, function (err, decoded) {
            if (err) {
                return res.status(403).json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

export default {authentication, isValidToken}
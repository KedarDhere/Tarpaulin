const jwt = require('jsonwebtoken')

const secret = "SuperSecret"

exports.generateAuthToken = function (userId) {
    const payload = { sub: userId }

    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

exports.requireAuthentication = function (req, res, next) {
    const authHeader = req.get('authorization') || ''
    const authParts = authHeader.split(' ')
    const token = authParts[0] === 'Bearer' ? authParts[1] : null

    try {
        const payload = jwt.verify(token, secret)
        console.log("== payload:", payload)
        req.user = payload.sub
        next()
    } catch (err) {
        res.status(401).send({
            err: "Invalid authentication token"
        })
    }
}

exports.getAuthenticatedUser = function (req, res, next) {
    const authHeader = req.get('authorization') || ''
    const authParts = authHeader.split(' ')
    const token = authParts[0] === 'Bearer' ? authParts[1] : null

    try {
        const payload = jwt.verify(token, secret)
        console.log("== payload:", payload)
        return payload.sub
    } catch (err) {
        return null
    }
}
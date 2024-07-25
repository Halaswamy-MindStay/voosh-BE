const jwt = require('jsonwebtoken')

const User = require('../models/userModel')


const jwtverify = async (req, resp, next) => {
    const { authorization } = req.headers

    const token = authorization?.split(" ")[1]

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)

            const user = await User.findById({ _id: decoded._id })

            if (user) {
                next()
            }

        }
        catch {
            return resp.status(200).send({ success: false, message: "Unauth" });
        }
    }
    else {
        console.log("not token in header")
        return resp.status(200).send({ success: false, message: "No Token Provided" });
    }

}

module.exports = { jwtverify }
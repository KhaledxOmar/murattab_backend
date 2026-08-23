import jwt from "jsonwebtoken"

const generateToken = (userId, res) => {
    const payload = {id: userId}
    const token = jwt.sign(payload, process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    })

    // setting the cookies
    res.cookie("jwt", token, {
        httpOnly: true, // user's browser can't access the token
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // stop the browser from sending this cookie on cross site request which will protects against csrf attacks
        maxAge: (1000 * 60 * 60 * 24) * 7
    })

    return token
}

export {generateToken}
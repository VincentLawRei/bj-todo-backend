const bcrypt = require('bcryptjs')
const Models = require('../models')
const { User } = Models
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const Signup = async function (req, res) {
    try {
        const { username, email, password } = req.body

        if (!username || !password || !email) {
            return res.send({
                message: "Fill all fields"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username: username, email: email, password: hashedPassword
        }

        await User.create(newUser)
        res.send(newUser)
    } catch (error) {
        res.send(error)
    }
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

const Login = async function (req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username: username } });

        if (!user) {
            return res.status(400).json({ message: "Invalid username" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const refreshToken = crypto.randomBytes(64).toString("hex");

        user.refreshToken = refreshToken;
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Logged in successfully", token, refreshToken, username: user.username });
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    Signup, Login, authenticateToken
}

const express = require("express");
const passport = require("passport");
require('dotenv').config();
require("./passport-config")(passport);

const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(session({
    secret: process.env.JWT_SECRET, resave: false, saveUninitialized: false
}));
app.use(flash())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize());

const { authRouter } = require("./routes/auth");
app.use("/auth", authRouter);

const { router } = require("./routes/todos");
app.use("/todos", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
});

const db = require('./models');

db.sequelize.sync({ force: false }).then(() => {
    console.log('DROP and RESYNC')
});

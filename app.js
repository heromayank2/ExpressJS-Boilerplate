const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport');
const BodyParser = require('body-parser')
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// MongoDB Configuration 
mongoose.connect(process.env.DB_KEY);
mongoose.set('debug', true);

// Setting up routes
require('./models/User');
require('./models/Admin')
require('./models/Facilites')
require('./models/Package')
require('./config/passport')

app.use(require('./routes'))
app.get('/*', (req, res) => {
        return res.send("No! Nothing Here")
    })
    // Listening to Server
app.listen(PORT, console.log("Listening on PORT " + PORT));
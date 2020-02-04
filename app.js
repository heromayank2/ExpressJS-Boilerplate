const express = require('express')
const mongoose = require('mongoose');
const passport = require('passport');
const BodyParser = require('body-parser')
const session = require('express-session');
var cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(cors());
app.use(session({ secret: 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// MongoDB Configuration 
// const db = 'mongodb://127.0.0.1:27017/radissondubai'
mongoose
    .connect(
        db, { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

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
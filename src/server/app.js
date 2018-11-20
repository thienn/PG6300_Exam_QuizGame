/*
    A lot of this is based on lectures and code from - https://github.com/arcuri82/pg6300
    For structure. Done modifications for it to work with my passport + get questions from another file
*/

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

//Auth
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const authApi = require('./routes/authApi');
const Users = require('./db/users');
const session = require('express-session');

const app = express();

// server instance of the app
const server = http.createServer(app);

// createes socket of the server using the instance 
const io = socketIO(server);

// for parsing the json object - middleware
//app.use(express.json());
app.use(bodyParser.json());

app.use(session({
    secret: 'used to encrypt the session cookies',
    resave: false,
    saveUninitialized: false
}));

//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

// Pass in the userId as both username and password for passport to bypass the need of password
passport.use(new LocalStrategy( 
    {
        usernameField: 'userId',
        passwordField: 'userId'
    },
    // a default req as it doesn't have a password argument to pass in
    function (userId, req, done) {
        const ok = Users.verifyUser(userId);

        if (!ok) {
            return done(null, false, {message: 'Invalid username'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    console.log(`User logged in: ${user.id}`);
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = Users.getUser(id);

    if (user !== null) {
        console.log(`User logged out: ${user.id}`);
        done(null, user);
    } else {
        done(null, false)
    }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authApi);

// In-memory array for simulating DB - gets the object array from another file for cleaner code
const questions = require('./questions').questions;

// Send the In-memory array through RESTful-API call
app.get('/api/questions', (req, res) => {
    res.send(questions);
});

/* Currently not in use for current functionality, but will keep it here for the future expanding
// Get single object from the API
app.get('/api/questions/:id', (req, res) => {
    // Get the specific id from the request based on the parameters given
   // res.send(req.params.id);
   // search through the questions array, then match up the query id with the id in the array. (parse from string to Int)
   const question = questions.find(q => q.id === parseInt(req.params.id));
   if (!question) res.status(404).send('The question was not found in the DB'); // error handler if it doesn't find the question
   res.send(question);
});
*/

/* Post to the modify the questions set. Currently not implemented
app.post('/api/questions', (req, res) => {
    const question = {
        id: questions.length + 1, // let the id be the length + 1, add at the end
        name: req.body.name 
    };
    questions.push(question); // Push the new questionset to the array
    res.send(question); // Send info to the clients about the new object
});
*/

module.exports = app;


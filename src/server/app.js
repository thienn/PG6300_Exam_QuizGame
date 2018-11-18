const express = require('express');
//const path = require('path');
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

/*
// socket connection - check if there is anny connected clients
io.on('connection', socket => {
    //console.log('User connected');
    //console.log(`User connected - ID: ${this.socket}`);

    
    // Method that will check for the challback function (listen to the clients)
    socket.on('change color', (color) => {
        // Once the data is taken in on the server side, it can the be emitted (sent) to all the connected clients
        console.log('Color changed to: ', color) // just for testing
        // the real emit
        io.sockets.emit('change color', color)

    });
    

    // For when the user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
}); */

passport.use(new LocalStrategy( 
    {
        usernameField: 'userId',
        passwordField: 'userId'
    },
    function (userId, done) {
        const ok = Users.verifyUser(userId);

        if (!ok) {
            return done(null, false, {message: 'Invalid username'});
        }

        const user = Users.getUser(userId);
        return done(null, user);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = Users.getUser(id);

    if (user !== null) {
        done(null, user);
    } else {
        done(null, false)
    }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authApi);

// In-memory array for simulating DB
const questions = [
    { id: 1, name: 'questionset1',
        'answers_options': ['First', 'Second', 'Third', 'Fourth'],
        'correct_answer': 'Third'
    },
    { id: 2, name: 'questionset2',
    'answers_options': ['First', 'Second', 'Third', 'Fourth'],
    'correct_answer': 'Third'
    },
    { id: 3, name: 'questionset3',
    'answers_options': ['First', 'Second', 'Third', 'Fourth'],
    'correct_answer': 'Third'
    }
]


// In-memory array to act as "database"
app.get('/api/questions', (req, res) => {
    //res.send([1, 2, 3]);
    res.send(questions);
});

// Get single item from the api
app.get('/api/questions/:id', (req, res) => {
    // Get the specific id from the request based on the parameters given
   // res.send(req.params.id);
   // search through the questions array, then match up the query id with the id in the array. (parse from string to Int)
   const question = questions.find(q => q.id === parseInt(req.params.id));
   if (!question) res.status(404).send('The question was not found in the DB'); // error handler if it doesn't find the question
   res.send(question);
});

// req.query


app.post('/api/questions', (req, res) => {
    const question = {
        id: questions.length + 1, // let the id be the length + 1, add at the end
        name: req.body.name 
    };
    questions.push(question); // Push the new questionset to the array
    res.send(question); // Send info to the clients about the new object
});

module.exports = app;


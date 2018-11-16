const express = require('express');
//const path = require('path');

const app = express();

// for parsing the json object - middleware
app.use(express.json());

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

//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

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


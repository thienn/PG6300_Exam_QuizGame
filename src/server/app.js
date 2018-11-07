const express = require('express');
//const path = require('path');

const app = express();

//needed to server static files, like HTML, CSS and JS.
app.use(express.static('public'));

module.exports = app;


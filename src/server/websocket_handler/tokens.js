/*
Base setup for web sockets and sessions is from the lecture 8 + 11. 
In relation to web sockets and tokens for session handling. 
Modified it for my use whenever necessary, but the original credits go to https://github.com/arcuri82/pg6300.
This one mostly untouched other than some changes to variable names + comments in my own words to understand the process better
*/
const crypto = require("crypto");

// map from random tokens to userID
const tokens = new Map();

const randomId = () => {
    // create a random id based on a format
    return crypto.randomBytes(10).toString('hex');
};

// associate a new random token to a user
const createToken = (UserId) => {
    const token = randomId();
    // add the userId and token to the Map array
    tokens.set(token, UserId);

    return token;
};

// To ensure it get consumed and only be used once. New token will be generated next time the user need to authenticate again
// In short: Access the tokens array map and clean up
const consumeToken = (token) => {
    const userId = tokens.get(token); 

    tokens.delete(t);

    return userId;
};

module.exports = { createToken, consumeToken}; // export the available methods to the outside componenets

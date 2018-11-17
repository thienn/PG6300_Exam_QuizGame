/*
    Setup from - https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/server.js
*/

const app = require("./app");
const WsHandler = require('./websocket_handler/websocket_handler');

// connect the server to the app
const server = require('http').Server(app);


// Start the server
WsHandler.start(server);


server.listen(process.env.PORT || 8080, () => {
    console.log('Starting Express server');
});


/*
    Setup of structure taken from - https://github.com/arcuri82/pg6300/blob/master/les11/connect4-v2/src/server/ws/ws_handler.js 
    Modified for my own use 
*/

const socketIo = require('socket.io');
const Tokens = require('./tokens');

const ActivePlayers = require('../online/active_players');

let io;

const start = (server) => {
    // Start a webscoket server besides the rest api from express
    io = socketIo(server);

    // Whenever a new client connects, an event emitter is sent to the server.
    // This will connect that to the socket and take care of the connection server-client(s) (websocket style)
    io.on('connection', function(socket) {
       
        console.log('A user connected test - above login')
        
        socket.on('login', (data) => {
            if(data === null || data === undefined) {
                socket.emit("update", {error: "No payload provided"});
                return;
            };

            // Create with tokens for session handling  
            const token = data.wstoken;

            if(token === null || token === undefined) {
                socket.emit("update", {error: "Missing token"});
                return;
            };

            // consume the token after it has been used. Need to get a new one if the user want another session
            const userId = Tokens.consumeToken(token); // consume based on the userId that is connected to the token
            
            if(userId === null || userId === undefined ) {
                socket.emit("update", {error: "Invalid token"});
                return;
            };

            // If it was a valid token for session, run like normal
            console.log(`User ${userId} is now connected to a websocket.`);
           
        });

        // Disconnect 
        socket.on('disconnect', () => {
            // Implement active players & stop ongoing matches when it's implemented
            const userId = ActivePlayers.getUser(socket.id);

            console.log(`User ${userId} disconnected`);
        });

    });

};

module.exports = {start}; // export the start method call
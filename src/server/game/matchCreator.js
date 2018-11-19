const crypto = require('crypto');
const ActivePlayers = require('../online/active_players');
/*
    Structure taken from lecture files.
    Will handle the things between the server and client / players.
*/

class MatchCreator {
    constructor(firstPlayerId, secondPlayerId, callbackWhenFinished) {
        
        //Board state

        // Connect the players to this session of game
        this.playerIds = [firstPlayerId, secondPlayerId];

        // Give this session a random id
        this.matchId = this.randomId();

        // Websocket to handle the communication between them and the game
        this.sockets = new Map();
        // Get the socket of the active player based on their Id which was connected in the ActivePlayers.js
        this.sockets.set(firstPlayerId, ActivePlayers.getSocket(firstPlayerId));
        this.sockets.set(secondPlayerId, ActivePlayers.getSocket(secondPlayerId));

        /*
        // starting - not necessary in this game
        this.xId = this.playerIds[Math.floor(Math.random() * 2)];
        */

        // when a match is done, callbackfunction
        this.callbackWhenFinished = callbackWhenFinished;
    }

    // switch with uuid
    randomId() {
        return crypto.randomBytes(10).toString('hex');
    }

    // Starting the match
    start() {
        this.registerListener(this.playerIds[0]);
        this.registerListener(this.playerIds[1]);

        // When the match is started update the state to the players
        this.sendState(this.playerIds[0]);
        this.sendState(this.playerIds[1]);
    }

    // Listener to handle the actual communication between the websockets
    registerListener(userId) {
        // Send a message whenever a move is done (clicked a item in this case)
        const socket = this.sockets.get(userId);

        socket.removeAllListeners('insertion'); // remove all handlers

        socket.on('insertion', data => {
            if (data === null || data === undefined ) {
                socket.emit("update", {error: "No payload provided"});
                return;
            }

            const matchId = data.matchId;
            console.log(`Handing a message from ${userId} with ${matchId}`);

            if(matchId !== this.matchId) {
                console.log(`Invalid matchId: ${matchId} isn't same as ${this.matchId}`);
            }

            // Send the state to the oponent
            this.sendState(this.opponentId(userId));

            // Callback when finished

        })

    }

    // If the id is the same as the index 0, return second, or else return 0 index. As the current player would be index 1 by that point
    opponentId(userId) {
        if(userId === this.playerIds[0]) {
            return this.playerIds[1];
        }
        return this.playerIds[0];
    }


    sendState(userId) {
        console.log(`Sending update to ${userId} for match ${this.matchId}`);

        const payload = {
            data: {
                matchId: this.matchId,
                opponentId: this.opponentId(userId)
            }
        };
        const socket = this.sockets.get(userId);
        socket.emit('update', payload);
    }

    // forfeit function


}

module.exports = Match;
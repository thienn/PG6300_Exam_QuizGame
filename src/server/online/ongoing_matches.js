/*
    from lecture github 
    structure same, changed a bit for clarity.
*/

const Match = require('../game/matchCreator');

// Map from user id to ongoing match
const userIdToMatch = new Map();

// Map from matchId to ongoing match
const matchIdToMatch = new Map();

function startMatch(firstId, secondId) {
    const match = new Match(firstId, secondId, deleteMatch);
    
    console.log(`Starting a new match between: ${firstId} and ${secondId}, the id of match is ${match.matchId}`);

    userIdToMatch.set(firstId, match);
    userIdToMatch.set(secondId, match);
    matchIdToMatch.set(match.matchId, match);

    // Form the matchApi
    match.start();
}

function deleteMatch(matchId) {
    const match = matchIdToMatch.get(matchId);
    if(match === undefined ) {
        return;
    }

    match.playerIds.forEach(id => userIdToMatch.delete(id));
    matchIdToMatch.delete(match.matchId);
}

module.exports = {startMatch};
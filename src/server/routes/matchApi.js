const express = require('express');

const PlayerQueue = require('../online/player_queue');
const ActivePlayers = require('../online/active_players');

const router = express.Router();

// Create a new match, only for people who are online

router.post('/matches', (req, res) => {

    // If the user object isn't found, then send error message and stop the process
    if(!req.user) {
        res.status(401).send();
        return;
    }

    if(PlayerQueue.hasUser(req.user.id)) {
        // Already in queue, nothing to do continue
        res.status(204).send();
        return;
    }

    while (PlayerQueue.size() > 0) {
        // Get the user in front of the queue
        const opponent = PlayerQueue.takeUser();

        if(!ActivePlayers.isActive(opponent)) {
            // If the user disconnected
            continue;
        }

        res.status(201).send();
        return;

    }

    // Make the user wait if there is no one in queue
    PlayerQueue.addUser(req.user.id);
    res.status(201).send();


});

module.exports = router;
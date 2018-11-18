/*
    In memory DB to simulate users
    Taken from https://github.com/arcuri82/pg6300.

    Modifications done: removed anything with password
*/

const users = new Map();

function getUser(id) {
    return users.get(id);
};

function verifyUser(id) {
    const user = getUser(id);

    if (user === undefined ) {
        return false;
    }; 
};

function createUser(id) {
    if(getUser(id) !== undefined ) {
        return false;
    } 

    const user = {
        id: id
    };

    users.set(id, user);
    return true;
}

// Wipe
function resetAllUsers() {
    users.clear();
}

module.exports = {getUser, verifyUser, createUser, resetAllUsers };

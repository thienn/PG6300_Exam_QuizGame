/*
    https://github.com/arcuri82/pg6300
*/

// Keep track of active players and their websockets

// Maps to keep track of the two componets related to socket to user and user to socket connection

const socketToUser = new Map();

const userToSocket = new Map();

function registerSocket(socket, userId) {
    socketToUser.set(socket.id, userId);
    userToSocket.set(userId, socket);
}

// Remove from the Maps based on the socketId
function removeSocket(socketId) {
    const userId = socketToUser.get(socketId); 
    socketToUser.delete(socketId);
    userToSocket.delete(userId);
}

// Remove from the maps based on the userId
function removeUser(userId) {
    const socketId = userToSocket.get(userId).id;
    userToSocket.delete(userId);
    socketToUser.delete(socketId);
}

function isActive(userId) {
    return userToSocket.has(userId); 
}

function getSocket(userId) {
    return userToSocket.get(userId);
}

function getUser(socketId) {
    return socketToUser.get(socketId);
}

module.exports = {registerSocket, removeSocket, removeUser, isActive, getSocket, getUser } // export the methods to use from external
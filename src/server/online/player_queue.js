/*
    from lecture github

    A queue system that will match up users then connect them to a match
*/

const queue = [];

function addUser(id) {
    // If the id of user is already in the queue, don't do anything
    if(queue.includes(id)) {
        return false;
    }

    // Otherwise do as normal, push that id to the array
    queue.push(id);
    return true;
}

// For visual data + taking user out
function size() {
    return queue.length;
}

function hasUser(id) {
    return queue.includes(id);
}

function takeUser() {
    if(queue.length === 0) {
        return null;
    }   
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift 
    // Removes the item out of the array. Returns it. While the rest of the array shift it's index. Like index 2 is 1 afterwards.
    return queue.shift();
}

module.exports = { addUser, size, takeUser, hasUser };
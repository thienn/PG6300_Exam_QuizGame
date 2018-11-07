import React from 'react';

// Deconstruct the props given and pick out the following values
// ID for test purposes, the ID is connected to the single score itself
// TODO: When Accounts are implemented, connect another ID to the account to use
const HighscoreItem = ( { id, name, score} ) => (
    <div>
        <p>{name} - {score} - (ID for test) {id}}  </p>
    </div>
);
export default HighscoreItem;
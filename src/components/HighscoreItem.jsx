import React from 'react';

// Deconstruct the props given and pick out the following values
const HighscoreItem = ( {name, score} ) => (
    <div>
        <p>{name} - {score}</p>
    </div>
);
export default HighscoreItem;
const highscoreReducerDefault = [];

const highscoreReducer = (state = highscoreReducerDefault, action) => {
    switch (action.type) {
        // Prepared for when it get connected to server side
        case 'FETCH_HIGHSCORE':
            /*
            return {
                ...state,
                scores: action.payload
            };
            */
            null;
        // Used to add Score after finished game, currently only on client-side.
        case 'ADD_SCORE':
            // console.log('action called')
            return [
                ...state,
                action.score
            ];
        default:
            return state;
    }
};

export default highscoreReducer;
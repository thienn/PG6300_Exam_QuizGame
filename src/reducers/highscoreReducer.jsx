// Expenses Reducer - with default
const highscoreReducerDefault = [];

const highscoreReducer = (state = highscoreReducerDefault, action) => {
    switch (action.type) {
        case 'FETCH_HIGHSCORE':
            return {
                ...state,
                scores: action.payload
            };
        case 'ADD_SCORE':
            return null;
        default:
            return state;
    }
};

export default highscoreReducer;
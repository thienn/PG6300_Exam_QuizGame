// Expenses Reducer - with default
// Some dummy data
const highscoreReducerDefault = [];

/*
const highscoreReducerDefault = {
    scores: [],
    score: {}
};
*/

const highscoreReducer = (state = highscoreReducerDefault, action) => {
    switch (action.type) {
        case 'FETCH_HIGHSCORE':
            /*
            return {
                ...state,
                scores: action.payload
            };
            */ null;
        case 'ADD_SCORE':
            console.log('action called')
            return [
                ...state,
                action.score
            ];
        default:
            return state;
    }
};

export default highscoreReducer;
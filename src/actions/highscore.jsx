export const fetchHighscore = () => dispatch => {
    console.log('fetching');
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(scores => dispatch({
        type: FETCH_HIGHSCORE,
        payload: scores
    }));    
};
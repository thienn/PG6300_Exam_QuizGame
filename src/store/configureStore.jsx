import { createStore, combineReducers } from 'redux';
import highscoreReducer from '../reducers/highscoreReducer';
import filterReducer from '../reducers/filterReducer';

 
// now the store creation function can be called where it is necessary. To create and return it with configureStore
export default () => {
    // Store creation
    const store = createStore(
        combineReducers({
            highscore: highscoreReducer,
            filters: filterReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
};




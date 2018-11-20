import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addScore } from './actions/highscoreActions';

const store = configureStore();

// Dummy data to test out the reducers and show something in HighScore
store.dispatch(addScore( { name: 'Katherine', score: 10 }))
store.dispatch(addScore( { name: 'Katherine', score: 20 }))
store.dispatch(addScore( { name: 'Abraham', score: 20 }))
store.dispatch(addScore( { name: 'Abraham', score: 30 }))
store.dispatch(addScore( { name: 'Peter', score: 40 }))

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

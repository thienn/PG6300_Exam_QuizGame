import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addScore } from './actions/highscoreActions';

const store = configureStore();

// Dummy data to test out the reducers
store.dispatch(addScore( { name: 'Thien', score: 10 }))
store.dispatch(addScore( { name: 'ThienOther', score: 20 }))
store.dispatch(addScore( { name: 'Abraham', score: 20 }))
store.dispatch(addScore( { name: 'Abraham', score: 20 }))
store.dispatch(addScore( { name: 'Peter', score: 20 }))

console.log(store.getState());


const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

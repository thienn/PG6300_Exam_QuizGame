import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter from './routers/AppRouter';
import './styles/styles.scss';

import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const jsx = (
    <Provider store={store}>
      <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

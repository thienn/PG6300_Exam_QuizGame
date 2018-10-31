import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';

import DashboardPage from '../components/Dashboard';
import GamePage from '../components/Game';
import HighscorePage from '../components/Highscore';
import PageNotFoundPage from '../components/PageNotFound';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" exact component={DashboardPage}/>
                <Route path="/game" component={GamePage} />
                <Route path="/highscore" component={HighscorePage} />
                <Route component={PageNotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
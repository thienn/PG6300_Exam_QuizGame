import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';

import { DashboardPage } from '../components/Dashboard';
import { Home } from '../components/Home';
import { Game } from '../components/Game';
import HighscorePage from '../components/Highscore';
import PageNotFoundPage from '../components/PageNotFound';

import signup from '../components/signup';

// <Route path="/signup" exact component={signup} />

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header userId={this.state.userId}
            updateLoggedInUserId={this.updateLoggedInUserId}/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/game" component={Game} />
                <Route path="/highscore" component={HighscorePage} />
                <Route path="/signup" render={props => <signup {...props} userId={this.state.userId} updateLoggedInUserId={this.updateLoggedInUserId} /> } />
                <Route component={PageNotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
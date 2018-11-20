import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';

import { Home } from '../components/Home';
import QuizBoard from '../components/QuizBoard';
import HighscorePage from '../components/Highscore';
import { ListOfQuestions } from '../components/ListOfQuestions';
import PageNotFoundPage from '../components/PageNotFound';

import SignUp from '../components/signup';
import Login from '../components/login';

export default class AppRouter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: null
        };

        this.updateLoggedInUserId = this.updateLoggedInUserId.bind(this);

    }

    componentDidMount() {
        // check if already logged in or not
        this.checkIfAlreadyLoggedIn();
    }

    async checkIfAlreadyLoggedIn() {
        const url= "/api/user";

        let response;

        try {
            response = await fetch(url, {
                method: "get"
            });
        } catch (err) {
            this.setState({ errorMessage: "Failed to connect to server: " + err});
            return;
        }

        if ( response.status === 401) {
            // if all goes well
            // console.log('AppRouter - 401');
            this.updateLoggedInUserId(null);
            return;
        }

        if (response.status !== 200) {

        } else {
            const payload = await response.json();
            this.updateLoggedInUserId(payload.userId);
        }
    }

    updateLoggedInUserId(userId) {
        this.setState({ userId: userId });
    }

    render() {
        // console.log(this.state.userId);
        // pass the required properties to the needed places. To check for userId & if the user is logged in
        // If none of those pages are right, go to Not found page.
        return (
            <BrowserRouter>
            <div>
                <Header userId={this.state.userId}
                updateLoggedInUserId={this.updateLoggedInUserId}/>
                <Switch>
                    <Route path="/" exact render={props => <Home {...props} userId={this.state.userId} updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                    <Route path="/admin" component={ListOfQuestions} />
                    <Route path="/highscore" component={HighscorePage} />
                    <Route path="/signup" render={props => <SignUp {...props} userId={this.state.userId} updateLoggedInUserId={this.updateLoggedInUserId} /> } />
                    <Route path="/login" render={props => <Login {...props} userId={this.state.userId} updateLoggedInUserId={this.updateLoggedInUserId}/>}/>
                    <Route path="/quizboard" render={props => <QuizBoard {...props} userId={this.state.userId} />}/>
                    <Route component={PageNotFoundPage} />
                </Switch>
            </div>
        </BrowserRouter>
        )
    }
}
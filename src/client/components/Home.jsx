import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/login';

export class Home extends React.Component {
    constructor(props) {
        super(props);

        this.userLogout = this.userLogout.bind(this);
    }
    
    async userLogout() {
        const url = '/api/logout';

        let response;

        try {
            response = await fetch(url, {
                method: "post"
            });
        } catch ( error ) {
            alert(`Failed to connect to server: ${error}`);
            return;
        } 

        if (response.status !== 204) {
            alert(`Error when connecting to server: status code ${response.status}`);
        }

        // If everything goes as plan run like normal, remove logged in status and back to home
        this.props.updateLoggedInUserId(null);
        this.props.history.push('/');
    }

    // Keeping the style from lecture as it is very good structure
    contentLoggedIn(userId, loggedIn) {
        return (
            <div className="Message">
                <h3 className="loggedInMessage">Welcome {userId}</h3>
                <div>
                {loggedIn ? (
                    <Link to={'/quizboard'}>
                        <button className="buttonPlayGame">
                            Play the game
                        </button>
                    </Link>
                ) : (
                    <div>
                        Login to play the game
                    </div>
                )}
                </div>

                <div>
                <button className="buttonUI" onClick={this.userLogout}>Logout</button>
                </div>
            </div>
        );
    };

    // Login form, or send to signup
    contentNotLoggedIn() {

        /*
       // console.log("Logged in not: " + this.updateLoggedInUserId(this));
       log = this.props.updateLoggedInUserId();
        return (
            <div className="Message">
                <div className="notLoggedInMessage">Log in or create user to continue</div>
                <Login updateLoggedInUserId={log}/>
            </div>
        )
        */
       return (
        <div className="Message">
            <div className="notLoggedInMessage">Log in or create user to continue</div>
            <Link to={"/login"}>
                <button type="button" className="buttonUI">
                    Login page
                </button>
            </Link>
            <Link to={"/signup"}>
                <button type="button" className="buttonUI">
                    Register
                </button>
            </Link>
        </div>
    )
    }


    render() {
        const userId = this.props.userId;
        const loggedIn = userId !== null && userId !== undefined;

        console.log(userId + "-" + loggedIn)

        let content;
        if (userId === null || userId === undefined) {
            content = this.contentNotLoggedIn();
        } else {
            content = this.contentLoggedIn(userId, loggedIn);
        }

        // set up ternary operator or if else, If logged in show welcome to the user, if not logged in then ask them to go to sign up
        return (
            <div>
                {content}
            </div>
        )
    }
}
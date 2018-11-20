/*    
    Structure related to login / register adapted from lectures - https://github.com/arcuri82/pg6300
    Modified and adapted some parts of it to my use. Including renaming & updating different parts.
    Like ES6 for string messages + buttons instead of links
*/


import React from 'react';
import { Link } from 'react-router-dom';

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

    // Send to login or register 
    // TODO: Add the login form itself into the Home via component
    contentNotLoggedIn() {
       return (
        <div className="Message">
            <h2 className="notLoggedInMessage">Log in or create user to continue</h2>
            <Link to={"/login"}>
                <button type="button" className="buttonUI">
                    Login
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

        //console.log(userId + "-" + loggedIn)

        let content;
        if (userId === null || userId === undefined) {
            content = this.contentNotLoggedIn();
        } else {
            content = this.contentLoggedIn(userId, loggedIn);
        }
        
        return (
            <div>
                {content}
            </div>
        )
    }
}
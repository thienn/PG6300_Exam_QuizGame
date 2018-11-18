/*
    from lecture
    Removed anything related to password as I won't be using that
*/

import React from 'react';
import {withRouter} from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            errorMessage: null
        }

        this.onUserIdChange = this.onUserIdChange.bind(this);


        // async bind
        this.doSignUp = this.doSignUp.bind(this);

    }

    onUserIdChange(event) {
        this.setState({ userId: event.target.value, errorMessage: null }); //select from the DOM
    }

    async doSignUp() {
        const { userId } = this.state;

        const url = "/api/signup";

        const payload = {userId: userId};

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload) // turn object into JSON string to transfer
            });
        } catch (err) {
            this.setState({ errorMessage: "Failed to connect ot server: " + err});
            return;
        }

        if(response.status  === 400) {
            this.setState({errorMessage: "Invalid userId or password"});
            return;
        }

        if(response.stats !== 204 ) {
            this.setState({ errorMessage: "Error when connecting to server: status code " + response.status});
            return;
        }

        // If none of the conditions happens go as normal
        this.setState({ errorMessage: null });
        this.props.updateLoggedInUserId(userId);
        this.props.history.push('/'); //go back to main
    }

    render() {
        let error = <div></div>;
        if(this.state.errorMessage !== null) {
            error = <div className="errorMessage"><p>{this.state.errorMessage}</p></div>
        }

        return (
            <div>
                <div>
                    <p>User Id:</p>
                    <input type="text"
                        value={this.state.userId}
                        onChange={this.onUserIdChange} />
                </div>
                {error}

                <div className="btn" onClick={this.doSignUp}>Sign up</div>

            </div>
            
        )
    }
}

export default withRouter(SignUp);
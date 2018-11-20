/*
    Structure adapted from lectures - https://github.com/arcuri82/pg6300
    Modified so the user don't need password at all.
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
        console.log("check userId" + this.state.userId);

        const url = "/api/signup";

        const payload = {userId: userId};

        console.log("Payload: " + JSON.stringify(payload));

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload) // turn object into JSON string to transfer
            });
            console.log("Successful?" + response.status);
        } catch (err) {
            this.setState({ errorMessage: "Failed to connect ot server: " + err});
            console.log("this!" + response);
            return;
        }

        if(response.status  === 400) {
            this.setState({errorMessage: "Invalid userId or password"});
            return;
        }

        if(response.status !== 204 ) {
            this.setState({ errorMessage: "Error when connecting to server: status code " + response.status});
            return;
        }

        // If none of the conditions happens go as normal
        console.log("ALl well")
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

                <button className="buttonUI"onClick={this.doSignUp}>Sign up</button>

            </div>
            
        )
    }
}

export default withRouter(SignUp);
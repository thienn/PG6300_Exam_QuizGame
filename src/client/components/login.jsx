/*
    Structure adapted from lectures - https://github.com/arcuri82/pg6300
    Modified some of the contents like making them buttons instead of links
    And only need user Id, not password which is the normal structure of passport
*/

import React from 'react';
import {Link, withRouter} from 'react-router-dom';


class Login extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userId: "",
            errorMsg: null
        };

        this.onUserIdChange = this.onUserIdChange.bind(this);
        this.doLogIn = this.doLogIn.bind(this);
    }

    onUserIdChange(event){
        this.setState({userId: event.target.value});
    }

    async doLogIn(){
        const {userId } = this.state;
         //console.log(userId + " at start of doLogin");

        const url = "/api/login";

        const payload = {userId: userId };
        console.log("payload" + JSON.stringify(payload));

        let response;

        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({errorMsg: "Failed to connect to server: "+ err});
            return;
        }


        if(response.status === 401){
            this.setState({errorMsg: "Invalid userId"});
            return;
        }

        if(response.status !== 204){
            this.setState({errorMsg: "Error when connecting to server: status code "+ response.status});
            return;
        }

        // console.log("Got through the errors");
        this.setState({errorMsg: null});
         // console.log(userId);
        this.props.updateLoggedInUserId(userId);
        this.props.history.push('/');
    }

    render(){

        let error = <div></div>;
        if(this.state.errorMsg !== null){
            error = <div className="errorMsg"><p>{this.state.errorMsg}</p></div>
        }

        return(
            <div>
                <div>
                    <p>User Id:</p>
                    <input type="text"
                           value={this.state.userId}
                           onChange={this.onUserIdChange}/>
                </div>

                {error}

                <button className="buttonUI" onClick={this.doLogIn}>Log In</button>
                <hr />
                <Link to={"/signup"}>
                    <button className="buttonUI">
                        Register
                    </button>
                </Link>
            </div>);
    }
}

export default withRouter(Login);

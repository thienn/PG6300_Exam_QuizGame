import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userId = this.props.userId;
        const loggedIn = userId !== null && userId !== undefined;

        console.log(userId + "-" + loggedIn)

        // set up ternary operator or if else, If logged in show welcome to the user, if not logged in then ask them to go to sign up
        return (
            <div>
                homePage! Welcome { userId }
            </div>
        )
    }
}
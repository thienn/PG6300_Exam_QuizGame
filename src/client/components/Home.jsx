import React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userId = this.props.userId;
        const loggedIn = userId !== null && userId !== undefined;

        return (
            <div>
                homePage!
            </div>
        )
    }
}
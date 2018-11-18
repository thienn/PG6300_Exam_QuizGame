/*
import React from 'react';

const DashboardPage = () => (
    <div>
        This is the DashboardPage
    </div>
);

export default DashboardPage;
*/

import React from 'react';

export class DashboardPage extends React.Component {
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
            console.log('Dashboard - 401');
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
        return (
            <div>
            Logg inn
        </div>
        )
    }

}
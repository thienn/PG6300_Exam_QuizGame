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
        // call the check if logged in or not at mount
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
            // console.log('Dashboard - 401');
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
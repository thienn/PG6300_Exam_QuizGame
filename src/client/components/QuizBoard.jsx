import React from 'react';
import socketIOClient from 'socket.io-client';

import QuestionsList from './gameComponents/QuestionList';
import Results from './gameComponents/Results';

class QuizBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            error: null,
            score: 0,
            current: 1,
            player: 'Anonymous'
        }

        this.socket = socketIOClient(window.location.origin); // Bind it to the client's ip, but in this case it will always be localhost:8080

        console.log(this.socket);
        console.log(this.socket.id);
        console.log(window.location.origin); // should be http://localhost:8080 
    }

    componentDidMount() {
        this.setPlayer();
        this.fetchQuestions();
    }

    // Fetch method for questions test
    async fetchQuestions() {
        const url = "http://localhost:8080/api/questions";

        let response;
        let payload;

        // try catch to run the url
        try {
            response = await fetch(url);
            payload = await response.json(); // the payload is the JSON that you find in that link.
        } catch(err) {
            console.log(err); // console log the error
            this.setState({
                questions: null,
                error: "Error getting the questions" + err
            });
            return;
        }

        // if response is successful - set the questions object in state to the paylod
        if (response.status === 200) {
            this.setState({
                questions: payload,
                error: null
            });
        } else {
            this.setState({
                questions: null,
                error: "Issues with HTTP connection"
            });
        };
    }

    // set current state when score updates
    setCurrent(current) {
        this.setState({current});
    }

    // Set score
    setScore(score) {
        this.setState({score});
    }

    // set player 
    setPlayer() {
        this.setState({ player: this.props.userId })
        console.log("Player set")
    }

    render() {
        let statusQuestions;
        let results;
        
        if (this.state.current > this.state.questions.length) {
            statusQuestions = '';
            // Own file since it will send the request to the reducer too.
            results = <Results {...this.state}/>

        } else {
            // Since the status is so little code, felt like it didn't warant it's own file like Results
            statusQuestions = 
                <div>
                    Question {this.state.current} out of {this.state.questions.length}
                </div>
            results = '';
        }

        return (
            <div>
                <h3>Current player is: {this.state.player}</h3>
                {statusQuestions}
                <QuestionsList 
                    setScore={this.setScore.bind(this)}
                    setCurrent={this.setCurrent.bind(this)}
                    {...this.state}    
                />
                {results}
            </div>
        )
    }
}

export default QuizBoard;
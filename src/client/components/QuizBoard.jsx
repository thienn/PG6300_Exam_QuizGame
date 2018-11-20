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
            currentQuestion: 1,
            player: 'Anonymous'
        }

        this.socket = socketIOClient(window.location.origin); // Bind it to the client's ip, but in this case it will always be localhost:8080

        /* for development purposes
        console.log(this.socket);
        console.log(this.socket.id);
        console.log(window.location.origin); // should be http://localhost:8080 
        */
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

    // set currentQuestion state when something got selected (Called in Question.jsx)
    setCurrentQuestion(currentQuestion) {
        this.setState({currentQuestion});
    }

    // Set score after every turn is done (Called in Quetion.jsx)
    setScore(score) {
        this.setState({score});
    }

    // Set player - data sent in 
    setPlayer() {
        this.setState({ player: this.props.userId })
        // console.log("Player set")
    }

    render() {
        let statusQuestions;
        let results;
        
        // If the currentQuestion is smaller than the length of available questions in the state. Continue
        // Else show the results page (End page of game)
        if (this.state.currentQuestion > this.state.questions.length) {
            statusQuestions = '';
            // Own file since it will send the request to the reducer too.
            results = <Results {...this.state}/>

        } else {
            // Since the status is so little code, felt like it didn't warrant it's own file like Results
            statusQuestions = 
                <div>
                    Question {this.state.currentQuestion} out of {this.state.questions.length}
                </div>
            results = '';
        }

        return (
            <div>
                <h3>Current player is: {this.state.player}</h3>
                {statusQuestions}
                <QuestionsList 
                    setScore={this.setScore.bind(this)}
                    setCurrentQuestion={this.setCurrentQuestion.bind(this)}
                    {...this.state}    
                />
                {results}
            </div>
        )
    }
}

export default QuizBoard;
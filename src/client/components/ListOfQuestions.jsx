/*
    For admin purposes or so in the future. Question ID, Text, options and the correct answer
    Structure for sockets & reading api adapted from - https://github.com/arcuri82/pg6300/
*/

import React from 'react';
import socketIOClient from 'socket.io-client';

export class ListOfQuestions extends React.Component {
    // constructor
    constructor(props) {
        super(props)

        this.state = {
            questions: null,
            error: null,
            name: "Anonymous",
            user: null
        };

        this.socket = socketIOClient(window.location.origin); // bind it to the window (like localhost:8080) etc

        console.log(this.socket);
        console.log(this.socket.id);
        console.log(window.location.origin); // should be http://localhost:8080 

    };

    componentDidMount() {
        this.fetchQuestions();
        // At beginning of this component, run the fetch method
    }

    // Fetch method for questions from api (server)
    async fetchQuestions() {
        const url = "http://localhost:8080/api/questions";

        let response;
        let payload;

        try {
            response = await fetch(url);
            payload = await response.json(); // the payload is the JSON that you find in that url.
        } catch(err) {
            console.log(err); 
            this.setState({
                questions: null,
                error: "Error getting the questions" + err
            });
            return;
        }

        // if response is successful - add the payload from to the questions state object
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

    render() {

        // If there is any errors or questions not able to be fetched, then write out the error or no 
        // questions at the current DB / Path. Or else show the table of items (questions) from API
        let table;
        if (this.state.error !== null ) {
            table =<p>{this.state.error}</p>
        } else if (this.state.questions === null || this.state.questions.length === 0) {
            table = <p>There is no questions in the registered database</p>
        } else {
            table = <div>
            <table className="tableOfQuestions">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Options</th>
                        <th>The correct answer</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.questions.map(question => 
                        <tr key={question.id} className="oneQuestion">
                            <td>{question.id}</td>
                            <td>{question.text}</td> 
                            <td>{question.answers.map(answer => 
                                    <p key={answer.id}> {answer.id} - {answer.text}</p> 
                                )} </td>
                            <td>{question.correctAnswer}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        }
        return (
            <div>
                <h2>Questions list</h2>
                {table}
            </div>
        );

    }


}
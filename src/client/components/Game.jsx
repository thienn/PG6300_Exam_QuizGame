/*
import React from 'react';

const GamePage = () => (
    <div>
        This is the GamePage - Show the questions from JSON for test
    </div>
);

export default GamePage;

*/


import React from 'react';

export class Game extends React.Component {
    // constructor
    constructor(props) {
        super(props)

        this.state = {
            questions: null,
            error: null
        };

    };
    // component mount
    componentDidMount() {
        this.fetchQuestions();
        // At beginning of this component, run the fetch method
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

    // render
    render() {
        let table;
        if (this.state.error !== null ) {
            table =<p>{this.state.error}</p>
        } else if (this.state.questions === null || this.state.questions.length === 0) {
            table = <p>There is no books in the registered database</p>
        } else {
            table = <div>
            <table className="allQuestions">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.questions.map(question => 
                        <tr key={question.id} className="oneQuestion">
                            <td>{question.id}</td>
                            <td>{question.name}</td> 
                            <td>{question.answers_options} </td>
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
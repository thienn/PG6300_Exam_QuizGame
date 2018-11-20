/*
import React from 'react';

const GamePage = () => (
    <div>
        This is the GamePage - Show the questions from JSON for test
    </div>
);

export default GamePage;

*/

/*
    For admin purposes or so in the future. Question ID, Text, options and the correct answer
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

    /* Base init socket, so it can be manually called
    initSocket = () => {
        const socket = socketIOClient(window.location.origin)
        socket.on('connect, () => {
            console.log('connected socket from client')
        })
        this.setState({socket})
        // add socket: null to the state constructor
    }
    *7

    /*

    // method for emitting a socket.io event (send is just a name)
    // send = () => {}
    send() {
        //const socket = scoketIOClient(this.state.endpoint);
        const socket = socketIOClient('http://localhost:8080');

        // emit an event to the socket (server) with an arguemnt of something
        // will test with sending the color red
        socket.emit("update", "something");
        // can have multiple arguments socket.emit('change color, 'red, 'yellow')


    }
    */


    // component mount
    componentDidMount() {
        this.fetchQuestions();
        // At beginning of this component, run the fetch method
        // this.initSocket() // run the method at start
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

        
        // since render runs often can use it to test to see if there is any updates to the sockets
        //const socket = socketIOClient('http://localhost:8080');

        /*
        //socket.on is a method that checks for incoming events form the server 
        // this method looks for chane color in this case
        // then take the callback function as first argument
        socket.on('change color', (color) => {
            document.body.style.backgroundColor = color // set the background color to the one the argument was given
        });
        */


        let table;
        if (this.state.error !== null ) {
            table =<p>{this.state.error}</p>
        } else if (this.state.questions === null || this.state.questions.length === 0) {
            table = <p>There is no questions in the registered database</p>
        } else {
            table = <div>
            <table className="allQuestions">
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
                            <td>{question.choices.map(choice => 
                                    <p key={choice.id}> {choice.text}</p> 
                                )} </td>
                            <td>{question.correct}</td>
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
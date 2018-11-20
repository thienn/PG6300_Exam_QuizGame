import React from 'react';
import QuestionsList from './gameComponents/QuestionList';
import Results from './gameComponents/Results';

class QuizBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [
                {
                    id: 1,
                    text: 'What is React',
                    choices: [
                        {
                            id: 'a',
                            text: 'A javascript library'
                        },
                        {
                            id: 'b',
                            text: 'A framework for NodeJS'
                        },
                        {
                            id: 'c',
                            text: 'A programming lanugage'
                        },
                        {
                            id: 'd',
                            text: 'A programming lanugage'
                        }
                    ],
                    correct: 'a'
                },
                {
                    id: 2,
                    text: 'What is Express',
                    choices: [
                        {
                            id: 'a',
                            text: 'A train'
                        },
                        {
                            id: 'b',
                            text: 'Framework for NodeJS'
                        },
                        {
                            id: 'c',
                            text: 'A programming lanugage'
                        },
                        {
                            id: 'd',
                            text: 'A programming lanugage'
                        }
                    ],
                    correct: 'b'
                },
                {
                    id: 3,
                    text: 'What is typescript',
                    choices: [
                        {
                            id: 'a',
                            text: 'A superset of JavaScript'
                        },
                        {
                            id: 'b',
                            text: 'Javascript back-end'
                        },
                        {
                            id: 'c',
                            text: 'Trick'
                        },
                        {
                            id: 'd',
                            text: 'A programming lanugage'
                        }
                    ],
                    correct: 'a'
                },
            ],
            score: 0,
            current: 1
        }
    }

    // set current state when score updates
    setCurrent(current) {
        this.setState({current});
    }

    // Set score
    setScore(score) {
        this.setState({score});
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
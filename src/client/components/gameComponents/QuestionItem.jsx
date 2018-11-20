import React from 'react';

class QuestionItem extends React.Component {

    // handle the selection of item
    handleClick(event) {
        const {setCurrentQuestion, setScore, questionItem} = this.props;
        event.preventDefault(); // Prevent the default behavior of submitting the form over HTTP
        const chosenAnswer = event.target.value; // the value of the target in the DOM that you clicked
        setCurrentQuestion(this.props.currentQuestion + 1); // Move on to the next QuestionItem ( in array ) - Works for now since it is static id

        // If the chosenAnswer is right, add points to the current score or else do nothing else
        if(chosenAnswer === questionItem.correctAnswer) {
            setScore(this.props.score + 1);
        };
    };

    render() {
        const { questionItem } = this.props; // Deconstruct the props given, take only out the questionItem (one question)
        return (
            <div>
                <h3>{questionItem.text}</h3>
                <ul>
                    {
                        questionItem.answers.map(answer => {
                            return (
                                <li className="answer-item" key={answer.id}> 
                                    <button className="buttonAnswer"
                                        onClick={this.handleClick.bind(this)} 
                                        value={answer.id}
                                    >
                                        {answer.id} - {answer.text}
                                    </button>
                                </li>
                            )
                        })
                    };
                </ul>
            </div>
        );
    };
};

export default QuestionItem;
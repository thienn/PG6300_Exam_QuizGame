import React from 'react';

class Question extends React.Component {

    // handle the selection of item
    handleClick(e) {
        const {setCurrentQuestion, setScore, questionItem} = this.props;
        e.preventDefault(); // Prevent the default behavior of submitting the form over HTTP
        const chosenAnswer = e.target.value;
        setCurrentQuestion(this.props.currentQuestion + 1); // Move on to the next QuestionItem ( in array ) - Works for now since it is static

        // If the selected option is right, add points to the current score or else do nothing else
        if(chosenAnswer === questionItem.correctAnswer) {
            setScore(this.props.score + 1);
        }
    }

    render() {
        const { questionItem } = this.props; // Get the question out of the state of parent
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
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Question;
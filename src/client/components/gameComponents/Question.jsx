import React from 'react';

class Question extends React.Component {

    // handle the selection of item
    handleChange(e) {
        const {setCurrent, setScore, question} = this.props;
        e.preventDefault(); // Prevent the default behavior of submitting the form over HTTP
        const selected = e.target.value;
        setCurrent(this.props.current + 1);

        // If the selected option is right, add points to the current score or else do nothing else
        if(selected === question.correct) {
            setScore(this.props.score + 1);
        }
    }

    render() {
        const { question } = this.props;
        return (
            <div>
                <h3>{question.text}</h3>
                <hr />
                <ul className="list-group">
                    {
                        question.choices.map(choice => {
                            return (
                                <li className="list-group-item" key={choice.id}> 
                                    <input 
                                        onChange={this.handleChange.bind(this)} 
                                        type="radio" 
                                        name={question.id}
                                        value={choice.id}
                                    />
                                    {choice.id} - {choice.text}
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
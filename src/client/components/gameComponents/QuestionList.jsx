import React from 'react';
import Question from './Question.jsx';

class QuestionList extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.questions.map(questionItem => {
                        if (this.props.currentQuestion === questionItem.id) {
                            return <Question questionItem={questionItem} key={questionItem.id} {...this.props}/>
                        }
                    })
                }
            </div>
        )
    }
}

export default QuestionList;
import React from 'react';
import QuestionItem from './QuestionItem.jsx';

class QuestionList extends React.Component {
    // Loop through the questions in the state. Map to create a array of each question with help of Question.jsx
    render() {
        return (
            <div>
                {   
                    this.props.questions.map(questionItem => {
                        if (this.props.currentQuestion === questionItem.id) {
                            return (
                            <QuestionItem 
                                questionItem={questionItem} 
                                key={questionItem.id} 
                                {...this.props}
                            />
                            )
                        }
                    })
                }
            </div>
        )
    };
};

export default QuestionList;
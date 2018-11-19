import React from 'react';

class Results extends React.Component {

    render() {
        let message;

        let percent = (this.props.score / this.props.questions.length * 100);
        if(percent > 80) {
            message = 'Good score';
        } else if (percent < 80 && percent > 60) {
            message = 'Medium score';
        } else {
            message = 'Low score';
        }
        
        return (
            <div>
                <h4>You got {this.props.score} out of {this.props.questions.length}</h4>
                <h2>{percent}% - {message}</h2>
            </div>
        )
    }
}

export default Results;
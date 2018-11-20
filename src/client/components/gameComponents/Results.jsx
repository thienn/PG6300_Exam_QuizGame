import React from 'react';

class Results extends React.Component {

    render() {
        let points = (this.props.score * 10);
        
        return (
            <div>
                <h4>You got {this.props.score} out of {this.props.questions.length}</h4>
                <h1>Your score is {points} points</h1>
            </div>
        )
    }
}

export default Results;
import React from 'react';
import { addScore } from '../../actions/highscoreActions';
import { connect } from 'react-redux';

class Results extends React.Component {
    // Constructor to create one score that both render & setResults can use
    constructor(props) {
        super(props)
        this.state = {
            score: this.props.score * 10
        };
    }

    componentDidMount() {
        // Call the method when the component get called
        this.setResults();
    }

    setResults() {  
        console.log("setResults was called");
        //console.log(this.state.score + "from setResults");
        // console.log(this.props.player + " From results");
        // Since player isn't manipulated in this component, using it directly from props
        this.props.dispatch(addScore({ name: this.props.player, score: this.state.score }));
    }

    render() {
        return (
            <div>
                <h4>You got {this.props.score} out of {this.props.questions.length}</h4>
                <h1>Your score is {this.state.score} points</h1>
            </div>
            
        )
    }
}

export default connect()(Results);

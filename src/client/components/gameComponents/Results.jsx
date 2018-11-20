import React from 'react';
import { Link } from 'react-router-dom';
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

    
    componentWillUnmount() {
        console.log(this.props.questions.length)
        // Checks if the length of questions is longer than 0, as Results component get mounted at start, during QuizBoard
        // before player get to interact it start as 0. Then will call on the method before it dismount (go away from the component in any way) 
        if(this.props.questions.length > 0 ) {
            this.setResults();
        }
    }
    
    
    setResults() {  
        //console.log("setResults was called");

        // Since player isn't manipulated in this component, using it directly from props
        this.props.dispatch(addScore({ name: this.props.player, score: this.state.score }));
    }

    render() {
        return (
            <div>
                <h4>You got {this.props.score} out of {this.props.questions.length}</h4>
                <h1>Your total is {this.state.score} points</h1>

                <Link to={'/highscore'}>
                    <button type="button" className="buttonUI">
                        Highscore
                    </button>
                </Link>
                <Link to={'/'}>
                    <button type="button" className="buttonUI">
                        Home
                    </button>
                </Link>
            </div>
        )
    }
}

export default connect()(Results);

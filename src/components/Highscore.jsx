import React from 'react';
import { connect } from 'react-redux';

import HighscoreItem from './HighscoreItem';

const HighscorePage = (props) => (
    <div>
        <h1>Highscore: (Provided by Highscore.jsx)</h1>
        {console.log(props.highscore)}
        {props.highscore.map((score) => {
            return <HighscoreItem key={score.name} {...score}/>
        })}
    </div>
);

const mapStateToProps = (state) => {
    console.log('Action called from highscore')
    console.log(state)
    return {
        highscore: state.highscore,
    }
}

export default connect(mapStateToProps)(HighscorePage);


import React from 'react';
import { connect } from 'react-redux';

import HighscoreItem from './HighscoreItem';
import HighscoreFilters from './HighscoreFilters';

import selectFilters from '../selectors/filterSelector';

const HighscorePage = (props) => (
    <div>
        <HighscoreFilters />
        <h1>Highscore: (Provided by Highscore.jsx)</h1>
        {console.log(props.highscore)}
        {props.highscore.map((score) => {
            return <HighscoreItem key={score.id} {...score}/>
        })}
    </div>
);

const mapStateToProps = (state) => {
    console.log('Action called from highscore')
    console.log(state)
    /*
    return {
        highscore: state.highscore,
    }
    */
   // Connects the redux store state highscore with the redux state filters to return the array of values that have gone through the filters
   return {
       highscore: selectFilters(state.highscore, state.filters)
   };
};

export default connect(mapStateToProps)(HighscorePage);


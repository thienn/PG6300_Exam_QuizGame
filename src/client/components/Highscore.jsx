import React from 'react';
import { connect } from 'react-redux';

import HighscoreItem from './HighscoreItem';
import HighscoreFilters from './HighscoreFilters';

import selectFilters from '../selectors/filterSelector';

const HighscorePage = (props) => (
    <div>
        <h2>Highscore</h2>
        Search by user ID
        <HighscoreFilters />

        {props.highscore.map((score) => {
            return <HighscoreItem key={score.id} {...score}/>
        })}
    </div>
);

const mapStateToProps = (state) => {
    //console.log('Action called from highscore')
    
   // Connects the redux store state highscore with the redux state filters to return the array of values that have gone through the filters
   return {
       highscore: selectFilters(state.highscore, state.filters)
   };
};

export default connect(mapStateToProps)(HighscorePage);


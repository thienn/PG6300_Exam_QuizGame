import React from 'react';
import { connect } from 'react-redux';
import { setNameFilter, sortByScore } from '../actions/filterActions';

class HighscoreFilters extends React.Component {
    render() {
        // collects the value in the DOM.target in input field, dispatch that to the filterActions to decide what to do with that value
        return (
            <div>
                <input type="text" value={this.props.filters.text} onChange={(e) => {
                    this.props.dispatch(setNameFilter(e.target.value));
                }} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(HighscoreFilters);
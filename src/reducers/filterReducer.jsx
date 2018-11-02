const filterReducerDefault = {
    name: '',
    sortBy: 'score'
};

export default (state = filterReducerDefault, action) => {
    switch(action.type) {
        case 'FILTER_NAME':
            return {
                ...state,
                name: action.text
            }
        case 'SORT_BY_SCORE':
            return {
                ...state,
                sortBy: 'score'
            }
        default: 
            return state;
    }
}
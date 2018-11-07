export const setNameFilter = ( text = '') => ({
    type: 'FILTER_NAME',
    text
});

export const sortByScore = () => ({
    type: 'SORT_BY_SCORE'
});
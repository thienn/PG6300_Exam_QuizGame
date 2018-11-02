export default (highscore, { name, sortBy }) => {
    // Simple filter name system that will match the name of the score with the text given in the input field, only return if those two match
    // Currently in it's own file as it will be expanded upon later for sortBy scores, games etc
    return highscore.filter((score) => {
        const textMatch = score.name.toLowerCase().includes(name.toLowerCase());
        return textMatch;
    });
}
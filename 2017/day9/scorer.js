const groupParser = require('./groupParser')

module.exports = (input) => {
    const groups = groupParser(input)

    return calculateChildScore(groups)
}

function calculateChildScore(groups) {
    const childScores = groups.children
        .map(c => calculateChildScore(c))
        .reduce((prev, current) => prev + current, 0)
    
    return groups.score + childScores
}

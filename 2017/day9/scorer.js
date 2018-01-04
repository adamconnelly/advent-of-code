const groupParser = require('./groupParser')

module.exports.calculateScore = function calculateScore(input) {
    const groups = groupParser(input)

    return calculateChildScore(groups)
}

module.exports.countGarbage = function countGarbage(input) {
    const groups = groupParser(input)

    return groups.garbageCount
}

function calculateChildScore(groups) {
    const childScores = groups.children
        .map(c => calculateChildScore(c))
        .reduce((prev, current) => prev + current, 0)
    
    return groups.score + childScores
}

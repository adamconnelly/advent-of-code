/**
 * Walks the tower and adds a new totalWeight property to each node
 * which is the combination of its weight plus all the sub tower weights.
 * @param {*} tower The tower
 */
module.exports = (tower) => {
    calculateWeight(tower.bottomProgram)
}

function calculateWeight(tower) {
    let childWeights = 0
    if (tower.subTowers) {
        childWeights = tower.subTowers
            .reduce((previous, current) => previous + calculateWeight(current), 0)
    }
    
    tower.totalWeight = tower.weight + childWeights

    return tower.totalWeight
}
const towerParser = require('./towerParser')
const toposort = require('toposort')

/**
 * Sorts the towers represented by the specified input.
 * 
 * @param {String} input The newline separated tower strings.
 */
module.exports = (input) => {
    const towers = input.split('\n').map(towerString => towerParser(towerString))
    const towerMap = towers.reduce((previous, current) => {
        previous[current.name] = current
        return previous
    }, {})
    buildTowers(towers, towerMap)
    const bottomTower = findBottomTower(towers)
    
    return {
        bottom: bottomTower,
        bottomProgram: towers.find(t => t.name === bottomTower)
    }
}

function findBottomTower(towers) {
    if (towers.length === 1) {
        return towers[0].name
    }

    const flattenedTowers = towers
        .map(tower => tower.subTowers.map(subTower => [subTower.name, tower.name]))
        .reduce((previous, current) => previous.concat(current), [])
    const result = toposort(flattenedTowers).reverse()

    return result[0]
}

function buildTowers(rawTowers, towerMap) {
    rawTowers.forEach(tower => {
        tower.subTowers = tower.subTowers.map(t=>towerMap[t])
    })
}
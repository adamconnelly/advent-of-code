const towerParser = require('./towerParser')
const toposort = require('toposort')

/**
 * Sorts the towers represented by the specified input.
 * 
 * @param {String} input The newline separated tower strings.
 */
module.exports = (input) => {
    const towers = input.split('\n').map(towerString => towerParser(towerString))
    const flattenedTowers = towers
        .map(tower => tower.subTowers.map(subTower => [subTower, tower.name]))
        .reduce((previous, current) => previous.concat(current), [])
    
    const result = toposort(flattenedTowers).reverse()
    
    return {
        bottom: result[0]
    }
}
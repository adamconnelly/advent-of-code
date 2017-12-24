const towerRegex = /([a-z]+) \((\d+)\)(?: -> (.+))?/

/**
 * Parses the specified input string to return an object representing the tower.
 * 
 * @param {String} towerString The string in the format <name> (<weight>) [-> <subTower1>, <subTowerN>]
 */
module.exports = (towerString) => {
    const match = towerRegex.exec(towerString)
    if (!match) {
        throw 'The tower string must be in the format: <name> (<weight>) [-> <subTower1>, <subTowerN>]'
    }

    const tower = {
        name: match[1],
        weight: parseInt(match[2]),
        subTowers: []
    }

    if (match[3]) {
        tower.subTowers = match[3].split(', ')
    }

    return tower
}
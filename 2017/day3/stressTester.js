const { spiralGenerator } = require('./spiral')

/**
 * Returns an iterator that returns a value for each square in
 * the stress test.
 */
module.exports = function *stressTestGenerator() {
    let resultMap = {}

    for (let coordinate of spiralGenerator()) {
        let value = 0

        if (coordinate.x === 0 && coordinate.y === 0) {
            value = 1
        } else {

            for (let adjacent of calculateAdjacent(coordinate)) {
                let adjacentValue = resultMap[getCoordinateKey(adjacent)]
                if (adjacentValue) {
                    value += adjacentValue
                }
            }
        }

        resultMap[getCoordinateKey(coordinate)] = value
        yield value
    }
}

/**
 * Calculates all the coordinates that are adjacent to the specified coordinate
 * @param {*} coordinate the coordinate
 */
function calculateAdjacent(coordinate) {
    return [
        { x: coordinate.x - 1, y: coordinate.y - 1 },
        { x: coordinate.x - 1, y: coordinate.y },
        { x: coordinate.x - 1, y: coordinate.y + 1 },
        { x: coordinate.x, y: coordinate.y - 1 },
        { x: coordinate.x, y: coordinate.y + 1 },
        { x: coordinate.x + 1, y: coordinate.y - 1 },
        { x: coordinate.x + 1, y: coordinate.y },
        { x: coordinate.x + 1, y: coordinate.y + 1 }
    ]
}

/**
 * Returns a string representation of the coordinate that can be
 * used as the key for doing lookups in a map object.
 * @param {*} coordinate the coordinate
 */
function getCoordinateKey(coordinate) {
    return `${coordinate.x},${coordinate.y}`
}

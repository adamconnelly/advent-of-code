const directions = {
    right: 'right',
    up: 'up',
    left: 'left',
    down: 'down'
}

/**
 * Converts a memory square to a coordinate.
 * 
 * @param {Number} square the square of memory
 */
module.exports = (square) => {
    let currentDirection = directions.right
    let currentCoordinate = { x: 0, y: 0 }
    let currentSquare = 1
    let stepsToTake = 1
    let incrementSteps = false

    while (currentSquare < square) {
        for(let i = 0; i < stepsToTake; i++) {
            takeStep(currentCoordinate, currentDirection)
            currentSquare++

            if (currentSquare === square) {
                return currentCoordinate
            }
        }

        currentDirection = calculateNextDirection(currentDirection)
        stepsToTake = calculateNumberOfSteps(stepsToTake, incrementSteps)

        incrementSteps = !incrementSteps
    }
    
    return currentCoordinate
}

function takeStep(currentCoordinate, currentDirection) {
    if (currentDirection === directions.right) {
        currentCoordinate.x++
    } else if(currentDirection === directions.up) {
        currentCoordinate.y++
    } else if(currentDirection === directions.left) {
        currentCoordinate.x--
    } else if(currentDirection === directions.down) {
        currentCoordinate.y--
    }
}

function calculateNextDirection(currentDirection) {
    if (currentDirection === directions.right) {
        return directions.up
    } else if(currentDirection === directions.up) {
        return directions.left
    } else if(currentDirection === directions.left) {
        return directions.down
    }

    return directions.right
}

function calculateNumberOfSteps(stepsToTake, incrementSteps) {
    if (incrementSteps) {
        return stepsToTake + 1
    }

    return stepsToTake
}
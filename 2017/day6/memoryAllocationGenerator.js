const redistribute = require('./blockRedistributor')

/**
 * Returns an interable that reallocates the memory in the specified
 * banks until an infinite loop is detected. Each interation returns
 * a context object containing the current state of the memory banks,
 * along with the number of cycles that have been executed.
 * 
 * @param {Array} banks the memory banks to be reallocated
 */
module.exports = function *(banks) {
    const context = {
        cycles: 0,
        banks: banks
    }

    yield context

    const previousStates = {}
    let currentState = getStateDescription(context.banks)
    previousStates[currentState] = 0

    while (true)
    {
        context.banks = redistribute(context.banks)
        context.cycles++
        currentState = getStateDescription(context.banks)
        yield context

        if (previousStates[currentState]) {
            context.cyclesBetweenDuplicates = context.cycles - previousStates[currentState]
            break
        }

        previousStates[currentState] = context.cycles
    }
}

/**
 * Gets a description of the state of the memory banks that can
 * be used as a key in an object hash.
 * 
 * @param {Array} banks the memory banks
 */
function getStateDescription(banks) {
    return banks.join(',')
}

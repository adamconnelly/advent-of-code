module.exports.part1Executor = function(currentState) {
    const currentInstruction = currentState.instructions[currentState.offset]
    currentState.instructions[currentState.offset]++
    currentState.offset += currentInstruction
    currentState.executed++

    return currentState
}

module.exports.part2Executor = function(currentState) {
    const currentInstruction = currentState.instructions[currentState.offset]
    currentState.instructions[currentState.offset] += currentInstruction >= 3 ? -1 : 1
    currentState.offset += currentInstruction
    currentState.executed++

    return currentState
}

/**
 * Returns a generator that can be used to execute the specified jump
 * instructions.
 * 
 * @param {String} jumpInstructions The jump instructions. Newline separated.
 * @param {Function} executor A function that executes the current instruction.
 */
module.exports.jumpProcessorGenerator = function *(jumpInstructions, executor) {
    executor = executor || module.exports.part1Executor

    let currentState = {
        instructions: jumpInstructions.split('\n').map(i => parseInt(i)),
        offset: 0,
        executed: 0
    }

    yield currentState

    while (currentState.offset >= 0 && currentState.offset < currentState.instructions.length) {
        currentState = executor(currentState)

        yield currentState
    }
}
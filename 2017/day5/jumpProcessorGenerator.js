module.exports = function *jumpProcessorGenerator(jumpInstructions) {
    const currentState = {
        instructions: jumpInstructions.split('\n').map(i => parseInt(i)),
        offset: 0,
        executed: 0
    }

    currentState.toString = (maxInstructions) => {
        const startOffset = maxInstructions ? Math.max(currentState.offset - maxInstructions / 2, 0) : 0
        const endOffset = maxInstructions ? Math.min(currentState.offset + maxInstructions / 2, currentState.instructions.length + 1) : currentState.instructions.length + 1

        return currentState.instructions.slice(startOffset, endOffset).map((instruction, index) => {
            if (index === currentState.offset) {
                return `(${instruction})`
            }

            return instruction
        }).join(' ')
    }

    yield currentState

    while (currentState.offset >= 0 && currentState.offset < currentState.instructions.length) {
        const { offset, instructions } = currentState
        const currentInstruction = instructions[offset]
        currentState.offset += currentInstruction
        currentState.instructions[offset] = currentInstruction + 1
        currentState.executed++

        yield currentState
    }
}
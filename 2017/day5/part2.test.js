const { part2Executor, jumpProcessorGenerator } = require('./jumpProcessor')
const { PUZZLE_INPUT } = require('./puzzle')

describe('part2Executor', () => {
    it('decrements instruction if offset is 3', () => {
        // Arrange
        const currentState = {
            instructions: [3, 1, 2, 2, 8],
            offset: 0,
            executed: 0
        }

        // Act
        const newState = part2Executor(currentState)

        // Assert
        expect(newState.instructions[0]).toEqual(2)
    })

    it('decrements instruction if current offset is 4', () => {
        // Arrange
        const currentState = {
            instructions: [4, 2, 5, 2],
            offset: 0,
            executed: 0
        }

        // Act
        const newState = part2Executor(currentState)

        // Assert
        expect(newState.instructions[0]).toEqual(3)
    })

    it('increments instruction if offset is 1', () => {
        // Arrange
        const currentState = {
            instructions: [1, 2],
            offset: 0,
            executed: 0
        }

        // Act
        const newState = part2Executor(currentState)

        // Assert
        expect(newState.instructions[1]).toEqual(2)
    })
})

describe('puzzle solution', () => {
    it('can solve sample puzzle', () => {
        // Arrange
        const jumpProcessor = jumpProcessorGenerator(`0
            3
            0
            1
            -3`, part2Executor)
        let lastState

        // Act
        for (const state of jumpProcessor) {
            lastState = state
        }

        // Assert
        expect(lastState.executed).toEqual(10)
    })

    it('can solve puzzle', () => {
        // Arrange
        const jumpProcessor = jumpProcessorGenerator(PUZZLE_INPUT, part2Executor)
        let lastState

        // Act
        for (const state of jumpProcessor) {
            lastState = state
        }

        // Assert
        expect(lastState.executed).toEqual(29717847)
    })
})

const { PUZZLE_INPUT, executeInstructions } = require('./puzzle')

describe('part2', () => {
    it('can solve puzzle', () => {
        // Arrange / Act
        const executor = executeInstructions(PUZZLE_INPUT)

        // Assert
        expect(executor.largestEver()).toEqual(5035)
    })
})
const { PUZZLE_INPUT } = require('./puzzle')
const Executor = require('./instructionExecutor')

describe('part1', () => {
    it('can solve example puzzle', () => {
        // Arrange
        const instructions = `b inc 5 if a > 1
            a inc 1 if b < 5
            c dec -10 if a >= 1
            c inc -20 if c == 10`
            .split('\n')
            .map(instruction => instruction.trim())

        const executor = new Executor()

        // Act
        instructions.forEach(instruction => executor.execute(instruction))

        // Assert
        expect(executor.largest()).toEqual(1)
    })

    it('can solve puzzle', () => {
        // Arrange
        const instructions = PUZZLE_INPUT
            .split('\n')
            .map(instruction => instruction.trim())

        const executor = new Executor()

        // Act
        instructions.forEach(instruction => executor.execute(instruction))

        // Assert
        expect(executor.largest()).toEqual(3880)
    })
})
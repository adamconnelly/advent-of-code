const { PUZZLE_INPUT, executeInstructions } = require('./puzzle')

describe('part1', () => {
    it('can solve example puzzle', () => {
        // Arrange / Act
        const executor = executeInstructions(`b inc 5 if a > 1
            a inc 1 if b < 5
            c dec -10 if a >= 1
            c inc -20 if c == 10`)

        // Assert
        expect(executor.largest()).toEqual(1)
    })

    it('can solve puzzle', () => {
        // Arrange / Act
        const executor = executeInstructions(PUZZLE_INPUT)

        // Assert
        expect(executor.largest()).toEqual(3880)
    })
})
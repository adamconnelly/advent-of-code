const memoryAllocationGenerator = require('./memoryAllocationGenerator')
const { PUZZLE_INPUT } = require('./puzzle')

describe('memoryAllocationGenerator', () => {
    it('initialises allocation context', () => {
        // Arrange
        const allocator = memoryAllocationGenerator([0, 2, 7, 0])

        // Act
        const context = allocator.next().value

        // Assert
        expect(context.cycles).toEqual(0)
        expect(context.banks).toEqual([0, 2, 7, 0])
    })

    it('increments cycles', () => {
        // Arrange
        const allocator = memoryAllocationGenerator([0, 2, 7, 0])
        allocator.next()

        // Act
        const context = allocator.next().value

        // Assert
        expect(context.cycles).toEqual(1)
    })

    it('redistributes blocks each cycle', () => {
        // Arrange
        const allocator = memoryAllocationGenerator([0, 2, 7, 0])
        allocator.next()

        // Act
        const context = allocator.next().value

        // Assert
        expect(context.banks).toEqual([2, 4, 1, 2])
    })

    it('keeps redistributing until loop detected', () => {
        // Arrange
        const allocator = memoryAllocationGenerator([0, 2, 7, 0])
        let finalContext = null

        // Act
        for (const context of allocator) {
            finalContext = context
        }

        // Assert
        expect(finalContext.cycles).toEqual(5)
        expect(finalContext.banks).toEqual([2, 4, 1, 2])
    })

    it('returns the number of cycles between duplicates', () => {
        // Arrange
        const allocator = memoryAllocationGenerator([0, 2, 7, 0])
        let finalContext = null

        // Act
        for (const context of allocator) {
            finalContext = context
        }

        // Assert
        expect(finalContext.cyclesBetweenDuplicates).toEqual(4)
    })
})

describe('puzzle', () => {
    it('can solve part 1', () => {
        // Arrange
        const input = PUZZLE_INPUT.split('\t').map(bank => parseInt(bank))
        const allocator = memoryAllocationGenerator(input)
        let finalContext = null

        // Act
        for (const context of allocator) {
            finalContext = context
        }

        // Assert
        expect(finalContext.cycles).toEqual(7864)
    })

    it('can solve part 2', () => {
        // Arrange
        const input = PUZZLE_INPUT.split('\t').map(bank => parseInt(bank))
        const allocator = memoryAllocationGenerator(input)
        let finalContext = null

        // Act
        for (const context of allocator) {
            finalContext = context
        }

        // Assert
        expect(finalContext.cyclesBetweenDuplicates).toEqual(1695)
    })
})
const jumpProcessorGenerator = require('./jumpProcessorGenerator')
const { PUZZLE_INPUT } = require('./puzzle')

describe('jumpProcessor', () => {
    describe('currentOffset', () => {
        it('starts on instruction 0', () => {
            const jumpProcessor = jumpProcessorGenerator('0')
            expect(jumpProcessor.next().value.offset).toEqual(0)
        })

        it('executes first instruction', () => {
            // Arrange
            const jumpProcessor = jumpProcessorGenerator(`2
                1
                2
                3`)

            // Act
            jumpProcessor.next()
            const value = jumpProcessor.next().value

            // Assert
            expect(value.offset).toEqual(2)
        })
    })

    describe('processing', () => {
        it('stops executing after reaching end of instructions', () => {
            // Arrange
            const jumpProcessor = jumpProcessorGenerator(`1
                1
                1`)
            jumpProcessor.next()
            jumpProcessor.next()
            jumpProcessor.next()
            const penultimateDone = jumpProcessor.next().done

            // Act
            const done = jumpProcessor.next().done

            // Assert
            expect(penultimateDone).toBe(false)
            expect(done).toBe(true)
        })

        it('stops executing after moving before beginning of instructions', () => {
            // Arrange
            const jumpProcessor = jumpProcessorGenerator(`1
                -2`)
            jumpProcessor.next()
            jumpProcessor.next()
            const penultimateDone = jumpProcessor.next().done

            // Act
            const done = jumpProcessor.next().done

            // Assert
            expect(penultimateDone).toBe(false)
            expect(done).toBe(true)
        })

        it('increments instruction after jumping', () => {
            // Arrange
            const jumpProcessor = jumpProcessorGenerator(`1
                -2`)
            jumpProcessor.next()

            // Act
            const value = jumpProcessor.next().value

            // Assert
            expect(value.instructions[0]).toEqual(2)
        })
    })

    describe('executed', () => {
        it('initialises to 0', () => {
            // Arrange
            const jumpProcessor = jumpProcessorGenerator('0')

            // Act
            const value = jumpProcessor.next().value

            // Assert
            expect(value.executed).toEqual(0)
        })

        it('returns total number of executed instructions', () => {
            // Arrange
            const jumpProcessor = jumpProcessorGenerator(`1
                1
                1`)
            let lastExecuted = 0
        
            // Act
            for (const executionInfo of jumpProcessor) {
                lastExecuted = executionInfo.executed
            }

            // Assert
            expect(lastExecuted).toEqual(3)
        })
    })

    describe('toString', () => {
        it('returns string representation of instructions', () => {
            // Arrange
            const jumpProcessor = jumpProcessorGenerator(`1
                1
                1`)
            
            // Act
            const instructions = jumpProcessor.next().value.toString()

            // Assert
            expect(instructions).toEqual('(1) 1 1')
        })

        it('indicates current instruction', () => {
            // Arrange
            const jumpProcessor = jumpProcessorGenerator(`1
                1
                1`)
            
            // Act
            jumpProcessor.next()
            const instructions = jumpProcessor.next().value.toString()

            // Assert
            expect(instructions).toEqual('2 (1) 1')
        })
    })
})

describe('puzzle', () => {
    it('can solve sample puzzle', () => {
        // Arrange
        const jumpProcessor = jumpProcessorGenerator(`0
            3
            0
            1
            -3`)
        let executed = 0

        // Act
        for (let instruction of jumpProcessor) {
            executed = instruction.executed
        }

        // Assert
        expect(executed).toEqual(5)
    })

    it('can solve puzzle input', () => {
        // Arrange
        const jumpProcessor = jumpProcessorGenerator(PUZZLE_INPUT)
        let executed = 0

        // Act
        for (let instruction of jumpProcessor) {
            executed = instruction.executed
        }

        // Assert
        expect(executed).toEqual(381680)
    })
})
const Executor = require('./instructionExecutor')

describe('instructionExecutor', () => {
    it('can increment a register', () => {
        // Arrange
        const executor = new Executor()

        // Act
        executor.execute('b inc 5 if a == 0')

        // Assert
        expect(executor.get('b')).toEqual(5)
    })

    it('can decrement register', () => {
        // Arrange
        const executor = new Executor()

        // Act
        executor.execute('b dec 5 if a == 0')

        // Assert
        expect(executor.get('b')).toEqual(-5)
    })

    it('can execute multiple instructions against a register', () => {
        // Arrange
        const executor = new Executor()

        // Act
        executor.execute('b inc 6 if a == 0')
        executor.execute('b dec 5 if a == 0')

        // Assert
        expect(executor.get('b')).toEqual(1)
    })

    describe('== condition', () => {
        it('executes instruction if condition register equals', () => {
            // Arrange
            const executor = new Executor()
    
            // Act
            executor.execute('b inc 6 if a == 0')
            executor.execute('a inc 5 if b == 6')
    
            // Assert
            expect(executor.get('a')).toEqual(5)
        })

        it('does not execute instruction if condition not matched', () => {
            // Arrange
            const executor = new Executor()
    
            // Act
            executor.execute('b inc 5 if a == 1')
    
            // Assert
            expect(executor.get('b')).toEqual(0)
        })
    })

    describe('> condition', () => {
        it('executes instruction if condition register greater', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a > 1')

            // Assert
            expect(executor.get('b')).toEqual(2)
        })

        it('does not execute instruction if condition register less than', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a > 6')

            // Assert
            expect(executor.get('b')).toEqual(0)
        })

        it('does not execute instruction if condition register equal to', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a > 5')

            // Assert
            expect(executor.get('b')).toEqual(0)
        })
    })

    describe('>= condition', () => {
        it('executes instruction if condition register greater', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a >= 1')

            // Assert
            expect(executor.get('b')).toEqual(2)
        })

        it('does not execute instruction if condition register less than', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a >= 6')

            // Assert
            expect(executor.get('b')).toEqual(0)
        })

        it('executes instruction if condition register equal to', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a >= 5')

            // Assert
            expect(executor.get('b')).toEqual(2)
        })
    })

    describe('< condition', () => {
        it('executes instruction if condition register less than', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a < 6')

            // Assert
            expect(executor.get('b')).toEqual(2)
        })

        it('does not execute instruction if condition register greater than', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a < 3')

            // Assert
            expect(executor.get('b')).toEqual(0)
        })

        it('does not execute instruction if condition register equal to', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a < 5')

            // Assert
            expect(executor.get('b')).toEqual(0)
        })
    })

    describe('<= condition', () => {
        it('executes instruction if condition register less than', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a <= 6')

            // Assert
            expect(executor.get('b')).toEqual(2)
        })

        it('does not execute instruction if condition register greater than', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a <= 4')

            // Assert
            expect(executor.get('b')).toEqual(0)
        })

        it('executes instruction if condition register equal to', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 2 if a <= 5')

            // Assert
            expect(executor.get('b')).toEqual(2)
        })
    })

    describe('!= condition', () => {
        it('executes instruction if register not equal to', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 5 if a != 7')

            // Assert
            expect(executor.get('b')).toEqual(5)
        })

        it('does not execute instruction if register equal to', () => {
            // Arrange
            const executor = new Executor()

            // Act
            executor.execute('a inc 5 if b == 0')
            executor.execute('b inc 5 if a != 5')

            // Assert
            expect(executor.get('b')).toEqual(0)
        })
    })

    describe('unknown condition', () => {
        it('throws an exception if operator unknown', () => {
            // Arrange
            const executor = new Executor()
            executor.execute('a inc 5 if b == 0')

            let error

            // Act
            try {
                executor.execute('b inc 5 if a ^ 5')
            } catch (e) {
                error = e
            }

            // Assert
            expect(error).toEqual('Operator \'^\' is unknown')
        })
    })

    describe('largest', () => {
        it('returns 0 before any instructions have been executed', () => {
            // Arrange
            const executor = new Executor()

            // Act
            const value = executor.largest()

            // Assert
            expect(value).toEqual(0)
        })

        it('returns value when a single register has value', () => {
            // Arrange
            const executor = new Executor()
            executor.execute('a inc 5 if a == 0')

            // Act
            const value = executor.largest()

            // Assert
            expect(value).toEqual(5)
        })

        it('returns largest value when multiple registers have values', () => {
            // Arrange
            const executor = new Executor()
            executor.execute('a inc 5 if a == 0')
            executor.execute('b inc 6 if b == 0')

            // Act
            const value = executor.largest()

            // Assert
            expect(value).toEqual(6)
        })
    })
})
const { spiralGenerator, toCoordinate } = require('./spiral')
const toManhattan = require('./manhattanDistance')


// Here's an example of how the spiral memory looks from the puzzle:

// 17  16  15  14  13
// 18   5   4   3  12
// 19   6   1   2  11
// 20   7   8   9  10
// 21  22  23---> ...

describe('spiralGenerator', () => {
    it('returns 0,0 for first execution', () => {
        let spiral = spiralGenerator()
        expect(spiral.next().value).toEqual({ x: 0, y: 0 })
    })

    it('returns 0,1 for second iteration', () => {
        let spiral = spiralGenerator()
        spiral.next()
        expect(spiral.next().value).toEqual({ x: 1, y: 0 })
    })
})

describe('toCoordinate', () => {
    it('converts 1 to 0,0', () => {
        expect(toCoordinate(1)).toEqual({ x: 0, y: 0 })
    })

    it('converts 3 to 1,1', () => {
        expect(toCoordinate(3)).toEqual({ x: 1, y: 1 })
    })

    it('converts 5 to -1,1', () => {
        expect(toCoordinate(5)).toEqual({ x: -1, y: 1 })
    })
})

describe('distanceCalculator', () => {
    it('returns 0 for origin', () => {
        expect(toManhattan({ x: 0, y: 0 })).toEqual(0)
    })

    it('returns 1 for 1,0', () => {
        expect(toManhattan({ x: 1, y: 0 })).toEqual(1)
    })

    it('returns 1 for 0,1', () => {
        expect(toManhattan({ x: 0, y: 1 })).toEqual(1)
    })

    it('takes absolute value of x', () => {
        expect(toManhattan({ x: -2, y: 1 })).toEqual(3)
    })

    it('takes absolute value of y', () => {
        expect(toManhattan({ x: 1, y: -4 })).toEqual(5)
    })
})

describe('puzzle', () => {
    it('can be solved', () => {
        expect(toManhattan(toCoordinate(325489))).toEqual(552)
    })
})
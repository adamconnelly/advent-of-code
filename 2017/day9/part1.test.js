const { PUZZLE_INPUT } = require('./puzzle')
const calculateScore = require('./scorer')

describe('part1', () => {
    it('can handle sample input 4', () => {
        expect(calculateScore('{{{},{},{{}}}}')).toEqual(16)
    })

    it('can handle sample input 5', () => {
        expect(calculateScore('{<a>,<a>,<a>,<a>}')).toEqual(1)
    })

    it('can handle sample input 6', () => {
        expect(calculateScore('{{<ab>},{<ab>},{<ab>},{<ab>}}')).toEqual(9)
    })

    it('can handle sample input 7', () => {
        expect(calculateScore('{{<!!>},{<!!>},{<!!>},{<!!>}}')).toEqual(9)
    })

    it('can handle sample input 8', () => {
        expect(calculateScore('{{<a!>},{<a!>},{<a!>},{<ab>}}')).toEqual(3)
    })

    it('can solve puzzle', () => {
        expect(calculateScore(PUZZLE_INPUT)).toEqual(12396)
    })
})
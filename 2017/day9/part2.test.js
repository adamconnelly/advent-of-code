const { PUZZLE_INPUT } = require('./puzzle')
const { countGarbage } = require('./scorer')

describe('part1', () => {
    it('can handle sample input 1', () => {
        expect(countGarbage('{<>}')).toEqual(0)
    })

    it('can handle sample input 2', () => {
        expect(countGarbage('{<random characters>}')).toEqual(17)
    })

    it('can handle sample input 3', () => {
        expect(countGarbage('{<<<<>}')).toEqual(3)
    })

    it('can handle sample input 4', () => {
        expect(countGarbage('{<{!>}>}')).toEqual(2)
    })

    it('can handle sample input 5', () => {
        expect(countGarbage('{<!!>}')).toEqual(0)
    })

    it('can handle sample input 6', () => {
        expect(countGarbage('{<!!!>>}')).toEqual(0)
    })

    it('can handle sample input 7', () => {
        expect(countGarbage('{<{o"i!a,<{i<a>}')).toEqual(10)
    })

    it('can solve puzzle', () => {
        expect(countGarbage(PUZZLE_INPUT)).toEqual(6346)
    })
})
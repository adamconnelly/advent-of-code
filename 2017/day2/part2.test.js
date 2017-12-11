const { PUZZLE_INPUT, checksumV2 } = require('./checksum')

describe('part2', () => {
    it('returns 0 if no two numbers are evenly divisible', () => {
        expect(checksumV2('5 9')).toEqual(0)
    })

    it('returns result of division', () => {
        expect(checksumV2('5 9 2 8')).toEqual(4)
    })

    it('can solve the example input', () => {
        const input = `5 9 2 8
9 4 7 3
3 8 6 5`

        expect(checksumV2(input)).toEqual(9)
    })

    it('can solve puzzle input', () => {
        expect(checksumV2(PUZZLE_INPUT)).toEqual(308)
    })
})
const calculateScore = require('./scorer')

describe('calculateScore', () => {
    it('returns score for single group', () => {
        expect(calculateScore('{}')).toEqual(1)
    })

    it('sums scores for child groups', () => {
        expect(calculateScore('{{},{}}')).toEqual(5)
    })

    it('sums scores for sub-children', () => {
        expect(calculateScore('{{{}}}')).toEqual(6)
    })
})
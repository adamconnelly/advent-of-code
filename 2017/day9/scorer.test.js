const { calculateScore, countGarbage } = require('./scorer')

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

describe('countGarbage', () => {
    it('counts garbage in root group', () => {
        expect(countGarbage('{<abc>}')).toEqual(3)
    })

    it('counts garbage in child groups', () => {
        expect(countGarbage('{<a>{<ab>},{<abc>}}')).toEqual(6)
    })

    it('sums scores for sub-children', () => {
        expect(countGarbage('{<a>{<ab>{<abc>}}}')).toEqual(6)
    })
})
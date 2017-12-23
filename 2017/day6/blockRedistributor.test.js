const redistribute = require('./blockRedistributor')

describe('redistribute', () => {
    it('redistributes blocks', () => {
        expect(redistribute([1, 0])).toEqual([0, 1])
    })

    it('keeps redistributing until bank has been fully redistributed', () => {
        expect(redistribute([2, 0, 0])).toEqual([0, 1, 1])
    })

    it('stops once blocks have run out', () => {
        expect(redistribute([2, 0, 0, 0])).toEqual([0, 1, 1, 0])
    })

    it('chooses highest block to redistribute', () => {
        expect(redistribute([1, 3, 2, 1, 1])).toEqual([1, 0, 3, 2, 2])
    })

    it('wraps round when redistributing', () => {
        expect(redistribute([1, 3, 2])).toEqual([2, 1, 3])
    })

    it('calculates puzzle sample correctly', () => {
        expect(redistribute([0, 2, 7, 0])).toEqual([2, 4, 1, 2])
    })

    it('chooses first bank if there is a tie', () => {
        expect(redistribute([7, 9, 1, 0, 8, 5, 6, 3, 11, 10, 12, 14, 13, 2, 14, 4]))
            .toEqual([8, 10, 2, 1, 9, 6, 7, 4, 12, 11, 12, 0, 14, 3, 15, 5])
    })
})

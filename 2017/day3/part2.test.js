const stressTestGenerator = require('./stressTester')

// 147  142  133  122   59
// 304    5    4    2   57
// 330   10    1    1   54
// 351   11   23   25   26
// 362  747  806--->   ...

describe('stressTester', () => {
    it('starts with 1', () => {
        let stressTester = stressTestGenerator()
        expect(stressTester.next().value).toEqual(1)
    })

    it('returns 1 for second square', () => {
        let stressTester = stressTestGenerator()
        stressTester.next()
        expect(stressTester.next().value).toEqual(1)
    })

    it('returns 2 for third square', () => {
        let stressTester = stressTestGenerator()
        stressTester.next()
        stressTester.next()
        expect(stressTester.next().value).toEqual(2)
    })

    it('returns 11 for square 7', () => {
        let stressTester = stressTestGenerator()
        let lastValue = null
        for (let i = 0; i < 7; i++) {
            lastValue = stressTester.next()
        }

        expect(lastValue.value).toEqual(11)
    })

    it('can calculate puzzle result', () => {
        for (let currentValue of stressTestGenerator()) {
            if (currentValue > 325489) {
                expect(currentValue).toEqual(330785)
                break
            }
        }
    })
})
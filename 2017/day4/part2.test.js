const { isValid, PUZZLE_INPUT } = require('./passphraseValidator')
const wordConverter = (word) => word.split(/(.)/).filter(c => c).sort()

describe('passphraseValidator word matcher function', () => {
    it('can pass in a function to alter how words are matched', () => {
        expect(isValid('abcde xyz ecdab', wordConverter)).toBe(false)
    })
})

describe('puzzle results', () => {
    it('gets correct result for first example', () => {
        expect(isValid('abcde fghij', wordConverter)).toBe(true)
    })

    it('gets correct result for second example', () => {
        expect(isValid('abcde xyz ecdab', wordConverter)).toBe(false)
    })

    it('gets correct result for third example', () => {
        expect(isValid('a ab abc abd abf abj', wordConverter)).toBe(true)
    })

    it('gets correct result for fourth example', () => {
        expect(isValid('iiii oiii ooii oooi oooo', wordConverter)).toBe(true)
    })

    it('gets correct result for fifth example', () => {
        expect(isValid('oiii ioii iioi iiio', wordConverter)).toBe(false)
    })

    it('solves puzzle', () => {
        const validPasswords = PUZZLE_INPUT
            .split('\n')
            .filter(passphrase => isValid(passphrase.trim(), wordConverter))
        expect(validPasswords).toHaveLength(186)
    })
})
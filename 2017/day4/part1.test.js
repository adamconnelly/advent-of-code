const { isValid, PUZZLE_INPUT } = require('./passphraseValidator')

describe('passphraseValidator', () => {
    it('returns false for an empty string', () => {
        expect(isValid('')).toBe(false)
    })

    it('returns true for a string with no duplicates', () => {
        expect(isValid('ab cd')).toBe(true)
    })

    it('returns false for a string with a single word', () => {
        expect(isValid('ab')).toBe(false)
    })

    it('returns false for a string with a duplicate word', () => {
        expect(isValid('ab ab')).toBe(false)
    })
})

describe('puzzle results', () => {
    it('passes first example', () => {
        expect(isValid('aa bb cc dd ee')).toBe(true)
    })

    it('passes second example', () => {
        expect(isValid('aa bb cc dd aa')).toBe(false)
    })

    it('passes third example', () => {
        expect(isValid('aa bb cc dd aaa')).toBe(true)
    })

    it('can solve puzzle', () => {
        const validPasswords = PUZZLE_INPUT
            .split('\n')
            .filter(passphrase => isValid(passphrase.trim()))
        expect(validPasswords).toHaveLength(455)
    })
})
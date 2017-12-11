/**
 * Returns the answer to part 1 of the advent of code challenge.
 * 
 * @param {String} input - the input to the captcha
 * @param {Number} lookahead - indicates how many elements to lookahead in the list when finding matching digits. Defaults to 1.
 */
module.exports = (input, lookahead) => {
    if (!input) {
        return 0
    }

    lookahead = lookahead || 1

    let sum = 0

    for (let i = 0; i < input.length; i++) {
        const nextIndex = (i + lookahead) % input.length
        if (input[i] == input[nextIndex]) {
            sum += parseInt(input[i])
        }
    }

    return sum
}
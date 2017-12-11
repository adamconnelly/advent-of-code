/**
 * Returns the answer to part 1 of the advent of code challenge.
 * 
 * @param {String} input - the input to the captcha
 */
module.exports = (input) => {
    if (!input) {
        return 0
    }

    let sum = 0

    for (let i = 0; i < input.length; i++) {
        const nextIndex = i === input.length - 1 ? 0 : i + 1
        if (input[i] == input[nextIndex]) {
            sum += parseInt(input[i])
        }
    }

    return sum
}
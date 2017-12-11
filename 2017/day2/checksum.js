/**
 * The input for the checksum. Cells are separates by tabs, rows are separated by newlines.
 */
module.exports = (input) => {
    return input.split('\n')
        .map(line => calculateChecksumForLine(line))
        .reduce((accumulator, value) => accumulator + value)
}

function calculateChecksumForLine(line) {
    const cells = line.trim().split(/[\t ]+/)
    let highest = 0, lowest

    for (const cell of cells) {
        const value = parseInt(cell)
        highest = Math.max(highest, value)
        lowest = Math.min(lowest || value, value)
    }

    return highest - lowest
}
/**
 * Redistributes the blocks from the highest memory bank
 * @param {Array} blocks the memory banks
 */
module.exports = (banks) => {
    const newBanks = banks.slice(0)
    const highestBank = findHighestBank(newBanks)

    newBanks[highestBank.index] = 0
    let currentBank = calculateIndex(highestBank.index + 1, banks.length)
    let blocksToRedistribute = highestBank.blocks

    while (blocksToRedistribute > 0) {
        newBanks[currentBank]++
        currentBank = calculateIndex(currentBank + 1, banks.length)
        blocksToRedistribute--
    }

    return newBanks
}

/**
 * Calculates the actual index in an array given a requested index and the
 * array length, wrapping round to the start of the array if the requested
 * length is larger than the array.
 * 
 * @param {Number} newIndex The new index in the array
 * @param {Number} length The length of the array
 */
function calculateIndex(newIndex, length) {
    return newIndex % length
}

/**
 * Finds the memory bank with the highest value in it. In the event
 * of a tie, the first (lowest index) bank is chosen.
 * 
 * @param {Array} banks the memory banks
 */
function findHighestBank(banks) {
    const sortedBanks = banks.map((blocks, index) => ({ blocks, index }))
        .sort((a, b) => {
            // We need to sort by blocks desc, and then index asc.
            // Initially I made the mistake of not sorting by index
            // as well, and although I'd written a test case for it,
            // it wasn't quite right so appeared to be working when it really wasn't.
            if (a.blocks !== b.blocks) {
                return b.blocks - a.blocks
            }

            return a.index - b.index
        })

    return sortedBanks[0]
}
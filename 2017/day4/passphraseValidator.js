/**
 * Validates whether the specified passphrase is valid.
 * @param {String} passphrase the passphrase to validate
 */
module.exports = (passphrase) => {
    if (passphrase) {
        let wordCounts = {}
        for (let word of passphrase.split(' ')) {
            let count = wordCounts[word] || 0
            count++

            if(count > 1) {
                return false
            }

            wordCounts[word] = count
        }

        if (Object.keys(wordCounts).length > 1) {
            return true
        }
    }
    
    return false
}
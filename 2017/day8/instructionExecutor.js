const Executor = function() {
    const self = this

    const inputPattern = /([a-z]+?) (inc|dec) (-?\d+?) if ([a-z]+?) (.{1,2}) (-?\d+)/

    const registers = {}
    let largestValue

    self.execute = function(input) {
        const match = inputPattern.exec(input)
        if (!match) {
            throw `Specified instruction '${input}' is not in the correct format`
        }

        const register = match[1]
        const instruction = match[2]
        const value = parseInt(match[3])
        const conditionRegister = match[4]
        const conditionOperator = match[5]
        const conditionValue = parseInt(match[6])

        if (shouldExecute(conditionRegister, conditionOperator, conditionValue)) {
            executeInstruction(register, instruction, registers, value)
        }
    }

    /**
     * Gets the current value of the register. All registers are initialised to 0.
     * @param {String} register The name of the register to get.
     */
    self.get = function(register) {
        return registers[register] || 0
    }

    self.largest = function() {
        const sortedValues = Object.keys(registers)
            .map(register => self.get(register))
            .sort((a, b) => b - a)
        
        if (sortedValues.length > 0)
            return sortedValues[0]
        
        return 0
    }

    self.largestEver = function() {
        return largestValue || 0
    }

    function shouldExecute(register, operator, value) {
        if (operator === '==') {
            return self.get(register) === value
        }

        if (operator === '>=') {
            return self.get(register) >= value
        }

        if (operator === '<') {
            return self.get(register) < value
        }

        if (operator === '<=') {
            return self.get(register) <= value
        }

        if (operator === '!=') {
            return self.get(register) != value
        }

        if (operator === '>') {
            return self.get(register) > value
        }

        throw `Operator '${operator}' is unknown`
    }
    
    function executeInstruction(register, instruction, registers, value) {
        const currentValue = self.get(register)
        let newValue = currentValue - value
        if (instruction === 'inc') {
            newValue = currentValue + value
        }

        registers[register] = newValue
        largestValue = Math.max(newValue, largestValue || newValue)
    }
}

module.exports = Executor

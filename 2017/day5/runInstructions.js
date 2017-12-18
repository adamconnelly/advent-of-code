const sleep = require('sleep')

const { PUZZLE_INPUT } = require('./puzzle')
const jumpProcessorGenerator = require('./jumpProcessorGenerator')

const processor = jumpProcessorGenerator(PUZZLE_INPUT)

for (const currentState of processor) {
    console.log(currentState.toString(50))
    
    sleep.msleep(100)
}

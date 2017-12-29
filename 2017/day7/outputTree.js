const buildTower = require('./towerBuilder')
const { PUZZLE_INPUT } = require('./puzzle')
const calculateWeights = require('./towerWeigher')
const findUnbalancedNode = require('./towerBalancer')
const treeify = require('treeify')

const tower = buildTower(PUZZLE_INPUT)
calculateWeights(tower)

const unbalancedNode = findUnbalancedNode(tower.bottomProgram)
console.log(treeify.asTree(tower, true))
console.log(unbalancedNode)

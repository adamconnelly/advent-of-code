const buildTower = require('./towerBuilder')
const { PUZZLE_INPUT } = require('./puzzle')
const calculateWeights = require('./towerWeigher')
const findUnbalancedNode = require('./towerBalancer')

describe('part2', () => {
    it('can solve part2', () => {
        // Arrange
        const tower = buildTower(PUZZLE_INPUT)
        calculateWeights(tower)

        // Act
        const unbalancedNode = findUnbalancedNode(tower.bottomProgram)

        // Assert
        expect(unbalancedNode.requiredWeight).toEqual(299)
    })
})
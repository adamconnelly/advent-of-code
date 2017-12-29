const buildTowers = require('./towerBuilder')
const calculateWeights = require('./towerWeigher')
const findUnbalancedNode = require('./towerBalancer')

describe('towerBalancer', () => {
    it('can find unbalanced node', () => {
        // Arrange
        const towers = buildTowers(`pbga (66)
        xhth (57)
        ebii (61)
        havc (66)
        ktlj (57)
        fwft (72) -> ktlj, cntj, xhth
        qoyq (66)
        padx (45) -> pbga, havc, qoyq
        tknk (41) -> ugml, padx, fwft
        jptl (61)
        ugml (68) -> gyxo, ebii, jptl
        gyxo (61)
        cntj (57)`)

        calculateWeights(towers)

        // Act
        const unbalancedNode = findUnbalancedNode(towers.bottomProgram)

        // Assert
        expect(unbalancedNode.name).toEqual('ugml')
    })

    it('can calculate required weight of node', () => {
        // Arrange
        const towers = buildTowers(`pbga (66)
        xhth (57)
        ebii (61)
        havc (66)
        ktlj (57)
        fwft (72) -> ktlj, cntj, xhth
        qoyq (66)
        padx (45) -> pbga, havc, qoyq
        tknk (41) -> ugml, padx, fwft
        jptl (61)
        ugml (68) -> gyxo, ebii, jptl
        gyxo (61)
        cntj (57)`)

        calculateWeights(towers)

        // Act
        const unbalancedNode = findUnbalancedNode(towers.bottomProgram)

        // Assert
        expect(unbalancedNode.requiredWeight).toEqual(60)
    })
})
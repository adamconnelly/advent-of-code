const buildTower = require('./towerBuilder')
const { PUZZLE_INPUT } = require('./puzzle')

describe('buildTower', () => {
    it('can solve example puzzle', () => {
        // Arrange
        const input = `pbga (66)
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
cntj (57)`

        // Act
        const result = buildTower(input)

        // Assert
        expect(result.bottom).toEqual('tknk')
    })

    it('can solve part1', () => {
        expect(buildTower(PUZZLE_INPUT).bottom).toEqual('xegshds')
    })
})
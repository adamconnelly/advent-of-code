const towerBuilder = require('./towerBuilder')
const calculateWeights = require('./towerWeigher')

describe('towerWeigher', () => {
    it('sets weight for single node', () => {
        // Arrange
        const tower = towerBuilder('abcd (60)')

        // Act
        calculateWeights(tower)

        // Assert
        expect(tower.bottomProgram.totalWeight).toEqual(60)
    })

    it('adds weights of children', () => {
        // Arrange
        const tower = towerBuilder(`abcd (60) -> defg, hijk
        defg (20)
        hijk (30)`)

        // Act
        calculateWeights(tower)

        // Assert
        expect(tower.bottomProgram.totalWeight).toEqual(110)
    })

    it('sets weight of children', () => {
        // Arrange
        const tower = towerBuilder(`abcd (60) -> defg, hijk
        defg (20) -> lmno
        hijk (30)
        lmno (10)`)

        // Act
        calculateWeights(tower)

        // Assert
        expect(tower.bottomProgram.subTowers[0].totalWeight).toEqual(30)
    })
})
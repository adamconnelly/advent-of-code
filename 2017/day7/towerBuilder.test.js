const towerBuilder = require('./towerBuilder')

describe('towerBuilder', () => {
    it('returns the root node of the tree', () => {
        // Arrange
        const towers = `abcd (50) -> defg
        defg (50)`

        // Act
        let tower = towerBuilder(towers)

        // Assert
        expect(tower.bottomProgram.name).toEqual('abcd')
    })

    it('adds child programs to nodes', () => {
        // Arrange
        const towers = `abcd (50) -> defg, hijk
        defg (50)
        hijk (50)`

        // Act
        let tower = towerBuilder(towers)

        // Assert
        expect(tower.bottomProgram.subTowers[0].name).toEqual('defg')
        expect(tower.bottomProgram.subTowers[1].name).toEqual('hijk')
    })
})
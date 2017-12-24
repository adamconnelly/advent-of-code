const towerParser = require('./towerParser')

describe('towerParser', () => {
    it('parses name of tower', () => {
        expect(towerParser('pbga (66)').name).toEqual('pbga')
    })

    it('parses weight of tower', () => {
        expect(towerParser('pbga (66)').weight).toEqual(66)
    })

    it('returns empty subTowers array if no dependencies are specified', () => {
        expect(towerParser('pbga (66)').subTowers).toHaveLength(0)
    })

    it('returns subTowers if specified', () => {
        // Arrange
        const towerString = 'fwft (72) -> ktlj, cntj, xhth'

        // Act
        const tower = towerParser(towerString)

        // Assert
        expect(tower.subTowers).toEqual(['ktlj', 'cntj', 'xhth'])
    })

    it('throws error if string is null', () => {
        // Arrange
        let error = null

        // Act
        try {
            towerParser(null)
        } catch (e) {
            error = e
        }

        // Assert
        expect(error).toEqual('The tower string must be in the format: <name> (<weight>) [-> <subTower1>, <subTowerN>]')
    })

    it('throws error if string does not match', () => {
        // Arrange
        let error = null

        // Act
        try {
            towerParser('a/b+ 3983')
        } catch (e) {
            error = e
        }

        // Assert
        expect(error).toEqual('The tower string must be in the format: <name> (<weight>) [-> <subTower1>, <subTowerN>]')
    })
})
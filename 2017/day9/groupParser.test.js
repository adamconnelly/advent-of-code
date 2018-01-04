const parseGroups = require('./groupParser')

describe('groupParser', () => {
    it('returns score for root group', () => {
        // Arrange
        const input = '{}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.score).toEqual(1)
    })

    it('returns null if input is null', () => {
        expect(parseGroups(null)).toBe(null)
    })

    it('returns garbage inside group', () => {
        // Arrange
        const input = '{<abc123>}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.garbage).toEqual('abc123')
    })

    it('returns child groups', () => {
        // Arrange
        const input = '{{},{}}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.children).toHaveLength(2)
    })

    it('parses garbage in child groups', () => {
        // Arrange
        const input = '{{<a}{>}}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.children).toHaveLength(1)
        expect(output.children[0].garbage).toEqual('a}{')
    })

    it('increases score for nested groups', () => {
        // Arrange
        const input = '{<1>{<2>{<3>}},{<2>}}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.children[0].score).toEqual(2)
        expect(output.children[0].children[0].score).toEqual(3)
        expect(output.children[1].score).toEqual(2)
    })

    it('ignores garbage closing if escaped by !', () => {
        // Arrange
        const input = '{<a!>},{>}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.garbage).toEqual('a!>},{')
    })

    it('parses sample input 4 correctly', () => {
        // Arrange
        const input = '{{{},{},{{}}}}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.children).toHaveLength(1)
        expect(output.children[0].children).toHaveLength(3)
        expect(output.children[0].children[0].children).toHaveLength(0)
        expect(output.children[0].children[1].children).toHaveLength(0)
        expect(output.children[0].children[2].children).toHaveLength(1)
    })

    it('ignores second !', () => {
        // Arrange
        const input = '{{{<!!>}}}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.children[0].children).toHaveLength(1)
    })

    it('can handle empty garbage', () => {
        // Arrange
        const input = '{<>}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.garbage).toHaveLength(0)
    })

    it('can handle empty garbage in child group', () => {
        // Arrange
        const input = '{{<>}}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.children[0].garbage).toHaveLength(0)
    })

    it('ignores additional garbage opening inside garbage', () => {
        // Arrange
        const input = '{<<<>}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.garbage).toEqual('<<')
    })

    it('can parse first part of garbage from puzzle', () => {
        // Arrange
        const input = '{<!>!>!<u,!>!!!!!!!>!!!>,<<!!">}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.garbage).toEqual('!>!>!<u,!>!!!!!!!>!!!>,<<!!"')
    })

    it('counts the non-cancelled garbage', () => {
        // Arrange
        const input = '{<!>!>!<u,!>!!!!!!!>!!!>,<<!!">}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.garbageCount).toEqual(6)
    })

    it('initialises garbage to empty', () => {
        // Arrange
        const input = '{}'

        // Act
        const output = parseGroups(input)

        // Assert
        expect(output.garbageCount).toEqual(0)
    })
})
/**
 * Parses the stream and returns a tree structure representing the groups in the stream.
 * Each group also contains a property with the garbage for that group.
 * @param {String} input The input to parse.
 */
module.exports = (input) => {
    if (!input) {
        return null
    }

    const rootGroup = {
        score: 1,
        children: [],
        garbage: null
    }

    const parseContext = {
        currentPosition: 0,
        currentDepth: 1
    }

    while (parseContext.currentPosition < input.length - 1) {
        consumeInput(parseContext, input, rootGroup)
    }

    return rootGroup
}

function addChild(context, group, input) {
    const child = {
        score: group.score + 1,
        children: [],
        garbage: null
    }

    while (context.currentCharacter !== '}') {
        consumeInput(context, input, child)
    }

    moveToNextCharacter(context, input)

    group.children.push(child)
}

function consumeInput(context, input, child) {
    moveToNextCharacter(context, input)

    if (context.currentCharacter === '<') {
        addGarbage(context, child, input)
    } else if (context.currentCharacter === '{') {
        addChild(context, child, input)
    }
}

function moveToNextCharacter(parseContext, input) {
    parseContext.currentPosition++
    parseContext.currentCharacter = input[parseContext.currentPosition]
}

function addGarbage(context, node, input) {
    const startPosition = context.currentPosition

    while (context.currentCharacter !== '>') {
        if (context.currentCharacter === '!') {
            moveToNextCharacter(context, input)
            moveToNextCharacter(context, input)
        } else {
            moveToNextCharacter(context, input)
        }
    }

    node.garbage = input.substring(startPosition + 1, context.currentPosition)
}
/**
 * Does a depth first search and finds the first node that is unbalanced
 * (i.e. has a different weight to its siblings).
 * 
 * @param {Object} tower The root tower node.
 */
module.exports = (tower) => {
    return findUnbalancedNode(tower)
}

function findUnbalancedNode(tower) {
    if (tower.subTowers) {
        for (const subTower of tower.subTowers) {
            const unbalancedNode = findUnbalancedNode(subTower)
            if (unbalancedNode) {
                return unbalancedNode
            }
        }
    }

    if (!tower.subTowers || tower.subTowers.length === 0) {
        return null
    }

    const subTowerWeight = tower.subTowers
        .reduce((previous, current) => previous + current.totalWeight, 0)
    const isUnbalanced = (subTowerWeight / tower.subTowers.length) !== tower.subTowers[0].totalWeight

    if (isUnbalanced) {
        const unbalancedNode = findUnbalancedSibling(tower)
        return unbalancedNode
    }

    return null
}

/**
 * For a given node in the tower, calculates which of its sub-towers
 * is unbalanced, and returns it after adding a new `requiredWeight`
 * property to it containing the weight it should be to balance the tower.
 * 
 * @param {Object} tower The tower node.
 */
function findUnbalancedSibling(tower) {
    const towerWeights = tower.subTowers
        .map(t => ({ name: t.name, totalWeight: t.totalWeight }))
        .sort((a, b) => a.totalWeight - b.totalWeight)
    const weights = calculateWeights(towerWeights)
    const unbalancedNode = tower.subTowers.find(t => t.totalWeight === weights.unbalancedWeight)
    unbalancedNode.requiredWeight = weights.requiredWeight - (unbalancedNode.totalWeight - unbalancedNode.weight)

    return unbalancedNode
}

/**
 * Calculates the weight of the unbalanced node, along with the
 * weight that the node should be in order to balance the tree.
 * 
 * @param {Object} sortedWeights The tower weights sorted in ascending order.
 */
function calculateWeights(sortedWeights) {
    const firstWeight = sortedWeights[0].totalWeight
    const childrenWithFirstWeight = sortedWeights.filter(t => t.totalWeight === firstWeight)
    const childrenWithoutFirstWeight = sortedWeights.filter(t => t.totalWeight !== firstWeight)
    if (childrenWithFirstWeight.length > childrenWithoutFirstWeight.length) {
        return {
            unbalancedWeight: sortedWeights[sortedWeights.length - 1].totalWeight,
            requiredWeight: sortedWeights[0].totalWeight
        }
    }
        
    return {
        unbalancedWeight: sortedWeights[0].totalWeight,
        requiredWeight: sortedWeights[sortedWeights.length - 1].totalWeight
    }
}
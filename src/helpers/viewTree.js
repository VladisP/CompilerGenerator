export function getViewTree(tree) {
    return {
        name: tree.name,
        rule: tree.rule && tree.rule.map(i => i.name).join(' '),
        token: tree.token && tree.token.toString(),
        children: tree.children && tree.children.map(child => getViewTree(child))
    };
}
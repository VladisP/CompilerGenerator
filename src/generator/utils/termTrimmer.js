export function trim(rules) {
    return rules.map((rule) => ({
        from: rule.from,
        to: rule.to.map((symbol) => ({
            value: symbol.value.replace(/"/g, ''),
            isTerminal: symbol.isTerminal
        }))
    }));
}
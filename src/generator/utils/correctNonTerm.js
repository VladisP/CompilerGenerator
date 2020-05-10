export function isNonTermCorrect(rules) {
    for (const rule of rules) {
        for (const nonTerm of rule.to.filter((symbol) => !symbol.isTerminal)) {
            if (!rules.find((rule) => rule.from === nonTerm.value)) {
                return {result: false, nonTerm: nonTerm.value};
            }
        }
    }

    return {result: true};
}
import {Domains} from '../lexer/domains.js';

export function buildFirst(rules) {
    const firstSet = {};
    const updFirstSet = {};
    init(updFirstSet, rules);

    do {
        copy(updFirstSet, firstSet);

        for (const rule of rules) {
            updFirstSet[rule.from] = unique(updFirstSet[rule.from].concat(first(updFirstSet, rule.to)));
        }
    } while (JSON.stringify(firstSet) !== JSON.stringify(updFirstSet));

    return firstSet;
}

export function init(set, rules) {
    rules.forEach((rule) => set[rule.from] = []);
}

export function copy(src, dest) {
    Object.keys(src).forEach((first) => dest[first] = src[first].map((elem) => Object.assign({}, elem)));
}

function first(updSet, nodes) {
    if (nodes.length === 0) {
        return [];
    }

    if (nodes[0].isTerminal) {
        return [nodes[0]];
    }

    const f = updSet[nodes[0].value];
    let res = f.filter((elem) => elem.value !== Domains.EMPTY);

    if (res.length !== f.length) {
        res = res.concat(first(updSet, nodes.slice(1)));
    }

    return res;
}

export function unique(nodes) {
    return nodes.reduce((prev, node) => {
        if (!prev.find((elem) => elem.value === node.value)) {
            prev.push(node);
        }

        return prev;
    }, []);
}
import {init, copy, unique} from './buildFirst.js';
import {Domains} from './lexer/domains.js';
import {Symbol} from './helpers/symbol.js';

export function getFirst(node, first) {
    return node.isTerminal ? [node] : first[node.name];
}

export function buildFollow(rules, first) {
    const followSet = {};
    const updFollowSet = {};
    init(updFollowSet, rules);
    updFollowSet[rules[0].from].push(Symbol.of({name: '$', isTerminal: true, domain: Domains.EOF}));

    for (let i = 0; i < rules.length; i++) {
        for (let j = 0; j < rules[i].to.length - 1; j++) {
            if (!rules[i].to[j].isTerminal) {
                const f = getFirst(rules[i].to[j + 1], first).filter((elem) => elem.domain !== Domains.EMPTY);
                updFollowSet[rules[i].to[j].name] = unique(updFollowSet[rules[i].to[j].name].concat(f));
            }
        }
    }

    do {
        copy(updFollowSet, followSet);

        for (let i = 0; i < rules.length; i++) {
            const x = rules[i].from;
            const y = rules[i].to[rules[i].to.length - 1];

            if (!y.isTerminal) {
                updFollowSet[y.name] = unique(updFollowSet[y.name].concat(updFollowSet[x]));
            }

            for (let j = 0; j < rules[i].to.length - 1; j++) {
                if (!rules[i].to[j].isTerminal) {
                    const f = getFirst(rules[i].to[j + 1], first);
                    const f2 = f.filter((elem) => elem.domain !== Domains.EMPTY);

                    if (f.length !== f2.length) {
                        const y = rules[i].to[j];
                        updFollowSet[y.name] = unique(updFollowSet[y.name].concat(updFollowSet[x]));
                    }
                }
            }
        }
    } while (JSON.stringify(followSet) !== JSON.stringify(updFollowSet));

    return followSet;
}
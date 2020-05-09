import {Domains} from './lexer/domains.js';
import {Symbol} from './helpers/symbol.js';

export function buildRules({children}) {
    let rules = [];

    for (let i = 0; i < children.length; i++) {
        if (children[i].children) {
            rules = rules.concat(buildRules(children[i]));
        } else if (children[i].name === Domains.ARROW) {
            rules = rules.concat(
                splitOr(
                    children[i - 1].token.value,
                    getTail(children.slice(i + 1, children.length - 1))
                )
            );
        }
    }

    return rules;
}

function getTail(nodes) {
    let res = [];

    for (const current of nodes) {
        if (current.children) {
            res = res.concat(getTail(current.children));
        } else {
            const name = current.token.domain === Domains.EPSILON ? 'e' : current.token.value;
            const isTerminal = current.token.domain !== Domains.NONTERMINAL;
            const domain = current.token.domain === Domains.EPSILON ? Domains.EMPTY : current.token.value;

            res = res.concat(Symbol.of({name, isTerminal, domain}));
        }
    }

    return res;
}

function splitOr(head, tail) {
    const index = tail.findIndex((node) => node.domain === Domains.OR);

    if (index === -1) {
        return [{from: head, to: tail}];
    }

    return [{from: head, to: tail.slice(0, index)}, ...splitOr(head, tail.slice(index + 1))];
}
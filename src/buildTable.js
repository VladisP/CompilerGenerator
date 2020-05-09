import {getFirst} from './buildFollow.js';
import {Domains} from './lexer/domains.js';

export function buildTable(rules, first, follow) {
    const table = {};
    rules.forEach((rule) => table[rule.from] = {});

    for (const rule of rules) {
        const x = rule.from;
        const rawFirstX = getFirst(rule.to[0], first);
        const firstX = rawFirstX.filter((elem) => elem.domain !== Domains.EMPTY);

        for (const elem of firstX) {
            if (table[x][elem.name]) {
                throw new Error('Грамматика не относится к классу LL(1)-грамматик');
            }

            table[x][elem.name] = rule.to;
        }

        if (rawFirstX.length !== firstX.length) {
            for (const elem of follow[x]) {
                if (table[x][elem.name]) {
                    throw new Error('Грамматика не относится к классу LL(1)-грамматик');
                }

                table[x][elem.name] = rule.to;
            }
        }
    }

    return table;
}
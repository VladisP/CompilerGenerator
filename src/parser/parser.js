import {Stack} from '../helpers/stack.js';
import {Node, Terminal, NonTerminal} from './entities.js';

export class Parser {
    constructor({lexer, table, axiom, eof, empty}) {
        this.lexer = lexer;
        this.table = table;
        this.axiom = axiom;
        this.eof = eof;
        this.empty = empty;
    }

    parse() {
        const root = new NonTerminal({name: 'Root'});

        const stack = new Stack();
        stack.push(new Node({symbol: this.eof, parent: root}));
        stack.push(new Node({symbol: this.axiom, parent: root}));

        let token = this.lexer.nextToken();

        do {
            const symbol = stack.top.symbol;

            if (symbol.isTerminal) {
                if (symbol.value === token.domain) {
                    stack.top.parent.children.push(new Terminal(token));
                    stack.pop();
                    token = this.lexer.nextToken();
                } else {
                    throw new Error(`Unexpected token ${token.toString()}`);
                }
            } else if (this.table[symbol.value][token.domain]) {
                const rule = this.table[symbol.value][token.domain];

                if (rule.length === 1 && rule[0].value === this.empty.value) {
                    stack.pop();
                } else {
                    const nonTerm = new NonTerminal({name: symbol.value, rule});
                    stack.top.parent.children.push(nonTerm);
                    stack.pop();
                    rule.slice().reverse().forEach((s) => stack.push(new Node({symbol: s, parent: nonTerm})));
                }
            } else {
                throw new Error(`Unexpected token ${token.toString()}`);
            }
        } while (!stack.empty);

        return root;
    }
}
import {Domains} from '../lexer/domains.js';
import {Symbol} from '../helpers/symbol.js';

export class ParserConfig {
    constructor(lexer) {
        this.lexer = lexer;
        this.table = this.makeTable();
        this.axiom = Symbol.of({name: 'S'});
        this.eof = Symbol.of({name: '$', isTerminal: true, domain: Domains.EOF});
        this.empty = Symbol.of({name: 'e', domain: Domains.EMPTY});
    }

    makeTable() {
        return {
            'S': {
                [Domains.AXIOM]: [
                    Symbol.of({name: "'axiom", isTerminal: true, domain: Domains.AXIOM}),
                    Symbol.of({name: 'R'}),
                    Symbol.of({name: 'R1'})
                ],
                [Domains.EOF]: [
                    Symbol.of({name: 'e', domain: Domains.EMPTY})
                ]
            },
            'R': {
                [Domains.NONTERMINAL]: [
                    Symbol.of({name: 'N', isTerminal: true, domain: Domains.NONTERMINAL}),
                    Symbol.of({name: '->', isTerminal: true, domain: Domains.ARROW}),
                    Symbol.of({name: 'B'}),
                    Symbol.of({name: "'end", isTerminal: true, domain: Domains.END})
                ]
            },
            'B': {
                [Domains.TERMINAL]: [
                    Symbol.of({name: 'T', isTerminal: true, domain: Domains.TERMINAL}),
                    Symbol.of({name: 'B1'})
                ],
                [Domains.NONTERMINAL]: [
                    Symbol.of({name: 'N', isTerminal: true, domain: Domains.NONTERMINAL}),
                    Symbol.of({name: 'B1'})
                ],
                [Domains.EPSILON]: [
                    Symbol.of({name: "'epsilon", isTerminal: true, domain: Domains.EPSILON})
                ]
            },
            'B1': {
                [Domains.TERMINAL]: [
                    Symbol.of({name: 'T', isTerminal: true, domain: Domains.TERMINAL}),
                    Symbol.of({name: 'B1'})
                ],
                [Domains.NONTERMINAL]: [
                    Symbol.of({name: 'N', isTerminal: true, domain: Domains.NONTERMINAL}),
                    Symbol.of({name: 'B1'})
                ],
                [Domains.OR]: [
                    Symbol.of({name: "'or", isTerminal: true, domain: Domains.OR}),
                    Symbol.of({name: 'B'})
                ],
                [Domains.END]: [
                    Symbol.of({name: 'e', domain: Domains.EMPTY})
                ]
            },
            'R1': {
                [Domains.NONTERMINAL]: [
                    Symbol.of({name: 'R'}),
                    Symbol.of({name: 'R1'})
                ],
                [Domains.EOF]: [
                    Symbol.of({name: 'e', domain: Domains.EMPTY})
                ]
            }
        };
    }
}
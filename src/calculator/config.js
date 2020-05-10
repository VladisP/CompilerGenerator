import {Symbol} from '../helpers/symbol.js';
import {CalcDomains} from './domains.js';

export class CalcParserConfig {
    constructor(lexer) {
        this.lexer = lexer;
        this.table = this.makeTable();
        this.axiom = Symbol.of({value: 'E'});
        this.eof = Symbol.of({value: CalcDomains.EOF, isTerminal: true});
        this.empty = Symbol.of({value: CalcDomains.EMPTY});
    }

    makeTable() {
        return {
            "E": {
                "n": [
                    {
                        "value": "T",
                        "isTerminal": false
                    },
                    {
                        "value": "E1",
                        "isTerminal": false
                    }
                ],
                "(": [
                    {
                        "value": "T",
                        "isTerminal": false
                    },
                    {
                        "value": "E1",
                        "isTerminal": false
                    }
                ]
            },
            "E1": {
                "+": [
                    {
                        "value": "+",
                        "isTerminal": true
                    },
                    {
                        "value": "T",
                        "isTerminal": false
                    },
                    {
                        "value": "E1",
                        "isTerminal": false
                    }
                ],
                "eof": [
                    {
                        "value": "empty",
                        "isTerminal": true
                    }
                ],
                ")": [
                    {
                        "value": "empty",
                        "isTerminal": true
                    }
                ]
            },
            "T": {
                "n": [
                    {
                        "value": "F",
                        "isTerminal": false
                    },
                    {
                        "value": "T1",
                        "isTerminal": false
                    }
                ],
                "(": [
                    {
                        "value": "F",
                        "isTerminal": false
                    },
                    {
                        "value": "T1",
                        "isTerminal": false
                    }
                ]
            },
            "T1": {
                "*": [
                    {
                        "value": "*",
                        "isTerminal": true
                    },
                    {
                        "value": "F",
                        "isTerminal": false
                    },
                    {
                        "value": "T1",
                        "isTerminal": false
                    }
                ],
                "+": [
                    {
                        "value": "empty",
                        "isTerminal": true
                    }
                ],
                "eof": [
                    {
                        "value": "empty",
                        "isTerminal": true
                    }
                ],
                ")": [
                    {
                        "value": "empty",
                        "isTerminal": true
                    }
                ]
            },
            "F": {
                "n": [
                    {
                        "value": "n",
                        "isTerminal": true
                    }
                ],
                "(": [
                    {
                        "value": "(",
                        "isTerminal": true
                    },
                    {
                        "value": "E",
                        "isTerminal": false
                    },
                    {
                        "value": ")",
                        "isTerminal": true
                    }
                ]
            }
        };
    }
}
import {Domains} from '../lexer/domains.js';
import {Symbol} from '../helpers/symbol.js';

export class ParserConfig {
    constructor(lexer) {
        this.lexer = lexer;
        this.table = this.makeTable();
        this.axiom = Symbol.of({value: 'S'});
        this.eof = Symbol.of({value: Domains.EOF, isTerminal: true});
        this.empty = Symbol.of({value: Domains.EMPTY});
    }

    makeTable() {
        return {
            "S": {
                "'axiom": [
                    {
                        "value": "'axiom",
                        "isTerminal": true
                    },
                    {
                        "value": "R",
                        "isTerminal": false
                    },
                    {
                        "value": "R1",
                        "isTerminal": false
                    }
                ],
                "eof": [
                    {
                        "value": "empty",
                        "isTerminal": true
                    }
                ]
            },
            "R": {
                "N": [
                    {
                        "value": "N",
                        "isTerminal": true
                    },
                    {
                        "value": "->",
                        "isTerminal": true
                    },
                    {
                        "value": "B",
                        "isTerminal": false
                    },
                    {
                        "value": "'end",
                        "isTerminal": true
                    }
                ]
            },
            "B": {
                "T": [
                    {
                        "value": "T",
                        "isTerminal": true
                    },
                    {
                        "value": "B1",
                        "isTerminal": false
                    }
                ],
                "N": [
                    {
                        "value": "N",
                        "isTerminal": true
                    },
                    {
                        "value": "B1",
                        "isTerminal": false
                    }
                ],
                "'epsilon": [
                    {
                        "value": "'epsilon",
                        "isTerminal": true
                    }
                ]
            },
            "B1": {
                "T": [
                    {
                        "value": "T",
                        "isTerminal": true
                    },
                    {
                        "value": "B1",
                        "isTerminal": false
                    }
                ],
                "N": [
                    {
                        "value": "N",
                        "isTerminal": true
                    },
                    {
                        "value": "B1",
                        "isTerminal": false
                    }
                ],
                "'or": [
                    {
                        "value": "'or",
                        "isTerminal": true
                    },
                    {
                        "value": "B",
                        "isTerminal": false
                    }
                ],
                "'end": [
                    {
                        "value": "empty",
                        "isTerminal": true
                    }
                ]
            },
            "R1": {
                "N": [
                    {
                        "value": "R",
                        "isTerminal": false
                    },
                    {
                        "value": "R1",
                        "isTerminal": false
                    }
                ],
                "eof": [
                    {
                        "value": "empty",
                        "isTerminal": true
                    }
                ]
            }
        };
    }
}
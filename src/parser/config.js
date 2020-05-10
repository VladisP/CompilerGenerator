import fs from 'fs';
import {Symbol} from '../helpers/symbol.js';

export class ParserConfig {
    constructor({lexer, tablePath, eof, empty}) {
        this.lexer = lexer;
        this.table = this.makeTable(tablePath);
        this.axiom = Symbol.of({value: Object.keys(this.table)[0]});
        this.eof = Symbol.of({value: eof, isTerminal: true});
        this.empty = Symbol.of({value: empty});
    }

    makeTable(path) {
        const json = fs.readFileSync(path).toString();
        return JSON.parse(json);
    }
}
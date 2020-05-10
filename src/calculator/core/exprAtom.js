import {Domains} from '../lexer/domains.js';

export class CalcExprAtom {
    constructor(token) {
        switch (token.domain) {
            case Domains.NUMBER:
                this.value = Number.parseInt(token.value);
                this.number = true;
                break;
            case Domains.ADD:
                this.value = token.value;
                this.priority = 1;
                break;
            case Domains.MUL:
                this.value = token.value;
                this.priority = 2;
                break;
            default:
                this.value = token.value;
        }
    }
}
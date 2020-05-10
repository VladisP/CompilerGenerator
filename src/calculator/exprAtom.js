import {CalcDomains} from './domains.js';

export class CalcExprAtom {
    constructor(token) {
        switch (token.domain) {
            case CalcDomains.NUMBER:
                this.value = Number.parseInt(token.value);
                this.number = true;
                break;
            case CalcDomains.ADD:
                this.value = token.value;
                this.priority = 1;
                break;
            case CalcDomains.MUL:
                this.value = token.value;
                this.priority = 2;
                break;
            default:
                this.value = token.value;
        }
    }
}
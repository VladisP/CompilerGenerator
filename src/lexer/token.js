import {Coords} from '../helpers/coords.js';
import {Domains} from './domains.js';

export class Token {
    constructor(domain, row, column, value) {
        this.domain = domain === Domains.KEYWORD ? value : domain;
        this.coords = new Coords(row, column);
        this.value = value;
    }

    toString() {
        return `${this.domain} ${this.coords.toString()}: ${this.value}`;
    }
}
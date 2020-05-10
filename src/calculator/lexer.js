import {Token} from '../lexer/token.js';
import {CalcDomains} from './domains.js';

export class CalcLexer {
    constructor(program) {
        this.program = program;
        this.position = 0;
        this.delta = 0;
        this.lineNum = 1;
        this.buildRegexp();
    }

    buildRegexp() {
        const number = '[0-9]+';
        const spec = '\\(|\\)|\\+|\\*';
        const lineFeed = '\\r?\\n';
        const whitespaces = '\\s+';
        const pattern = `(?<number>${number})|(?<spec>${spec})|` +
            `(?<lineFeed>${lineFeed})|(?<whitespaces>${whitespaces})`;
        this.regexp = new RegExp(pattern, 'y');
    }

    find() {
        this.regexp.lastIndex = this.position;
        return this.regexp.exec(this.program);
    }

    createToken(domain, value) {
        const column = this.position - this.delta + 1;
        this.position = this.regexp.lastIndex;
        return new Token(domain, this.lineNum, column, value);
    }

    nextToken() {
        if (this.position >= this.program.length) {
            return new Token(CalcDomains.EOF, this.lineNum, this.program.length - this.delta + 1, null);
        }

        const res = this.find();

        if (!res) {
            console.log(`Error (${this.lineNum}, ${this.position - this.delta + 1}): unexpected character`);
            this.position++;
            return this.nextToken();
        }

        if (res.groups['lineFeed']) {
            this.delta = this.regexp.lastIndex;
            this.lineNum++;
            this.position = this.regexp.lastIndex;
            return this.nextToken();
        } else if (res.groups['number']) {
            return this.createToken(CalcDomains.NUMBER, res.groups['number']);
        } else if (res.groups['spec']) {
            return this.createToken(res.groups['spec'], res.groups['spec']);
        } else {
            this.position = this.regexp.lastIndex;
            return this.nextToken();
        }
    }
}
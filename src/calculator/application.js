import fs from 'fs';
import path from 'path';
import appRoot from 'app-root-path';
import {Lexer} from './lexer/lexer.js';
import {Parser} from '../parser/parser.js';
import {getViewTree} from '../helpers/viewTree.js';
import {calculate} from './core/calculate.js';
import {ParserConfig} from '../parser/config.js';
import {Domains} from './lexer/domains.js';
import {createDir} from '../helpers/createDir.js';

export class CalculatorApp {
    constructor(exprPath) {
        this.exprPath = exprPath;
    }

    write(name, content) {
        fs.writeFileSync(`./calculator-output/${name}.json`, JSON.stringify(content, null, 2));
    }

    run() {
        const expr = fs.readFileSync(this.exprPath).toString();
        const config = new ParserConfig({
            lexer: new Lexer(expr),
            tablePath: `${appRoot}${path.sep}config${path.sep}calculatorTable.json`,
            eof: Domains.EOF,
            empty: Domains.EMPTY
        });
        const parser = new Parser(config);

        createDir('./calculator-output');

        const tree = parser.parse();
        const viewTree = getViewTree(tree);
        this.write('tree', viewTree);

        const res = calculate(tree);
        this.write('result', res);
    }
}
import fs from 'fs';
import path from 'path';
import appRoot from 'app-root-path';
import {Lexer} from './lexer/lexer.js';
import {ParserConfig} from '../parser/config.js';
import {Domains} from './lexer/domains.js';
import {Parser} from '../parser/parser.js';
import {getViewTree} from '../helpers/viewTree.js';
import {buildRules} from './builders/buildRules.js';
import {trim} from './utils/termTrimmer.js';
import {buildFirst} from './builders/buildFirst.js';
import {buildFollow} from './builders/buildFollow.js';
import {buildTable} from './builders/buildTable.js';
import {isNonTermCorrect} from './utils/correctNonTerm.js';
import {createDir} from '../helpers/createDir.js';

export class GeneratorApp {
    constructor(grammarPath) {
        this.grammarPath = grammarPath;
    }

    write(name, content) {
        fs.writeFileSync(`./generator-output/${name}.json`, JSON.stringify(content, null, 2));
    }

    run() {
        const grammar = fs.readFileSync(this.grammarPath).toString();
        const config = new ParserConfig({
            lexer: new Lexer(grammar),
            tablePath: `${appRoot}${path.sep}config${path.sep}generatorTable.json`,
            eof: Domains.EOF,
            empty: Domains.EMPTY
        });
        const parser = new Parser(config);

        createDir('./generator-output');

        const tree = parser.parse();
        const viewTree = getViewTree(tree);
        this.write('tree', viewTree);

        const rules = trim(buildRules(tree));
        this.write('rules', rules);

        const check = isNonTermCorrect(rules);
        if (!check.result) {
            throw new Error(`${check.nonTerm} not present on the left side of any rule`);
        }

        const first = buildFirst(rules);
        this.write('FIRST', first);

        const follow = buildFollow(rules, first);
        this.write('FOLLOW', follow);

        const table = buildTable(rules, first, follow);
        this.write('table', table);
    }
}
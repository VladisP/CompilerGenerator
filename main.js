import fs from 'fs';
import {Lexer} from './src/lexer/lexer.js';
import {ParserConfig} from './src/parser/config.js';
import {Parser} from './src/parser/parser.js';
import {getViewTree} from './src/helpers/viewTree.js';
import {buildRules} from './src/generator/buildRules.js';
import {trim} from './src/helpers/termTrimmer.js';
import {buildFirst} from './src/generator/buildFirst.js';
import {buildFollow} from './src/generator/buildFollow.js';
import {buildTable} from './src/generator/buildTable.js';

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: node main.js <path-to-src-file>');
    process.exit(1);
}

try {
    const program = fs.readFileSync(args[0]).toString();
    const lexer = new Lexer(program);
    const config = new ParserConfig(lexer);
    const parser = new Parser(config);
    const tree = parser.parse();
    const viewTree = getViewTree(tree);
    const rules = trim(buildRules(tree));
    const first = buildFirst(rules);
    const follow = buildFollow(rules, first);
    const table = buildTable(rules, first, follow);

    fs.writeFileSync('./output/tree.json', JSON.stringify(viewTree, null, 2));
    fs.writeFileSync('./output/rules.json', JSON.stringify(rules, null, 2));
    fs.writeFileSync('./output/FIRST.json', JSON.stringify(first, null, 2));
    fs.writeFileSync('./output/FOLLOW.json', JSON.stringify(follow, null, 2));
    fs.writeFileSync('./output/table.json', JSON.stringify(table, null, 2));
} catch (e) {
    console.error(e);
}



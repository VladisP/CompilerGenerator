#!/usr/bin/env node --experimental-modules

import {CommandBuilder} from './src/commander/commandBuilder.js';
import {GeneratorApp} from './src/generator/application.js';
import {CalculatorApp} from './src/calculator/application.js';

CommandBuilder
    .of(process.argv)
    .createGenerateCommand((path) => run(path, GeneratorApp))
    .createCalculateCommand((path) => run(path, CalculatorApp))
    .parse();

function run(path, AppConstructor) {
    try {
        const app = new AppConstructor(path);
        app.run();
    } catch (e) {
        console.error(e);
    }
}
import commander from 'commander';

export class CommandBuilder {
    constructor(args) {
        this.args = args;
        commander.version('1.0.0').description('CLI for generating parsing tables and more');
    }

    static of(args) {
        return new CommandBuilder(args);
    }

    createGenerateCommand(runGenerator) {
        commander
            .command('generate <path-to-grammar>')
            .description('Generates tree, rules, FIRST, FOLLOW, table and write them to \'generator-output\' directory')
            .action(runGenerator);

        return this;
    }

    createCalculateCommand(runCalculator) {
        commander
            .command('calculate <path-to-expr>')
            .description('Generates a parsing tree for an arithmetic expression, calculates its value and write results to \'calculator-output\' directory')
            .action(runCalculator);

        return this;
    }

    parse() {
        commander.parse(this.args);
    }
}
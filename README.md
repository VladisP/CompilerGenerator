# Compiler Generator

CLI for generating parsing tables and more

## Installation

- Clone repo
- `npm install`
- `npm install -g`

## Usage

`compiler-cli [options] [command]`

```
Options:
  -V, --version               Output the version number
  -h, --help                  Display help for command

Commands:
  generate <path-to-grammar>  Generates tree, rules, FIRST, FOLLOW, table and write them to 'generator-output' directory
  calculate <path-to-expr>    Generates a parsing tree for an arithmetic expression, calculates its value and write results to 'calculator-output' directory
  help [command]              Display help for command
```
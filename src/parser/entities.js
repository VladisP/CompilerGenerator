export class Terminal {
    constructor(token) {
        this.token = token;
    }
}

export class NonTerminal {
    constructor({name, rule}) {
        this.name = name;
        this.rule = rule;
        this.children = [];
    }
}

export class Node {
    constructor({symbol, parent}) {
        this.symbol = symbol;
        this.parent = parent;
    }
}
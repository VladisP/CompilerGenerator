export class Symbol {
    constructor({name, isTerminal, domain}) {
        this.name = name;
        this.isTerminal = isTerminal;
        this.domain = domain;
    }

    static of(props) {
        return new Symbol(props);
    }
}
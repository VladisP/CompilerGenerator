export class Symbol {
    constructor({value, isTerminal}) {
        this.value = value;
        this.isTerminal = isTerminal;
    }

    static of(props) {
        return new Symbol(props);
    }
}
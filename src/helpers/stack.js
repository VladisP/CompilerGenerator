export class Stack {
    constructor() {
        this.$data = [];
    }

    push(item) {
        this.$data.push(item);
    }

    pop() {
        return this.$data.pop();
    }

    get top() {
        return this.$data[this.$data.length - 1];
    }

    get empty() {
        return this.$data.length === 0;
    }
}
import {Stack} from '../../helpers/stack.js';
import {Domains} from '../lexer/domains.js';
import {CalcExprAtom} from './exprAtom.js';

export function calculate({children: tree}) {
    const expr = getExpr(tree);
    const postfixExpr = getPostfixExpr(expr);
    const stack = new Stack();

    for (const atom of postfixExpr) {
        if (atom.number) {
            stack.push(atom.value);
        } else {
            stack.push(opsMap[atom.value](stack.pop(), stack.pop()));
        }
    }

    return stack.pop();
}

const opsMap = {
    [Domains.ADD]: (a, b) => a + b,
    [Domains.MUL]: (a, b) => a * b
};

function getExpr(tree) {
    let expr = [];

    for (const node of tree) {
        expr = node.children ?
            expr.concat(getExpr(node.children)) :
            expr.concat(new CalcExprAtom(node.token));
    }

    return expr;
}

function getPostfixExpr(expr) {
    const queue = [];
    const stack = new Stack();

    expr.slice(0, expr.length - 1).forEach((atom) => {
        if (atom.number) {
            queue.push(atom);
        } else if (atom.value === Domains.LPAREN) {
            stack.push(atom);
        } else if (atom.value === Domains.RPAREN) {
            while (stack.top.value !== Domains.LPAREN) {
                queue.push(stack.pop());
            }

            stack.pop();
        } else {
            while (!stack.empty && stack.top.priority >= atom.priority) {
                queue.push(stack.pop());
            }

            stack.push(atom);
        }
    });

    while (!stack.empty) {
        queue.push(stack.pop());
    }

    return queue;
}
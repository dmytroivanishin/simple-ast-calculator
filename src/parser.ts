import { Iterator } from "./iterator";
import { Operator } from "./types";

export class ASTNode {
  public left: number | ASTNode;

  public operator: Operator;

  public right: number | ASTNode

  constructor(left: number | ASTNode, operator: Operator, right: number | ASTNode) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  static createNode(left: number | ASTNode, operator: Operator, right: number | ASTNode) {
    return new ASTNode(left, operator, right);
  }
}

export class Parser {
  private iterator: Iterator;

  constructor(iterator: Iterator) {
    this.iterator = iterator;
  }

  parse(left: number | ASTNode, min: number = 0): ASTNode {
    let lookaheadToken: string | number | null = this.iterator.lookahead();
    let nextToken: number | null = null;
    let operator: Operator | null = null;
    let right: number | ASTNode | null = null;

    while (Parser.precedence[lookaheadToken as Operator] >= min) {
      operator = lookaheadToken as Operator;

      this.iterator.next();

      nextToken = this.iterator.lookahead() as number;

      this.iterator.next();

      right = nextToken;
      lookaheadToken = this.iterator.lookahead();

      while (Parser.precedence[lookaheadToken as Operator] > Parser.precedence[operator]) {
        right = this.parse(right, Parser.precedence[operator] + 1);

        lookaheadToken = this.iterator.lookahead();
      }

      left = ASTNode.createNode(left, operator, right);
    }

    return left as ASTNode;
  }

  static precedence = {
    [Operator.ADD]: 1,
    [Operator.SUBSTRACT]: 1,
    [Operator.MULTIPLY]: 2,
    [Operator.DEVIDE]: 2,
  }

  static start(iterator: Iterator): number {
    return iterator.next() as number;
  }
}
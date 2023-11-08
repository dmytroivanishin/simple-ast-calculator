import { ASTNode } from "./parser";
import { Operator } from "./types";

export class ASTMath {
  static add(x: number, y: number) { return x + y };
  static substract(x: number, y: number) { return x - y };
  static multiply(x: number, y: number) { return x * y };
  static devide(x: number, y: number) { return x / y };

  static operators = {
    [Operator.ADD]: ASTMath.add,
    [Operator.SUBSTRACT]: ASTMath.substract,
    [Operator.MULTIPLY]: ASTMath.multiply,
    [Operator.DEVIDE]: ASTMath.devide,
  };

  static calculate(node: ASTNode): number {
    const calculate = ASTMath.operators[node.operator];

    return calculate(node.left as number, node.right as number);
  }
}
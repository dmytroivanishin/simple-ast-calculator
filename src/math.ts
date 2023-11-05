import { ASTNode, Operator } from "./types";

export class BinaryMath {
  static add(x: number, y: number) { return x + y };
  static substract(x: number, y: number) { return x - y };
  static multiply(x: number, y: number) { return x * y };
  static devide(x: number, y: number) { return x / y };

  static operators = {
    [Operator.ADD]: BinaryMath.add,
    [Operator.SUBSTRACT]: BinaryMath.substract,
    [Operator.MULTIPLY]: BinaryMath.multiply,
    [Operator.DEVIDE]: BinaryMath.devide,
  };

  static calculate(node: ASTNode): number {
    const calculate = BinaryMath.operators[node.operator];

    return calculate(node.left as number, node.right as number);
  }
}
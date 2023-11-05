import { BinaryMath } from "./math";
import { ASTNode } from "./types";

export class SimpleASTCalculator {
  private AST: ASTNode;

  constructor(AST: ASTNode) {
    this.AST = AST;
  }

  public compile(node: [ASTNode] = [this.AST]): number {
    return node.reduce<number>((_, node: ASTNode) => {
      if (String(node.left) === '[object Object]') {
        const left = this.compile([node.left as ASTNode]);

        const compiledLeftNode = {
          ...node,
          left,
        };

        return BinaryMath.calculate(compiledLeftNode);
      }

      if (String(node.right) === '[object Object]') {
        const right = this.compile([node.right as ASTNode]);

        const compiledRightNode = {
          ...node,
          right,
        };

        return BinaryMath.calculate(compiledRightNode);
      }

      return BinaryMath.calculate(node);
    }, 0);
  };
}
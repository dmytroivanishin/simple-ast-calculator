import { ASTMath } from "./math";
import { ASTNode } from "./parser";

export class SimpleASTCalculator {
  private AST: ASTNode;

  constructor(AST: ASTNode) {
    this.AST = AST;
  }

  public compile(node: [ASTNode] = [this.AST]): number {
    return node.reduce((_, node: ASTNode) => {
      if (node.left instanceof ASTNode) {
        const left = this.compile([node.left]);

        const compiledLeftNode = {
          ...node,
          left,
        };

        return ASTMath.calculate(compiledLeftNode);
      }

      if (node.right instanceof ASTNode) {
        const right = this.compile([node.right]);

        const compiledRightNode = {
          ...node,
          right,
        };

        return ASTMath.calculate(compiledRightNode);
      }

      return ASTMath.calculate(node);
    }, 0);
  };
}
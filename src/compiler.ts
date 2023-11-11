import { ASTMath } from "./math";
import { ASTNode } from "./parser";

export class SimpleASTCalculator {
  private AST: ASTNode;

  constructor(AST: ASTNode) {
    this.AST = AST;
  }

  public compile(node: [ASTNode] = [this.AST]): number {
    return node.reduce((_, node: ASTNode) => {
      let compiledLeftNode: number = NaN;
      let compiledRightNode: number = NaN;

      if (node.left instanceof ASTNode) {
        compiledLeftNode = this.compile([node.left]);
      }

      if (node.right instanceof ASTNode) {
        compiledRightNode = this.compile([node.right]);
      }

      const compiledNode = {
        ...node,
        left: compiledLeftNode || node.left,
        right: compiledRightNode || node.right,
      };

      return ASTMath.calculate(compiledNode);
    }, 0);
  };
}
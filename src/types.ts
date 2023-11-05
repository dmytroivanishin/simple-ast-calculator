export enum Operator {
  ADD = '+',
  SUBSTRACT = '-',
  MULTIPLY = '*',
  DEVIDE = '/',
};

export interface ASTNode {
  left: number | ASTNode;
  operator: Operator;
  right: number | ASTNode;
}

export enum TokenType {
  Numeric = 'Numeric',
  Operator = 'Operator',
  Space = 'Space',
  Error = 'Error',
};

import { ASTNode, TokenType, Operator } from "./types";

const stringCalc = '2 + 3 * 6';

const patterns = {
  Numeric: /^([0-9]+)/,
  Operator: /^(\+|\-|\*|\/)/,
  Space: /^(\s)/,
  Error: /^([^\d\s\+\-\*\/])+/,
};

/*
* Tokenizer
*/

class Token {
  public type: TokenType;

  public value: string;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
  }

  static createToken(type: TokenType, value: string) {
    return new Token(type, value);
  }
}

class NumericToken {
  public type: TokenType;

  public value: number;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = parseInt(value);
  }

  static createToken(type: TokenType, value: string) {
    return new NumericToken(type, value);
  }
}

const creators = {
  [TokenType.Numeric]: NumericToken.createToken,
  default: Token.createToken,
};

class Tokenizer {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  public tokenize(): (Token | NumericToken)[] {
    let currentStep = 0;
    const tokens: (Token | NumericToken)[] = [];

    while (currentStep < this.input.length) {
      const input = this.input.slice(currentStep);

      this.tokenizeCurrentInput(input)
        .filter(Boolean)
        .forEach((data) => {
          tokens.push(data!.token);

          currentStep += data!.step;
        });
    }

    return tokens;
  }

  public format(tokens: (Token | NumericToken)[]) {
    const formattedInput = [];
    let index = 0;

    while (index < tokens.length) {
      if (patterns.Space.test(tokens[index].value as string)) {
        index += 1;

        continue;
      }

      formattedInput.push(tokens[index]);

      index += 1;
    }

    return formattedInput;
  }

  private createToken(type: TokenType, value: string | undefined) {
    if (!value) {
      return null;
    }

    const creator = creators[type as keyof typeof TokenType & 'default'];
    const create = creator ? creator : creators.default;

    return {
      token: create(type, value),
      step: this.getNexStep(value),
    };
  }

  private getNexStep(input: string) {
    return input.length;
  }

  private tokenizeFunction(type: TokenType, input: string, pattern: RegExp) {
    const data = input.match(pattern) || [];
    const value = data[0];

    return this.createToken(type, value);
  }

  private tokenizeNumber(input: string) {
    return this.tokenizeFunction(TokenType.Numeric, input, patterns.Numeric);
  }

  private tokenizeOperator(input: string) {
    return this.tokenizeFunction(TokenType.Operator, input, patterns.Operator);
  }

  private tokenizeSpace(input: string) {
    return this.tokenizeFunction(TokenType.Space, input, patterns.Space);
  }

  private tokenizeError(input: string) {
    return this.tokenizeFunction(TokenType.Error, input, patterns.Error);
  }

  private tokenizeCurrentInput(input: string) {
    return [
      this.tokenizeNumber(input),
      this.tokenizeOperator(input),
      this.tokenizeSpace(input),
      this.tokenizeError(input),
    ];
  }
}

/*
* Iterator
*/

class Iterator {
  private tokens: (Token | NumericToken)[];

  private index: number;

  constructor(tokens: (Token | NumericToken)[]) {
    this.tokens = tokens;
    this.index = 0;
  }

  has() {
    return !!this.tokens[this.index];
  }

  lookahead() {
    if (this.has()) {
      return this.tokens[this.index].value;
    }

    return null;
  }

  next() {
    if (this.has()) {
      return this.tokens[this.index++].value;
    }

    return null;
  }
}

/*
* Parser
*/

class Node implements ASTNode {
  public left: number | ASTNode;

  public operator: Operator;

  public right: number | ASTNode

  constructor(left: number | ASTNode, operator: Operator, right: number | ASTNode) {
    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  static createNode(left: number | Node, operator: Operator, right: number | Node) {
    return new Node(left, operator, right);
  }
}

class Parser {
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

      left = Node.createNode(left, operator, right);
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

/*
* Math
*/

class BinaryMath {
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

/*
* Compiler
*/

class SimpleASTCalculator {
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

const tokenizer = new Tokenizer(stringCalc);

const tokinazedInput = tokenizer.tokenize();
const formattedInput = tokenizer.format(tokinazedInput);

const iterator = new Iterator(formattedInput);

const parser = new Parser(iterator);

const AST = parser.parse(Parser.start(iterator));

const ASTCalculator = new SimpleASTCalculator(AST);

console.log(JSON.stringify(AST, null, 2));
console.log(ASTCalculator.compile());
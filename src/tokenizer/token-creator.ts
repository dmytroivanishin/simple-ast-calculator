import { TokenType } from "../types";

export class Token {
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

export class NumericToken {
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

export const creators = {
  [TokenType.Numeric]: NumericToken.createToken,
  default: Token.createToken,
};

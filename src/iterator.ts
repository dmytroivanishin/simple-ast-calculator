import { NumericToken, Token } from "./tokenizer/token-creator";

export class Iterator {
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
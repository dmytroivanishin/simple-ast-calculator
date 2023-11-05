import { TokenType } from "../types";
import { NumericToken, Token, creators } from "./token-creator";

export const patterns = {
  Numeric: /^([0-9]+)/,
  Operator: /^(\+|\-|\*|\/)/,
  Space: /^(\s)/,
  Error: /^([^\d\s\+\-\*\/])+/,
};

export class Tokenizer {
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

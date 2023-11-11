import { Tokenizer, Iterator, Parser, SimpleASTCalculator } from "../src";

export const setupParser = (input: string) => {
  const tokenizer = new Tokenizer(input);

  const tokinazedInput = tokenizer.tokenize();
  const formattedInput = tokenizer.format(tokinazedInput);

  const iterator = new Iterator(formattedInput);

  return { iterator, parser: new Parser(iterator) };
};

export const setupCalculator = (input: string) => {
  const { iterator, parser } = setupParser(input);

  const AST = parser.parse(Parser.start(iterator));

  return new SimpleASTCalculator(AST);
};
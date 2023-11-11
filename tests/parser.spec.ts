import { Parser } from "../src";
import { setupParser } from "./utils";
import { expectsAST } from "./fixtures/expects";

describe('AST Parser', () => {
  it('should return correct tree for 2 + 3 * 4', () => {
    const { iterator, parser } = setupParser('2 + 3 * 4');

    expect(parser.parse(Parser.start(iterator))).toEqual(expectsAST["2 + 3 * 4"]);
  });

  it('should return correct tree for 2 * 3 + 4', () => {
    const { iterator, parser } = setupParser('2 * 3 + 4');

    expect(parser.parse(Parser.start(iterator))).toEqual(expectsAST["2 * 3 + 4"]);
  });

  it('should return correct tree for 2 + 3 + 4 + 5 + 6 * 2', () => {
    const { iterator, parser } = setupParser('2 + 3 + 4 + 5 + 6 * 2');

    expect(parser.parse(Parser.start(iterator))).toEqual(expectsAST["2 + 3 + 4 + 5 + 6 * 2"]);
  });

  it('should return correct tree for 6 / 3 + 4', () => {
    const { iterator, parser } = setupParser('6 / 3 + 4');

    expect(parser.parse(Parser.start(iterator))).toEqual(expectsAST["6 / 3 + 4"]);
  });

  it('should return correct tree for 6 - 3 + 4', () => {
    const { iterator, parser } = setupParser('6 - 3 + 4');

    expect(parser.parse(Parser.start(iterator))).toEqual(expectsAST["6 - 3 + 4"]);
  });
});
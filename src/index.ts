import { SimpleASTCalculator } from "./compiler";
import { Iterator } from "./iterator";
import { Parser } from "./parser";
import { Tokenizer } from "./tokenizer";

const input = '2 + 3 * 6';

const tokenizer = new Tokenizer(input);

const tokinazedInput = tokenizer.tokenize();
const formattedInput = tokenizer.format(tokinazedInput);

const iterator = new Iterator(formattedInput);

const parser = new Parser(iterator);

const AST = parser.parse(Parser.start(iterator));

const ASTCalculator = new SimpleASTCalculator(AST);

console.log(JSON.stringify(AST, null, 2));
console.log(ASTCalculator.compile());
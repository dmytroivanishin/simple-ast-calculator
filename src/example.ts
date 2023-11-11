import { Tokenizer } from "./tokenizer";
import { Iterator } from "./iterator";
import { Parser } from "./parser";
import { SimpleASTCalculator } from "./compiler";

const input = '2 + 3 * 6';

const tokenizer = new Tokenizer(input);

const tokinazedInput = tokenizer.tokenize();
const formattedInput = tokenizer.format(tokinazedInput);

const iterator = new Iterator(formattedInput);

const parser = new Parser(iterator);

const AST = parser.parse(Parser.start(iterator));

const ASTCalculator = new SimpleASTCalculator(AST);

console.log('========== INPUT ==========');
console.log(input);
console.log('=========== AST ===========');
console.log(JSON.stringify(AST, null, 2));
console.log('========= RESULT ==========');
console.log(ASTCalculator.compile());
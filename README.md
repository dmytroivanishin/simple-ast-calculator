# Simple AST Calculator
The project was created for educational purposes, creating AST and parsing with operator precedence and compiling data from AST to result.

## Usage

Install dependencies
```
npm i
```

Type expression to [input](https://github.com/dmytroivanishin/simple-ast-calculator/blob/main/src/index.ts#L6) variable into index.ts

```
const input = '2 + 3 * 6';
```
Build changes

```
npm run build
```

Run calculation
```
node ./dist/index.js
```
Result
```
{
  "left": 2,
  "operator": "+",
  "right": {
    "left": 3,
    "operator": "*",
    "right": 6
  }
}

20
```

## Source
* [Wikipedia](https://en.wikipedia.org/wiki/Operator-precedence_parser)

## Useful links
* [Article 1](https://ruslanspivak.com/lsbasi-part7/)
* [Article 2](https://blog.klipse.tech/javascript/2017/02/08/tiny-compiler-intro.html)
* [Video 1](https://youtu.be/jIxsH3E-Hjg)
* [Video 2](https://youtu.be/PPuCvN-WoWc)
* [Article 3](https://blog.scottlogic.com/2016/06/22/xslt-inspired-ast-transforms.html)
* [Article 4](https://dev.to/jrop/pratt-parsing)
* [Article 5](https://pest.rs/book/examples/jlang.html)
* [Article 6](https://pest.rs/book/precedence.html)
* [Article 7](https://pest.rs/book/examples/calculator.html)
* [Article 8](https://eli.thegreenplace.net/2012/08/02/parsing-expressions-by-precedence-climbing)
* [Article 9](https://medium.com/basecs/leveling-up-ones-parsing-game-with-asts-d7a6fc2400ff)
* [Vdieo 3](https://youtu.be/SToUyjAsaFk)
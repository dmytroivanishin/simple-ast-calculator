import expect2Add3Multiply4 from './expect-2-add-3-multiply-4.json';
import expect2Multiply3Add4 from './expect-2-multiply-3-add-4.json';
import expect2Add3Add4Add5Add6Multiply2 from './expect-2-add-3-add-4-add-5-add-6-multiply-2.json';
import expect6Divide3Add4 from './expect-6-divide-3-add-4.json';
import expect6Substract3Add4 from './expect-6-substract-3-add-4.json';

export const expectsAST = {
  '2 + 3 * 4': expect2Add3Multiply4,
  '2 * 3 + 4': expect2Multiply3Add4,
  '2 + 3 + 4 + 5 + 6 * 2': expect2Add3Add4Add5Add6Multiply2,
  '6 / 3 + 4': expect6Divide3Add4,
  '6 - 3 + 4': expect6Substract3Add4,
}
/* eslint-disable no-eval */
const { baseN } = require('./base-n');

const CONCAT_OPERATOR = '';
const OPERATORS = ['+', '-', '*', '/', CONCAT_OPERATOR];

// for every "between" in string, put one of
// ['+', '-', '*', '/', ''] where blank string represents the "concat" operator.
//  e.g. '25109476' becomes '2/5*1-0+947/6'
const combineAndEvaluate = (numstr, target) => {
  const expressions = [];
  const betweens = numstr.length - 1;
  const opsBaseN = baseN(OPERATORS, betweens);
  for (const ops of opsBaseN) {
    const expr = String.raw({ raw: numstr }, ...ops); // use ...expansion
    if (eval(expr) === target) {
      expressions[expressions.length] = expr;
    }
  }
  return expressions.sort();
};

module.exports.EquationMaker = (numstr, target) => {
  const targetInt = parseInt(target, 10);
  return combineAndEvaluate(numstr, targetInt);
};

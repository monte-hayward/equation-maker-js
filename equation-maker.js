/* eslint-disable no-eval */
const { raw } = String;
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
  const makeAndTest = (ops) => {
    const expr = raw({ raw: numstr }, ...ops);
    if (eval(expr) === target) {
      expressions[expressions.length] = expr;
    }
  };
  for (const ops of opsBaseN) makeAndTest(ops); /* eslint-disable-line no-restricted-syntax */
  return expressions.sort();
};

module.exports.EquationMaker = (numstr, target) => {
  const targetInt = parseInt(target, 10);
  return combineAndEvaluate(numstr, targetInt);
};

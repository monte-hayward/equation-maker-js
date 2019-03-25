/* eslint-disable consistent-return */

// Adapted from https://github.com/acarl005/generatorics
module.exports.baseN = function* baseN(arr, size = arr.length) {
  const data = [];
  const len = arr.length;
  function* baseNUtil(index) {
    if (index === size) {
      return yield data.slice();
    }
    for (let i = 0; i < len; i += 1) {
      data[index] = arr[i];
      yield* baseNUtil(index + 1);
    }
  }
  yield* baseNUtil(0);
};

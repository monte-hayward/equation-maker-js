## Problem Statement

> Given a string of numbers, you can interpolate basic  operations (+, -, * and /) to create an equation that can be 
evaluated using simple math. Given a string of numbers and a value, write a method that prints all of the equations 
that can be generated using that string that evaluate to the given value. ex- f("323",3) will print out 
"3 * 2 - 3"

Sources

- [Glassdoor.com](https://www.glassdoor.com/Interview/Given-a-string-of-numbers-you-can-interpolate-basic-operations-and-to-create-an-equation-that-can-be-evaluated-QTN_1458714.htm)
- [geeksforgeeks.org](https://www.geeksforgeeks.org/print-all-possible-expressions-that-evaluate-to-a-target/)

A [Heap's permutation](https://en.wikipedia.org/wiki/Heap's_algorithm) is not enough, because we have three inputs and a couple of bonus rules.

1. String of number chars
2. The target resolution number
3. The set of possible operators
4. Implied rules:
 	 - operators can only go between numbers, not at either end of an expression.
 	 - operators can be repeated; chars appear in same frequency and sequence as input.

I chose to assume that the number chars could not be rearranged.


## The "Betweens"

"Betweens" are the positions between input chars in which an operator can be inserted.
There are always n-1 betweens.

```javascript
const input = '12345';
// 1 2 3 4 5
//  ^ ^ ^ ^
```
For every "between" in string, we put one of our operators:

`['+', '-', '*', '/', '']`

Blank string represents the "concat" operator.
e.g. '25109476' becomes '2/5*1-0+947/6'
The set of operator might be larger than you think, because the 
number of operators = `inputs.length -1`. However, this is not the case, as
 
- operator order matters
- operators can be repeated `n-1` times

A complete solution consists of :

- a Heap's permutation of the input chars (only swapping, no dupes.)
- a list of all possible operator combinations (combination with repeats, order does not matter).
- application of 
  - each operator combo in 
    - each order
      - to each input permutation[1].
- evaluation of all generated expressions

Use of JavaScript `String.raw` with template strings and expansion
made it possible to avoid some array twiddling. The expression starts and ends as a string.
const expr = String.raw({ raw: numstr }, ...ops); // use ...expansion

**Attempt 1**: I tried recursion, which resulted in `Maximum call stack size exceeded`.

**Attempt 2**: eliminated recursion.
I tried a pseudo-random approach, then abandoned it; it repeats itself, forcing you to track all answers, 
not just the successful ones. Iterations are excessive, and memory usage grows.

At certain lengths of input chars, an error would occur related leading zeros.

```text
"Octal literals are not allowed in strict mode"

because 028 should be expressed 0o28
2-71*8+28/1*8*2*8/4*5+9-0+452/353/6-028+7-4/7-1-3-52+7

because 03 should be expressed 0o3
err: 1/6-1*8-03*39+8-8/7*49/8/9*4-8-4*8*2-0
```

I made a note to put in a case / guard for that or turn off strict mode.

**Attempt 3** used a generator function to create each operator combination, test it, and store 
only the successful ones. With it, I was able to solve for the first 12 digits of Pi, and saw
stable memory and CPU usage.

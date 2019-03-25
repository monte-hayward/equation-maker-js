import { EquationMaker } from './equation-maker';
import pi10 from './data/pi-10.json';
import pi11 from './data/pi-11.json';
import pi12 from './data/pi-12.json';


describe('EquationMaker', () => {
  xtest('sum only', () => {
    expect(new EquationMaker('456', 15)).toEqual(['4+5+6']);
  });

  // change `xtest` to `test` to activate a given test
  xtest('concatted numbers, one operator', () => {
    expect(new EquationMaker('2510', 35)).toEqual(['25+10']);
  });

  xtest('ones are special', () => {
    expect(new EquationMaker('111', 1)).toEqual(['1*1*1', '1*1/1', '1+1-1', '1-1+1', '1/1*1', '1/1/1']);
  });

  xtest('pi 5', () => {
    const pi5 = new EquationMaker('31415', 13);
    expect(pi5).toEqual(['3*1+4+1+5', '3+1*4+1+5', '3+1+4*1+5', '3+1+4+1*5', '3+1+4/1+5', '3+14+1-5', '3-1-4+15', '3/1+4+1+5']);
  });

  test('Pi 7', () => {
    expect(new EquationMaker('3141592', 363)).toEqual(['3*1+4*1*5*9*2', '3*1+4/1*5*9*2', '3+1*4*1*5*9*2', '3+1*4/1*5*9*2', '3/1+4*1*5*9*2', '3/1+4/1*5*9*2']);
  });

  xtest('Pi 10', () => {
    expect(new EquationMaker('3141592653', 363)).toEqual(pi10);
  });

  xtest('Pi 11', () => {
    expect(new EquationMaker('31415926535', 363)).toEqual(pi11);
  });

  // NOTE: Expect 15-30 min run time!
  xtest('Pi 12', () => {
    expect(new EquationMaker('314159265358', 363)).toEqual(pi12);
  });

  // DANGER
  xtest('golden ratio', () => {
    expect(new EquationMaker('161803398874989484820', 314).toEqual(/* an egregious array */));
  });

  // DANGER
  xtest('Euler\'s number', () => {
    expect(new EquationMaker('27182818284590452353602874713527', 6)).toEqual(/* an egregious array */);
  });
});

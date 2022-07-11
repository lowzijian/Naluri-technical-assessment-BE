//Reference to https://trans4mind.com/personal_development/JavaScript/longnumPiMachin.htm

let mess = "";
let Base = Math.pow(10, 11);
let cellSize = Math.floor(Math.log(Base) / Math.LN10);
let a = Number.MAX_VALUE;
let MaxDiv = Math.floor(Math.sqrt(a));

const makeArray = (n: number, aX: number[], Integer: number) => {
  var i = 0;
  for (i = 1; i < n; i++) aX[i] = null;
  aX[0] = Integer;
};

const isEmpty = (aX: number[]) => {
  var empty = true;
  for (let i = 0; i < aX.length; i++)
    if (aX[i]) {
      empty = false;
      break;
    }
  return empty;
};

const Add = (n: number, aX: number[], aY: number[]) => {
  let carry = 0;
  for (let i = n - 1; i >= 0; i--) {
    aX[i] += Number(aY[i]) + Number(carry);
    if (aX[i] < Base) carry = 0;
    else {
      carry = 1;
      aX[i] = Number(aX[i]) - Number(Base);
    }
  }
};

const Sub = (n: number, aX: number[], aY: number[]) => {
  for (let i = n - 1; i >= 0; i--) {
    aX[i] -= aY[i];
    if (aX[i] < 0) {
      if (i > 0) {
        aX[i] += Base;
        aX[i - 1]--;
      }
    }
  }
};

const Mul = (n: number, aX: number[], iMult: number) => {
  let carry = 0;
  for (let i = n - 1; i >= 0; i--) {
    let prod = aX[i] * iMult;
    prod += carry;
    if (prod >= Base) {
      carry = Math.floor(prod / Base);
      prod -= carry * Base;
    } else carry = 0;
    aX[i] = prod;
  }
};

const Div = (n: number, aX: number[], iDiv: number, aY: number[]) => {
  let carry = 0;
  for (let i = 0; i < n; i++) {
    const currVal = Number(aX[i]) + Number(carry * Base);
    const theDiv = Math.floor(currVal / iDiv);
    carry = currVal - theDiv * iDiv;
    aY[i] = theDiv;
  }
};

const arctan = (
  iAng: number,
  n: number,
  aX: number[],
  aAngle: number[],
  aDivK: number[]
) => {
  let iAng_squared = iAng * iAng;
  let k = 3;
  let sign = 0;
  makeArray(n, aX, 0);
  makeArray(n, aAngle, 1);
  Div(n, aAngle, iAng, aAngle);
  Add(n, aX, aAngle);
  while (!isEmpty(aAngle)) {
    Div(n, aAngle, iAng_squared, aAngle);
    Div(n, aAngle, k, aDivK);
    if (sign) Add(n, aX, aDivK);
    else Sub(n, aX, aDivK);
    k += 2;
    sign = 1 - sign;
  }
};

const generatePi = (numDec) => {
  let ans = "";
  let t1 = new Date();
  numDec = Number(numDec) + 5;
  let iAng = new Array(10);
  let coeff = new Array(10);
  let arrayLength = Math.ceil(1 + numDec / cellSize);
  let aPI = new Array(arrayLength);
  let aArctan = new Array(arrayLength);
  let aAngle = new Array(arrayLength);
  let aDivK = new Array(arrayLength);
  coeff[0] = 4;
  coeff[1] = -1;
  coeff[2] = 0;
  iAng[0] = 5;
  iAng[1] = 239;
  iAng[2] = 0;
  makeArray(arrayLength, aPI, 0);
  makeArray(arrayLength, aAngle, 0);
  makeArray(arrayLength, aDivK, 0);
  for (var i = 0; coeff[i] != 0; i++) {
    arctan(iAng[i], arrayLength, aArctan, aAngle, aDivK);
    Mul(arrayLength, aArctan, Math.abs(coeff[i]));
    if (coeff[i] > 0) Add(arrayLength, aPI, aArctan);
    else Sub(arrayLength, aPI, aArctan);
  }
  Mul(arrayLength, aPI, 4);
  let sPI = "";
  let tempPI = "";
  for (i = 0; i < aPI.length; i++) {
    aPI[i] = String(aPI[i]);
    if (aPI[i].length < cellSize && i != 0) {
      while (aPI[i].length < cellSize) aPI[i] = "0" + aPI[i];
    }
    tempPI += aPI[i];
  }
  for (i = 0; i <= numDec; i++) {
    if (i == 0) sPI += tempPI.charAt(i) + ".";
    else {
      sPI += tempPI.charAt(i);
    }
  }
  ans = sPI;
  return ans;
};

export default generatePi;

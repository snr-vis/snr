import { range } from 'd3-array';

/**
 * Check if symbol is undefined
 * @param {Symbol} x
 * @return {Boolean} isUndefined
 */
function isUndefined(x) {
  return typeof x === 'undefined';
}

/**
 * Convert floating point percentage scaled between 0 and 1 to percentage between 0 and 100
 * @param {float} x
 * @return {integer} Converted percentage
 */
function getPercentageFromFloat(x) {
  return Math.round(parseFloat(x) * 100);
}

/**
 * Compare two arrays and check if their contents are identical
 * @param {array} a Array a
 * @param {array} b Array b
 * @return {boolean} Arrays are identical
 */
function areIdentical(a, b) {
  // If lengths do not match they are not identical
  if (a.length !== b.length) {
    return false;
  }
  // Iterate over all array entries of a and their indexes
  let index = 0;
  for (const itemA of a) {
    const itemB = b[index];
    if (itemA !== itemB) {
      return false;
    }
    index += 1;
  }
  // If we find nothing, they are identical
  return true;
}

// From https://gist.github.com/yamadayuki/f1ea9ccacad7f1c140457b5877fb54cc
const injectStyle = style => {
  const styleElement = document.createElement('style');
  let styleSheet = null;
  document.head.appendChild(styleElement);
  styleSheet = styleElement.sheet;
  styleSheet.insertRule(style, styleSheet.cssRules.length);
};

/**
 * Map out value index for usage in for of loop
 * See [https://stackoverflow.com/questions/36108110/typescript-for-of-with-index-key](https://stackoverflow.com/questions/36108110/typescript-for-of-with-index-key)
 * @param {Array} a
 */
function toItemIndexes<T>(a: T[]) {
  return a.map((item, index) => ({ item, index }));
}

function createDummyDataScatterplot(entryCount = 25) {
  let xValues = range(entryCount).map(() => Math.random());
  let yValues = range(entryCount).map(() => Math.random());
  return { xValues: xValues, yValues: yValues };
}

function createDummySettingsScatterplot() {
  return {
    x: { variableName: 'xValues', label: 'dummy x values' },
    y: { variableName: 'yValues', label: 'dummy y values' },
  };
}

function getIrisNewFormat() {
  let iris = getIris();
  let irisKeys = Object.keys(iris);
  let irisNewFormat = [];
  for (let i in iris[irisKeys[0]]) {
    let newEntry = {};
    for (let j in irisKeys) {
      newEntry[irisKeys[j]] = iris[irisKeys[j]][i];
    }
    irisNewFormat.push(newEntry);
  }
  return { data: irisNewFormat };
}

function getIris() {
  return {
    sepalLength: [
      5.1,
      4.9,
      4.7,
      4.6,
      5.0,
      5.4,
      4.6,
      5.0,
      4.4,
      4.9,
      5.4,
      4.8,
      4.8,
      4.3,
      5.8,
      5.7,
      5.4,
      5.1,
      5.7,
      5.1,
      5.4,
      5.1,
      4.6,
      5.1,
      4.8,
      5.0,
      5.0,
      5.2,
      5.2,
      4.7,
      4.8,
      5.4,
      5.2,
      5.5,
      4.9,
      5.0,
      5.5,
      4.9,
      4.4,
      5.1,
      5.0,
      4.5,
      4.4,
      5.0,
      5.1,
      4.8,
      5.1,
      4.6,
      5.3,
      5.0,
      7.0,
      6.4,
      6.9,
      5.5,
      6.5,
      5.7,
      6.3,
      4.9,
      6.6,
      5.2,
      5.0,
      5.9,
      6.0,
      6.1,
      5.6,
      6.7,
      5.6,
      5.8,
      6.2,
      5.6,
      5.9,
      6.1,
      6.3,
      6.1,
      6.4,
      6.6,
      6.8,
      6.7,
      6.0,
      5.7,
      5.5,
      5.5,
      5.8,
      6.0,
      5.4,
      6.0,
      6.7,
      6.3,
      5.6,
      5.5,
      5.5,
      6.1,
      5.8,
      5.0,
      5.6,
      5.7,
      5.7,
      6.2,
      5.1,
      5.7,
      6.3,
      5.8,
      7.1,
      6.3,
      6.5,
      7.6,
      4.9,
      7.3,
      6.7,
      7.2,
      6.5,
      6.4,
      6.8,
      5.7,
      5.8,
      6.4,
      6.5,
      7.7,
      7.7,
      6.0,
      6.9,
      5.6,
      7.7,
      6.3,
      6.7,
      7.2,
      6.2,
      6.1,
      6.4,
      7.2,
      7.4,
      7.9,
      6.4,
      6.3,
      6.1,
      7.7,
      6.3,
      6.4,
      6.0,
      6.9,
      6.7,
      6.9,
      5.8,
      6.8,
      6.7,
      6.7,
      6.3,
      6.5,
      6.2,
      5.9,
    ],
    sepalWidth: [
      3.5,
      3.0,
      3.2,
      3.1,
      3.6,
      3.9,
      3.4,
      3.4,
      2.9,
      3.1,
      3.7,
      3.4,
      3.0,
      3.0,
      4.0,
      4.4,
      3.9,
      3.5,
      3.8,
      3.8,
      3.4,
      3.7,
      3.6,
      3.3,
      3.4,
      3.0,
      3.4,
      3.5,
      3.4,
      3.2,
      3.1,
      3.4,
      4.1,
      4.2,
      3.1,
      3.2,
      3.5,
      3.6,
      3.0,
      3.4,
      3.5,
      2.3,
      3.2,
      3.5,
      3.8,
      3.0,
      3.8,
      3.2,
      3.7,
      3.3,
      3.2,
      3.2,
      3.1,
      2.3,
      2.8,
      2.8,
      3.3,
      2.4,
      2.9,
      2.7,
      2.0,
      3.0,
      2.2,
      2.9,
      2.9,
      3.1,
      3.0,
      2.7,
      2.2,
      2.5,
      3.2,
      2.8,
      2.5,
      2.8,
      2.9,
      3.0,
      2.8,
      3.0,
      2.9,
      2.6,
      2.4,
      2.4,
      2.7,
      2.7,
      3.0,
      3.4,
      3.1,
      2.3,
      3.0,
      2.5,
      2.6,
      3.0,
      2.6,
      2.3,
      2.7,
      3.0,
      2.9,
      2.9,
      2.5,
      2.8,
      3.3,
      2.7,
      3.0,
      2.9,
      3.0,
      3.0,
      2.5,
      2.9,
      2.5,
      3.6,
      3.2,
      2.7,
      3.0,
      2.5,
      2.8,
      3.2,
      3.0,
      3.8,
      2.6,
      2.2,
      3.2,
      2.8,
      2.8,
      2.7,
      3.3,
      3.2,
      2.8,
      3.0,
      2.8,
      3.0,
      2.8,
      3.8,
      2.8,
      2.8,
      2.6,
      3.0,
      3.4,
      3.1,
      3.0,
      3.1,
      3.1,
      3.1,
      2.7,
      3.2,
      3.3,
      3.0,
      2.5,
      3.0,
      3.4,
      3.0,
    ],
    petalLength: [
      1.4,
      1.4,
      1.3,
      1.5,
      1.4,
      1.7,
      1.4,
      1.5,
      1.4,
      1.5,
      1.5,
      1.6,
      1.4,
      1.1,
      1.2,
      1.5,
      1.3,
      1.4,
      1.7,
      1.5,
      1.7,
      1.5,
      1.0,
      1.7,
      1.9,
      1.6,
      1.6,
      1.5,
      1.4,
      1.6,
      1.6,
      1.5,
      1.5,
      1.4,
      1.5,
      1.2,
      1.3,
      1.4,
      1.3,
      1.5,
      1.3,
      1.3,
      1.3,
      1.6,
      1.9,
      1.4,
      1.6,
      1.4,
      1.5,
      1.4,
      4.7,
      4.5,
      4.9,
      4.0,
      4.6,
      4.5,
      4.7,
      3.3,
      4.6,
      3.9,
      3.5,
      4.2,
      4.0,
      4.7,
      3.6,
      4.4,
      4.5,
      4.1,
      4.5,
      3.9,
      4.8,
      4.0,
      4.9,
      4.7,
      4.3,
      4.4,
      4.8,
      5.0,
      4.5,
      3.5,
      3.8,
      3.7,
      3.9,
      5.1,
      4.5,
      4.5,
      4.7,
      4.4,
      4.1,
      4.0,
      4.4,
      4.6,
      4.0,
      3.3,
      4.2,
      4.2,
      4.2,
      4.3,
      3.0,
      4.1,
      6.0,
      5.1,
      5.9,
      5.6,
      5.8,
      6.6,
      4.5,
      6.3,
      5.8,
      6.1,
      5.1,
      5.3,
      5.5,
      5.0,
      5.1,
      5.3,
      5.5,
      6.7,
      6.9,
      5.0,
      5.7,
      4.9,
      6.7,
      4.9,
      5.7,
      6.0,
      4.8,
      4.9,
      5.6,
      5.8,
      6.1,
      6.4,
      5.6,
      5.1,
      5.6,
      6.1,
      5.6,
      5.5,
      4.8,
      5.4,
      5.6,
      5.1,
      5.1,
      5.9,
      5.7,
      5.2,
      5.0,
      5.2,
      5.4,
      5.1,
    ],
    petalWidth: [
      0.2,
      0.2,
      0.2,
      0.2,
      0.2,
      0.4,
      0.3,
      0.2,
      0.2,
      0.1,
      0.2,
      0.2,
      0.1,
      0.1,
      0.2,
      0.4,
      0.4,
      0.3,
      0.3,
      0.3,
      0.2,
      0.4,
      0.2,
      0.5,
      0.2,
      0.2,
      0.4,
      0.2,
      0.2,
      0.2,
      0.2,
      0.4,
      0.1,
      0.2,
      0.2,
      0.2,
      0.2,
      0.1,
      0.2,
      0.2,
      0.3,
      0.3,
      0.2,
      0.6,
      0.4,
      0.3,
      0.2,
      0.2,
      0.2,
      0.2,
      1.4,
      1.5,
      1.5,
      1.3,
      1.5,
      1.3,
      1.6,
      1.0,
      1.3,
      1.4,
      1.0,
      1.5,
      1.0,
      1.4,
      1.3,
      1.4,
      1.5,
      1.0,
      1.5,
      1.1,
      1.8,
      1.3,
      1.5,
      1.2,
      1.3,
      1.4,
      1.4,
      1.7,
      1.5,
      1.0,
      1.1,
      1.0,
      1.2,
      1.6,
      1.5,
      1.6,
      1.5,
      1.3,
      1.3,
      1.3,
      1.2,
      1.4,
      1.2,
      1.0,
      1.3,
      1.2,
      1.3,
      1.3,
      1.1,
      1.3,
      2.5,
      1.9,
      2.1,
      1.8,
      2.2,
      2.1,
      1.7,
      1.8,
      1.8,
      2.5,
      2.0,
      1.9,
      2.1,
      2.0,
      2.4,
      2.3,
      1.8,
      2.2,
      2.3,
      1.5,
      2.3,
      2.0,
      2.0,
      1.8,
      2.1,
      1.8,
      1.8,
      1.8,
      2.1,
      1.6,
      1.9,
      2.0,
      2.2,
      1.5,
      1.4,
      2.3,
      2.4,
      1.8,
      1.8,
      2.1,
      2.4,
      2.3,
      1.9,
      2.3,
      2.5,
      2.3,
      1.9,
      2.0,
      2.3,
      1.8,
    ],
    species: [
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'setosa',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'versicolor',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
      'virginica',
    ],
  };
}
function getIrisSettingsScatterplot(variableX = 'sepalWidth', variableY = 'sepalLength') {
  return {
    x: { variableName: variableX, label: 'Sepal Width (cm)' },
    y: { variableName: variableY, label: 'Sepal Length (cm)' },
  };
}

/**
 * objectArray = fish, key = name
 *   fish[0].name = "Forelle"
 *   fish[1].name = "Barsh"
 * to
 *   ["Forelle", "Barsh"]
 * @param  {Array} objectArray: Objects containing elements of `key`
 * @param  {String} key: String of `key`
 * @return {Array} keyArray: Values of `key` in objectArray
 */
function objectValueToArray(objectArray, key) {
  return objectArray.map(value => {
    return value[key];
  });
}

/**
 * Get random value between min and max.
 *
 * @param {Integer} min Minimum value
 * @param {Integer} max Maximum value
 * @return {Integer} Random integer between min and max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class Stopwatch {
  /**
   * Stopwatch is started on object creation.
   * @param {integer} limit Time limit in milliseconds
   */
  constructor(limit) {
    this.limit = limit;
    this.startTime = new Date().getTime();
  }
  getTimeDifference() {
    return new Date().getTime() - this.startTime;
  }
  /**
   * Check if limit amount time has passed since object creation
   * @return {boolean} Time passed sine object creation is over limit.
   */
  overLimit() {
    return new Date().getTime() - this.startTime > this.limit;
  }
}

export {
  createDummyDataScatterplot,
  createDummySettingsScatterplot,
  getIrisNewFormat,
  getIris,
  getIrisSettingsScatterplot,
  objectValueToArray,
  getRandomInt,
  isUndefined,
  toItemIndexes,
  injectStyle,
  areIdentical,
  getPercentageFromFloat,
  Stopwatch,
};

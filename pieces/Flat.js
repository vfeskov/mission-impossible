'use strict';
const generateCuboids = require('./generateCuboids');

const Flat = {
  name: 'Flat',
  variants: [
    [2, 1, 4],
    [4, 1, 2],
    [1, 2, 4],
    [4, 2, 1],
    [2, 4, 1],
    [1, 4, 2]
  ]
}

generateCuboids(Flat);

module.exports = Flat;

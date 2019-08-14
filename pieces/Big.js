'use strict';
const generateCuboids = require('./generateCuboids');

const Big = {
  name: 'Big',
  variants: [
    [2, 3, 2],
    [2, 2, 3],
    [3, 2, 2]
  ]
};

generateCuboids(Big);

module.exports = Big;

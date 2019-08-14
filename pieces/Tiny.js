'use strict';
const generateCuboids = require('./generateCuboids');

const Tiny = {
  name: 'Tiny',
  variants: [
    [1, 1, 1]
  ]
};

generateCuboids(Tiny);

module.exports = Tiny;

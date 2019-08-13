'use strict';
const generateVariantPoints = require('./generateVariantPoints');

const Tiny = {
  name: 'Tiny',
  variants: [
    {
      x: 1,
      y: 1,
      z: 1
    }
  ]
};

generateVariantPoints(Tiny);

module.exports = Tiny;

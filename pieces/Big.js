'use strict';
const generateVariantPoints = require('./generateVariantPoints');

const Big = {
  name: 'Big',
  variants: [
    {
      x: 2,
      y: 3,
      z: 2
    },
    {
      x: 2,
      y: 2,
      z: 3
    },
    {
      x: 3,
      y: 2,
      z: 2
    }
  ]
};

generateVariantPoints(Big);

module.exports = Big;

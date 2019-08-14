'use strict';
const { pieceTypes } = require('./pieces');

function decodeCuboids(cuboids) {
  return cuboids.map(cuboid => {
    const [min, max] = cuboid;
    const variant = [max[0] - min[0], max[1] - min[1], max[2] - min[2]];
    for (let piece of Object.values(pieceTypes)) {
      const match = piece.variants.find(v => v[0] === variant[0] && v[1] === variant[1] && v[2] === variant[2]);
      if (match) {
        return {
          name: piece.name,
          variant,
          coords: min
        };
      }
    }
    return null;
  });
}

module.exports = { decodeCuboids };

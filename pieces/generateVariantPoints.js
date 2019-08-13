const Cube = require('./Cube');

module.exports = function generateVariantPoints(piece) {
  piece.variants.forEach(variant => {
    variant.points = {};
    for (let x = Cube.x - variant.x; x >= 0; x--) {
      if (!variant.points[x]) {
        variant.points[x] = {};
      }
      for (let y = Cube.y - variant.y; y >= 0; y--) {
        if (!variant.points[x][y]) {
          variant.points[x][y] = {};
        }
        for (let z = Cube.z - variant.z; z >= 0; z--) {
          variant.points[x][y][z] = getPoints(variant, { x, y, z });
        }
      }
    }
  });
}

function getPoints(variant, coords) {
  const result = [];
  for (let x = 0; x < variant.x; x++) {
    for (let y = 0; y < variant.y; y++) {
      for (let z = 0; z < variant.z; z++) {
        result.push(
          (x + coords.x) * 25 +
          (y + coords.y) * 5 +
          z + coords.z
        );
      }
    }
  }
  return result;
};

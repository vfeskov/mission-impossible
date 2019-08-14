const Cube = require('./Cube');

module.exports = function generateCuboids(piece) {
  piece.cuboids = [];
  for(let vi = 0; vi < piece.variants.length; vi++) {
    const variant = piece.variants[vi];
    const cuboid = {};
    for (let x = Cube[0] - variant[0]; x >= 0; x--) {
      cuboid[x] = {};
      for (let y = Cube[1] - variant[1]; y >= 0; y--) {
        cuboid[x][y] = {};
        for (let z = Cube[2] - variant[2]; z >= 0; z--) {
          cuboid[x][y][z] = generateCuboid([x, y, z], variant);
        }
      }
    }
    piece.cuboids.push(cuboid);
  }
}

function generateCuboid(min, variant) {
  return [min, [min[0] + variant[0], min[1] + variant[1], min[2] + variant[2]]];
};

const mem = require('mem');

module.exports = mem(function getPoints(variantX, variantY, variantZ, coordsX, coordsY, coordsZ) {
  const result = [];
  for (let x = 0; x < variantX; x++) {
    for (let y = 0; y < variantY; y++) {
      for (let z = 0; z < variantZ; z++) {
        result.push(
          (x + coordsX) * 25 +
          (y + coordsY) * 5 +
          z + coordsZ
        );
      }
    }
  }
  return result;
});

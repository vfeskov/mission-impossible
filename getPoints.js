const mem = require('mem');

module.exports = mem(function getPoints(variant, coords) {
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
});

const getPoints = require('./getPoints');
const Tiny = require('./pieces/Tiny');
const Flat = require('./pieces/Flat');
const Big = require('./pieces/Big');

const BIG = 0;
const FLAT = 1;
const TINY = 2;

const pieceTypes = {
  [BIG]: Big,
  [FLAT]: Flat,
  [TINY]: Tiny
}

const allPieces = [
  ...Array(5).fill(TINY),
  ...Array(6).fill(FLAT),
  ...Array(6).fill(BIG),
];

const cube = {
  x: 5,
  y: 5,
  z: 5
}

let attempts = 0;

console.log(Date.now());
console.time();
const result = putNextPiece([], [...allPieces])
if (!result) {
  console.log('No result found');
} else {
  console.log(JSON.stringify(result, null, 2));
}
console.log(Date.now());
console.timeEnd();
console.log(`Total attempts: ${attempts}`);

function putNextPiece(occupiedPoints, pieces, result = []) {
  if (pieces.length === 0) {
    return result.map(i => Object.assign(i, { piece: pieceTypes[i.piece].name }));
  }
  const otherPieces = [...pieces];
  const piece = otherPieces.pop();
  for (let variant of pieceTypes[piece].variants) {
    for (let x = 0; x < cube.x - variant.x + 1; x++) {
      for (let y = 0; y < cube.y - variant.y + 1; y++) {
        for (let z = 0; z < cube.z - variant.z + 1; z++) {
          const points = getPoints(variant.x, variant.y, variant.z, x, y, z);
          const cantFit = points.some(point => occupiedPoints.includes(point));
          if (cantFit) {
            continue;
          }
          if(++attempts % 10**6 === 0) {
            console.log(attempts);
            console.timeLog();
          }
          const newOccupiedPoints = [...occupiedPoints, ...points];
          const finalResult = putNextPiece(
            newOccupiedPoints,
            otherPieces,
            [...result, {
              piece,
              coords: { x, y, z },
              variant
            }]
          );
          if (finalResult) {
            return finalResult;
          }
        }
      }
    }
  }
}

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
  ...Array(6).fill(BIG),
  ...Array(6).fill(FLAT),
  ...Array(5).fill(TINY)
];

let attempts = 0;

console.log(
  JSON.stringify(
    putNextPiece([], [...allPieces]),
    null,
    2
  )
);

function putNextPiece(occupiedPoints, pieces, result = []) {
  if (pieces.length === 0) {
    console.log(`Total attempts: ${attempts}`);
    return result.map(i => Object.assign(i, { piece: pieceTypes[i.piece].name }));
  }
  for(let piece = 0; piece < 3; piece++) {
    const pieceIndex = pieces.indexOf(piece);
    if (pieceIndex === -1) {
      continue;
    }
    const otherPieces = [...pieces];
    otherPieces.splice(pieceIndex, 1);
    for (let variant of pieceTypes[piece].variants) {
      for (let x = 0; x < 6 - variant.x; x++) {
        for (let y = 0; y < 6 - variant.y; y++) {
          for (let z = 0; z < 6 - variant.z; z++) {
            const points = getPoints(variant, { x, y, z });
            const cantFit = points.some(point => occupiedPoints.includes(point));
            if (cantFit) {
              continue;
            }
            ++attempts % 10**6 === 0 && console.log(attempts);
            const newOccupiedPoints = [...occupiedPoints, ...points];
            const newResult = putNextPiece(
              newOccupiedPoints,
              otherPieces,
              [...result, {
                piece,
                coords: { x, y, z },
                variant
              }]
            );
            if (newResult) {
              return newResult;
            }
          }
        }
      }
    }
  }
}

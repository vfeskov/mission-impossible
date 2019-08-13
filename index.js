'use strict';
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

const ns = Math.max(cube.x, cube.y, cube.z);
const k = [ns**5, ns**4, ns**3, ns**2, ns, 1];

const T = 'Time passed'
const deadends = {};
let deadendsCount = 0;

console.log(`Start timestamp: ${Date.now()}\n`);
console.time(T);
const placements = putNextPiece([], [...allPieces])
if (placements) {
  console.log(`SOLUTION: ${JSON.stringify(placements, null, 2)}`);
} else {
  console.log('NO SOLUTION FOUND :\'(');
}
console.timeEnd(T);
console.log(`Total dead ends: ${deadendsCount}`);
console.log(`Total unique ends: ${Object.keys(deadends).length}`);
console.log(`End timestamp: ${Date.now()}`);

function putNextPiece(occupiedPoints, pieces, placements = []) {
  if (pieces.length === 0) {
    return decodePlacements(placements);
  }
  const placementsKey = getPlacementsKey(placements);
  const placementsAreDeadend = typeof deadends[placementsKey] !== 'undefined';
  if (!placementsAreDeadend) {
    const otherPieces = [...pieces];
    const piece = otherPieces.pop();
    const variants = pieceTypes[piece].variants;
    for (let vi = variants.length - 1; vi >= 0; vi--) {
      const variant = variants[vi];
      for (let x = cube.x - variant.x; x >= 0; x--) {
        for (let y = cube.y - variant.y; y >= 0; y--) {
          for (let z = cube.z - variant.z; z >= 0; z--) {
            const points = getPoints(variant, { x, y, z });
            const cantFit = points.some(point => occupiedPoints.includes(point));
            if (cantFit) {
              continue;
            }
            const newOccupiedPoints = [...occupiedPoints, ...points];
            const finalPlacements = putNextPiece(
              newOccupiedPoints,
              otherPieces,
              [...placements, encodePiecePlacement({ variant, coords: { x, y, z } })]
            );
            if (finalPlacements) {
              return finalPlacements;
            }
          }
        }
      }
    }
    deadends[placementsKey] = null;
  }
  if(++deadendsCount % 10**5 === 0) {
    console.timeLog(T);
    console.log(`Latest dead end: ${JSON.stringify(decodePlacements(placements))}`)
    console.log(`Dead ends so far: ${deadendsCount / 10**6} million`);
    console.log(`Unique dead ends so far: ${Object.keys(deadends).length}\n`)
    global.gc();
  }
}

function decodePlacements(placements) {
  return placements.map(code => {
    const placement = decodePiecePlacement(code);
    const pv = placement.variant;
    const pieceType = [Big, Tiny, Flat].find(
      ({ variants }) => variants.some(v => v.x === pv.x && v.y === pv.y && v.z === pv.z)
    );
    if (pieceType) {
      placement.name = pieceType.name;
    }
    return placement;
  });
}

function encodePiecePlacement({ variant, coords }) {
  return k[0] * variant.x +
         k[1] * variant.y +
         k[2] * variant.z +
         k[3] * coords.x +
         k[4] * coords.y +
         k[5] * coords.z;
}

function decodePiecePlacement(code) {
  return {
    variant: {
      x: Math.floor(code / k[0]),
      y: Math.floor(code / k[1]) % ns,
      z: Math.floor(code / k[2]) % ns
    },
    coords: {
      x: Math.floor(code / k[3]) % ns,
      y: Math.floor(code / k[4]) % ns,
      z: code % ns
    }
  };
}

function getPlacementsKey(placements) {
  return placements.sort((a, b) => a - b).join('-');
}

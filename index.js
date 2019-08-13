'use strict';
const getPoints = require('./getPoints');
const { pieceTypes, allPieces, cube } = require('./pieces');
const { decodePlacements, encodePiecePlacement } = require('./encoding');

const T = 'Time passed'
const uniqueDeadends = {};
let uniqueDeadendsCount = 0;
let deadendsCount = 0;

console.log(`Start timestamp: ${Date.now()}\n`);
console.time(T);
const placements = putNextPiece({}, [...allPieces])
if (placements) {
  console.log(`SOLUTION: ${JSON.stringify(placements, null, 2)}`);
} else {
  console.log('NO SOLUTION FOUND :\'(');
}
console.timeEnd(T);
console.log(`Total dead ends: ${deadendsCount}`);
console.log(`Total unique dead ends: ${uniqueDeadendsCount}`);
console.log(`End timestamp: ${Date.now()}`);

function putNextPiece(occupiedPoints, pieces, placements = []) {
  if (pieces.length === 0) {
    return decodePlacements(placements);
  }
  placements = placements.sort((a, b) => a - b);
  const placementsAreDeadend = arePlacementsDeadend(placements);
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
            let cantFit = false;
            for (let pi = points.length - 1; pi >= 0; pi--) {
              if (typeof occupiedPoints[points[pi]] !== 'undefined') {
                cantFit = true;
                break;
              }
            }
            if (cantFit) {
              continue;
            }
            const newOccupiedPoints = Object.assign({}, occupiedPoints);
            for (let pi = points.length - 1; pi >= 0; pi--) {
              newOccupiedPoints[points[pi]] = null;
            }
            const finalPlacements = putNextPiece(
              newOccupiedPoints,
              otherPieces,
              [...placements, encodePiecePlacement(variant, x, y, z)]
            );
            if (finalPlacements) {
              return finalPlacements;
            }
          }
        }
      }
    }
    markPlacementsAsDeadend(placements);
    uniqueDeadendsCount++;
  }
  if(++deadendsCount % 10**5 === 0) {
    console.timeLog(T);
    console.log(`Latest dead end: ${JSON.stringify(decodePlacements(placements))}`)
    console.log(`Dead ends so far: ${deadendsCount / 10**6} million`);
    console.log(`Unique dead ends so far: ${uniqueDeadendsCount}\n`);
    global.gc();
  }
}

function arePlacementsDeadend(placements) {
  let deadends = uniqueDeadends;
  for(let i = placements.length - 1; i >= 0; i--) {
    deadends = deadends[placements[i]];
    if (i === 0) {
      return typeof deadends !== 'undefined';
    }
    if (!deadends) {
      return false;
    }
  }
}

function markPlacementsAsDeadend(placements) {
  let deadends = uniqueDeadends;
  for(let i = placements.length - 1; i >= 0; i--) {
    const placement = placements[i];
    if (!deadends[placement]) {
      deadends[placement] = {};
    }
    if (i === 0) {
      deadends[placement] = null;
    } else {
      deadends = deadends[placement];
    }
  }
}

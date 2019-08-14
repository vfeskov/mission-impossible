'use strict';
const { pieceTypes, allPieces, Cube } = require('./pieces');
const { decodeCuboids } = require('./decodeCuboids');
const { cuboidsIntersect } = require('./geometry');

const T = 'Time passed'
// const uniqueDeadends = {};
// let uniqueDeadendsCount = 0;
let deadendsCount = 0;

console.log(`Start timestamp: ${Date.now()}\n`);
console.time(T);
const solution = putNextPiece([], [...allPieces])
if (solution) {
  console.log(`SOLUTION: ${JSON.stringify(decodeCuboids(solution), null, 2)}`);
} else {
  console.log('NO SOLUTION FOUND :\'(');
}
console.timeEnd(T);
console.log(`Total dead ends: ${deadendsCount}`);
// console.log(`Total unique dead ends: ${uniqueDeadendsCount}`);
console.log(`End timestamp: ${Date.now()}`);

function putNextPiece(occupied, pieces) {
  if (pieces.length === 0) {
    return occupied;
  }
  // const placementsKey = getPlacementsKey(placements);
  // const placementsAreDeadend = typeof uniqueDeadends[placementsKey] !== 'undefined';
  // if (!placementsAreDeadend) {
    const otherPieces = [...pieces];
    const piece = otherPieces.pop();
    const variants = pieceTypes[piece].variants;
    const cuboids = pieceTypes[piece].cuboids;
    for (let vi = variants.length - 1; vi >= 0; vi--) {
      const variant = variants[vi];
      const variantCuboids = cuboids[vi];
      for (let x = Cube[0] - variant[0]; x >= 0; x--) {
        for (let y = Cube[1] - variant[1]; y >= 0; y--) {
          for (let z = Cube[2] - variant[2]; z >= 0; z--) {
            const cuboid = variantCuboids[x][y][z];
            let cantFit = false;
            for(let i = occupied.length - 1; i >=0; i--) {
              if (cuboidsIntersect(occupied[i], cuboid)) {
                cantFit = true;
                break;
              }
            }
            if (cantFit) {
              continue;
            }
            const solution = putNextPiece(
              [...occupied, cuboid],
              otherPieces
            );
            if (solution) {
              return solution;
            }
          }
        }
      }
    }
  //   uniqueDeadends[placementsKey] = null;
  //   uniqueDeadendsCount++;
  // }
  if(++deadendsCount % 10**5 === 0) {
    console.timeLog(T);
    console.log(`Latest dead end: ${JSON.stringify(decodeCuboids(occupied))}`)
    console.log(`Dead ends so far: ${deadendsCount / 10**6} million\n`);
    // console.log(`Unique dead ends so far: ${uniqueDeadendsCount}\n`);
    global.gc();
  }
}



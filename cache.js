const fs = require('fs');
const { pieceTypes, allPieces, Cube, Big } = require('./pieces');

const PIECE_INDEX_TO_CACHE_UP_TO = 2;

class Cache {
  constructor() {
    if (process.env.LOGGED_PIECES && process.env.DEADENDS_COUNT) {
      this.loadFromLog(JSON.parse(process.env.LOGGED_PIECES), Number(process.env.DEADENDS_COUNT));
      return;
    }
    try {
      const json = JSON.parse(fs.readFileSync('cache.json'));
      this.deadends = json.deadends;
      this.deadendsCount = json.deadendsCount;
    } catch (e) {
      this.deadends = newDeadends();
      this.deadendsCount = 0;
    }
  }

  save() {
    console.log('saved' + this.deadendsCount);
    fs.writeFileSync('cache.json', JSON.stringify({
      deadends: this.deadends,
      deadendsCount: this.deadendsCount
    }));
  }

  loadFromLog(loggedPieces, deadendsCount) {
    this.deadends = newDeadends();
    this.deadendsCount = deadendsCount;

    const pieces = loggedPieces
      .slice(0, PIECE_INDEX_TO_CACHE_UP_TO + 1)
      .map(p => {
        let vi;
        for(vi = 0; vi < 3; vi++) {
          const v = Big.variants[vi];
          if (p.variant.x === v[0] && p.variant.y === v[1] && p.variant.z === v[2]) {
            break;
          }
        }
        return { vi, x: p.coords.x, y: p.coords.y, z: p.coords.z };
      });

    try {
      while(true) {
        makePrevPieces();
        let deadends = this.deadends;
        for(let pi = 0; pi < PIECE_INDEX_TO_CACHE_UP_TO; pi++) {
          const p = pieces[pi];
          deadends = deadends[p.vi][p.x][p.y][p.z];
        }
        const p = pieces[PIECE_INDEX_TO_CACHE_UP_TO];
        deadends[p.vi][p.x][p.y][p.z] = null;
      }
    } catch(e) {
    }

    function makePrevPieces(pi = PIECE_INDEX_TO_CACHE_UP_TO) {
      const p = pieces[pi];
      const v = Big.variants[p.vi];
      if (p.z + 1 <= Cube[2] - v[2]) {
        return p.z++;
      }
      p.z = 0;
      if (p.y + 1 <= Cube[1] - v[1]) {
        return p.y++;
      }
      p.y = 0;
      if (p.x + 1 <= Cube[0] - v[0]) {
        return p.x++;
      }
      p.x = 0;
      if (p.vi + 1 < Big.variants.length) {
        return p.vi++;
      }
      p.vi = 0;
      makePrevPieces(pi - 1);
    }
  }
}

function newDeadends(pieceIndex = 0) {
  const deadends = {};
  const pieceType = pieceTypes[allPieces[pieceIndex]];
  for (let vi = pieceType.variants.length - 1; vi >= 0; vi--) {
    const variant = pieceType.variants[vi];
    deadends[vi] = {};
    for (let x = Cube[0] - variant[0]; x >= 0; x--) {
      deadends[vi][x] = {};
      for (let y = Cube[1] - variant[1]; y >= 0; y--) {
        deadends[vi][x][y] = {};
        if (pieceIndex < PIECE_INDEX_TO_CACHE_UP_TO) {
          for (let z = Cube[2] - variant[2]; z >= 0; z--) {
            deadends[vi][x][y][z] = newDeadends(pieceIndex + 1);
          }
        }
      }
    }
  }
  return deadends;
}

module.exports = {
  PIECE_INDEX_TO_CACHE_UP_TO,
  cache: new Cache()
}

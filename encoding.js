'use strict';
const mem = require('mem');
const { cube, pieceTypes } = require('./pieces');

const maxCoordinate = Math.max(cube.x, cube.y, cube.z) + 1;
const { encodingMap, decodingMap, encodingId } = Object.keys(pieceTypes).reduce((r, type) => {
  const vs = pieceTypes[type].variants;
  for(let vi = 0; vi < vs.length; vi++) {
    r.encodingMap.set(vs[vi], r.encodingId);
    r.decodingMap[r.encodingId] = vs[vi];
    r.encodingId++;
  }
  return r;
}, { encodingMap: new Map(), decodingMap: {}, encodingId: 0 });
const variantsNumber = encodingId + 1;
const k = {
  x: maxCoordinate * maxCoordinate * variantsNumber,
  y: maxCoordinate * variantsNumber,
  z: variantsNumber
};

function decodePlacements(placements) {
  return placements.map(code => {
    const placement = decodePiecePlacement(code);
    const pv = placement.variant;
    const piece = Object.keys(pieceTypes).find(i => pieceTypes[i].variants.some(v => v === pv));
    if (piece) {
      placement.name = pieceTypes[piece].name;
    }
    return placement;
  });
}

function encodePiecePlacement(variant, x, y, z) {
  return x * k.x +
         y * k.y +
         z * k.z +
         encodingMap.get(variant);
}

function decodePiecePlacement(code) {
  return {
    variant: decodingMap[code % variantsNumber],
    coords: {
      x: Math.floor(code / k.x),
      y: Math.floor(code / k.y) % maxCoordinate,
      z: Math.floor(code / k.z) % maxCoordinate
    }
  };
}

function getPlacementsKey(placements) {
  return placements.sort((a, b) => a - b).join('-');
}

module.exports = {
  decodePlacements,
  encodePiecePlacement: mem(encodePiecePlacement),
  decodePiecePlacement,
  getPlacementsKey
}

'use strict';
const Tiny = require('./Tiny');
const Flat = require('./Flat');
const Big = require('./Big');

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

module.exports = {
  Tiny,
  Flat,
  Big,
  BIG,
  FLAT,
  TINY,
  pieceTypes,
  allPieces,
  cube
}

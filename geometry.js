'use strict';

function cuboidsIntersect(a, b) {
  return projectionsIntersect(a[0][0], a[1][0], b[0][0], b[1][0]) &&
         projectionsIntersect(a[0][1], a[1][1], b[0][1], b[1][1]) &&
         projectionsIntersect(a[0][2], a[1][2], b[0][2], b[1][2]);
}

function projectionsIntersect(amin, amax, bmin, bmax) {
  return (amin >= bmin && amax <= bmax) ||
         (amin <= bmin && amax >= bmax) ||
         (amin <= bmin && amax > bmin) ||
         (amin < bmax && amax >= bmax);
}

module.exports = { cuboidsIntersect, projectionsIntersect };

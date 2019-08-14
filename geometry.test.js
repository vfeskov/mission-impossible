'use strict';

const assert = require('assert');
const { projectionsIntersect, cuboidsIntersect } = require('./geometry');

assert(projectionsIntersect(1, 3, 0, 4) === true);  // 1
assert(projectionsIntersect(0, 2, 1, 4) === true);  // 2
assert(projectionsIntersect(2, 4, 0, 3) === true);  // 3
assert(projectionsIntersect(0, 4, 1, 3) === true);  // 4
assert(projectionsIntersect(0, 2, 2, 4) === false); // 5
assert(projectionsIntersect(0, 1, 2, 3) === false); // 6
assert(projectionsIntersect(0, 2, 2, 3) === false); // 7

const cuboid1 = [[0, 0, 0], [2, 2, 2]];
const cuboid2 = [[1, 1, 1], [3, 3, 3]];
const cuboid3 = [[2, 2, 2], [3, 3, 3]];
const cuboid4 = [[1, 0, 0], [2, 1, 1]];
assert(cuboidsIntersect(cuboid1, cuboid2) === true);
assert(cuboidsIntersect(cuboid2, cuboid3) === true);
assert(cuboidsIntersect(cuboid1, cuboid3) === false);
assert(cuboidsIntersect(cuboid1, cuboid4) === true);
assert(cuboidsIntersect(cuboid3, cuboid4) === false);

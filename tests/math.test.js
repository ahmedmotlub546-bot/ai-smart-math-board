import { test } from "node:test";
import assert from "node:assert/strict";
import { triangleProperties, cubeProperties, cuboidProperties, cylinderProperties } from "../src/math/formulas.js";
import { distance, polygonArea, angleDegrees } from "../src/math/vector.js";

test("distance between (0,0) and (3,4) is 5",()=>assert.equal(distance({x:0,y:0},{x:3,y:4}),5));
test("right triangle area is 6",()=>assert.equal(polygonArea([{x:0,y:0},{x:4,y:0},{x:0,y:3}]),6));
test("right angle is 90 degrees",()=>assert.equal(Math.round(angleDegrees({x:4,y:0},{x:0,y:0},{x:0,y:3})),90));
test("cube formula returns surface area and volume",()=>{const p=cubeProperties(3);assert.equal(p.surfaceArea,54);assert.equal(p.volume,27);});
test("cuboid volume",()=>assert.equal(cuboidProperties(2,3,4).volume,24));
test("cylinder volume",()=>assert.equal(Math.round(cylinderProperties(2,5).volume),63));
test("triangle interior angles sum to 180",()=>{const p=triangleProperties([{x:0,y:0},{x:4,y:0},{x:0,y:3}]);assert.equal(Math.round(p.angleSum),180);});

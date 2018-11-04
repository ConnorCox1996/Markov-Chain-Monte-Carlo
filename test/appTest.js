/*
--> need to finish test for nodeCoords (error throw)

--> test edge cases of point distance>???

-->NEED to add good comments into code
*/
const assert = require('chai').assert;
const initialPointGen = require('../app').initialPointGen
const interPointDistance = require('../app').interPointDistance
const graphGen = require('../app').graphGen
const nodeCoords = require('../app').nodeCoords

/*
describe('initialPointGen', function(){
    it('initialPointGen should take input M and create arrays listing x&y coordinates for M number of points', function(){
        var initialPoints = initialPointGen(5);
        var xLength = initialPoints[0].length;
        var yLength = initialPoints[1].length;
                
        assert.equal(xLength, 5);
        assert.equal(yLength,5);
    });
});
*/

describe('nodeCoords', function(){
    it('nodeCoords takes an input M, and generates the coordinates a quasi-grid of M nodes', function(){
        //expect(nodeCoords(0)).to.throw("Error")
        var smallGraph = nodeCoords(3);
        var smallCoords = [[0,0], [0,1], [1, 0]];
        var largeGraph = nodeCoords(15);
        var largeCoords = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2]];
        
        assert.deepEqual(smallGraph, smallCoords);
    });
})

describe('interPointDistance', function(){
    it('interPointDistance should find the distance between two points, points are specified by the number which labels the point', function(){
        
        var listCoord = [[1, 0], [1, 1], [1, 2]];
        var failList = [[1, 1, 1], [0, 0, 5]];
        var identicalList = [[1, 0], [1, 0], [1, 0]];
        var dist1 = interPointDistance(listCoord, 0, 1);
        var dist2 = interPointDistance(listCoord, 0, 2);
        var dist3 = interPointDistance(identicalList, 0, 1);

        assert.equal(dist1, 1);
        assert.equal(dist2, 2);
        assert.equal(dist3, 0);
    });    
});

/*
describe('graphGen', function(){
    it('graphGen takes, as an input, the nu', function(){
        var nodes = [10, 9, 8, 7];
        var graph = graphGen(4);
        var len = graph.length;
        console.log(graph);

        assert.equal(graph[0], 10);
        assert.equal(graph[1], 9);
        assert.equal(graph[0], 8);
        assert.equal(graph[0], 7);
        assert.equal(len, 4);
    });
});
*/

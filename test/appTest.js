//AT END be sure to erase all the SayHelo stuff...
const assert = require('chai').assert;
const initialPointGen = require('../app').initialPointGen
const interPointDistance = require('../app').interPointDistance

describe('initialPointGen', function(){
    it('initialPointGen should take input M and create arrays listing x&y coordinates for M number of points', function(){
        var initialPoints = initialPointGen(5);
        var xLength = initialPoints[0].length;
        var yLength = initialPoints[1].length;
                
        assert.equal(xLength, 5);
        assert.equal(yLength,5);
    });
});

describe('interPointDistance', function(){
    it('interPointDistance should find the distance between two points, points are specified by the number which labels the point', function(){
        var listCoord = [[1, 1, 1], [0, 1, 2]];
        var failList = [[1, 1, 1], [0, 0, 5]];
        var dist1 = interPointDistance(listCoord, 0, 1);
        var dist2 = interPointDistance(listCoord, 0, 2);
        var dist3 = interPointDistance(failList, 0, 2);

        assert.equal(dist1, 1);
        assert.equal(dist2, 2);
    });    
});
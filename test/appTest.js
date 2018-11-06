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
const listOfLeftEdges = require('../app').listOfLeftEdges
const listOfTopEdges = require('../app').listOfTopEdges
const listOfBottomEdges = require('../app').listOfBottomEdges
const checkPerimeterConnection = require('../app').checkPerimeterConnection


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
need to come back to this...
*/
describe('graphGen', function(){
    it('graphGen takes, as an input, the nu', function(){
        var nodes = [[0, 0], [0, 5], [1, 1]];
        var graph = graphGen(nodes);
        var nodeList= graph.nodes();
        var coord1 = graph.node.get(1).coordinate;
        var expectedNodeList = [0, 1, 2];
        
        assert.equal(nodeList.length, nodes.length);
        assert.deepEqual(expectedNodeList, nodeList);
        assert.equal(coord1, nodes[1]);      
    });
});

describe('listOfLeftEdges', function(){
    it('listOfLeftEdges takes as an input a list of node coordinates & determines edges at the left perimeter of the quasi-grid', function(){
        var smallList = [[0, 0], [0, 1], [1, 0], [1, 1]];
        var largeList = nodeCoords(64);
        var smallListLeftEdges = 1;
        var largeListLeftEdges = 7;
        var smallResult = listOfLeftEdges(smallList).length;
        var largeResult = listOfTopEdges(largeList).length


        assert.equal(smallResult, smallListLeftEdges);
        assert.equal(largeResult, largeListLeftEdges);
    });
});

describe('listOfTopEdges', function(){
    it('listofTopEdges takes as an input a list of node coordinates & determines edges at the top perimeter of the quasi-grid', function(){
        var gridList = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
        var incompleteGridList = [[0,0],[0,1],[1,0],[1,1],[2,0]];
        var gridTopEdges = 2;
        var incompleteGridTopEdges = 1;
        var gridResult = listOfTopEdges(gridList).length;
        var incompleteGridResult = listOfTopEdges(incompleteGridList).length;

        assert.equal(gridResult, gridTopEdges);
        assert.equal(incompleteGridResult, incompleteGridTopEdges);
        
    });
});

describe('listOfBottomEdges', function(){
    it('listOfRightEdges takes as an input a list of node coordinates & determines edges at the bottom perimeter of the quasi-grid', function(){
        var smallList = [[0, 0], [0, 1], [1, 0], [1, 1]];
        var largeList = nodeCoords(64);
        var smallListLeftEdges = 1;
        var largeListLeftEdges = 7;
        var smallResult = listOfBottomEdges(smallList).length;
        var largeResult = listOfBottomEdges(largeList).length


        assert.equal(smallResult, smallListLeftEdges);
        assert.equal(largeResult, largeListLeftEdges);
    });
});

describe('checkPerimeterConnection', function(){
    it('checkPerimeterConnection takes as an input a list of node coordinates & determines if edges along the top boundary connect to edges along the right boundary', function(){
        var connectedPerimeterGraph = nodeCoords(9);
        var resultConnected = checkPerimeterConnection(connectedPerimeterGraph);
        var unconnectedPerimeterGraph = nodeCoords(10);
        var resultUnconnected = checkPerimeterConnection(unconnectedPerimeterGraph);


        //assert.equal(resultConnected, []);
        assert.equal(resultUnconnected, [8, 9]);
    });
});
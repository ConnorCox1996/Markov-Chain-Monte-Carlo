/*
--> need to finish test for nodeCoords (error throw)

--> test edge cases of point distance>???

-->NEED to add good comments into code
*/
const assert = require('chai').assert;
const jsnx = require('jsnetworkx')
const interPointDistance = require('../app').interPointDistance
const graphGen = require('../app').graphGen
const nodeCoords = require('../app').nodeCoords
const matrixGenerator = require('../app').matrixGenerator
const nodeDistanceMatrix = require('../app').nodeDistanceMatrix
const addEdge = require('../app').addEdge
const adjacencyMatrix = require('../app').adjacencyMatrix
const connected = require('../app').connected


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

describe('matrixGenerator', function(){
    it('matrixGenerator takes as an input a list of node coordinates, and makes a matrix of those nodes', function(){
        var matrix = matrixGenerator([0, 1, 2, 3]);
        var result = [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]];

        assert.deepEqual(matrix, result);
    });
});

describe('nodeDistanceMatrix', function(){
    it('nodeDistanceMatrix takes as an input a graph, and the set of node coordinates associated with that graph, it calculates the distance between all nodes in the graph and stores them in a matrix', function(){
        var graph = [0, 1, 2, 3];
        var coords = [[0, 0], [0, 1], [1, 0], [1, 1]];
        var matrix = nodeDistanceMatrix(graph, coords);
        var columnOneExpected = [0, 1, 1, Math.sqrt(2)];

        assert.deepEqual(columnOneExpected, matrix[0]);
    });
});

describe('addEdge', function(){
    it('addEdge takes as an input a graph which edges will be added to & a list of edge to be added', function(){
        var weightMatrix = [ [ 0, 1, 1, 1.4142135623730951 ], [ 1, 0, 1.4142135623730951, 1 ], [ 1, 1.4142135623730951, 0, 1 ], [ 1.4142135623730951, 1, 1, 0 ] ];
        var initialEdgeList = [[0, 1], [0, 2], [1, 3], [2, 3], [1,2]];
        var unalteredEdgelist = [[0, 1], [0, 2], [1, 3], [2, 3], [1,2]];
        var G = new jsnx.Graph();
        var result = addEdge(G, initialEdgeList);
        var edges = G.edges();
        
        assert.equal(weightMatrix[0][3], Math.sqrt(2));        
        assert.equal(weightMatrix[1][3], 1);
        assert.equal(weightMatrix[2][3], 1);
        assert.equal(weightMatrix[3][3], 0);

        assert.deepEqual(edges[0], unalteredEdgelist[0]);
        assert.deepEqual(edges[1], unalteredEdgelist[1]);
        assert.deepEqual(edges[2], unalteredEdgelist[4]);
        assert.deepEqual(edges[3], unalteredEdgelist[2]);
        assert.deepEqual(edges[4], unalteredEdgelist[3]);        
        
    });
});

describe('adjacencyMatrix', function(){
    it('adjacencyMatrix takes as an input a list of edges which inlcudes the weight of each edge & generates an adjacency matrix from that list', function(){
        var edgelist1 = [[0,1,1], [0,2,1], [1,3,5], [2,3,1], [1,2,1]];
        var expect1 = [[0,1,1,0], [1,0,1,5], [1,1,0,1], [0,5,1,0]];
        var result1 = adjacencyMatrix(edgelist1);
        var edgelist2 = [[0,1,1], [2,3,1]];
        var expect2 = [[0,1,0,0],[1,0,0,0],[0,0,0,1],[0,0,1,0]];
        var result2 = adjacencyMatrix(edgelist2);
        
        assert.deepEqual(expect1, result1);
        assert.deepEqual(expect2, result2);
    });
});

describe('connected', function(){
    it('Connected takes as an input a list of edges associated with a graph, and determines if the graph is connected', function(){
        var connectedList = [[0,1,1],[1,2,Math.sqrt(2)],[3,2,1]];
        var connectedAdjMat = adjacencyMatrix(connectedList);
        var disconnectedList = [[0,1,1],[1,2,Math.sqrt(2)],[0,2,1]];
        var disconnectedAdjMat = adjacencyMatrix(disconnectedList);
        var connectExpect = connected(connectedList, connectedAdjMat);
        var disconnectExpect = connected(disconnectedList, disconnectedAdjMat);

        assert.equal(connectExpect, true);
        assert.equal(disconnectExpect, false);

    });
});
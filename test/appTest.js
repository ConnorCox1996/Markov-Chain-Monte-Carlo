/*
--> need to finish test for nodeCoords (error throw)

--> test edge cases of point distance>???

-->NEED to add good comments into code
*/
const assert = require('chai').assert
const expect = require('chai').expect
const chai = require('chai');
const chaiAlmost = require('chai-almost');
chai.use(chaiAlmost());

const jsnx = require('jsnetworkx')
const interPointDistance = require('../app').interPointDistance
const nodeCoords = require('../app').nodeCoords
const matrixGenerator = require('../app').matrixGenerator
const nodeDistanceMatrix = require('../app').nodeDistanceMatrix
const addEdge = require('../app').addEdge
const adjacencyMatrix = require('../app').adjacencyMatrix
const connected = require('../app').connected
const getRandomInt = require('../app').getRandomInt
const isInArray = require('../app').isInArray
const sourceTargetPath = require('../app').sourceTargetPath
const edgeWeightSum = require('../app').edgeWeightSum
const q = require('../app').q
const theta = require('../app').theta
const generateNewGraph = require('../app').generateNewGraph
const piJI = require('../app').piJI
const acceptOrReject = require('../app').acceptOrReject

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

describe('matrixGenerator', function(){
    it('matrixGenerator takes as an input a list of node coordinates, and makes a matrix of those nodes', function(){
        var matrix = matrixGenerator([0, 1, 2, 3]);
        var result = [[0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3]];

        assert.deepEqual(matrix, result);
    });
});

describe('nodeDistanceMatrix', function(){
    it('nodeDistanceMatrix takes as an input a graph, and the set of node coordinates associated with that graph, it calculates the distance between all nodes in the graph and stores them in a matrix', function(){
        //var graph = [0, 1, 2, 3];
        var coords = [[0, 0], [0, 1], [1, 0], [1, 1]];
        var matrix = nodeDistanceMatrix(coords);
        var columnOneExpected = [0, 1, 1, Math.sqrt(2)];

        assert.deepEqual(columnOneExpected, matrix[0]);
    });
});

describe('addEdge', function(){
    it('addEdge takes as an input a graph which edges will be added to & a list of edge to be added', function(){
        var weightMatrix = [ [ 0, 1, 1, 1.4142135623730951 ], [ 1, 0, 1.4142135623730951, 1 ], [ 1, 1.4142135623730951, 0, 1 ], [ 1.4142135623730951, 1, 1, 0 ] ];
        var initialEdgeList = [[0, 1], [0, 2], [1, 3], [2, 3], [1,2]];
        var unalteredEdgelist = [[0, 1, 1], [0, 2, 1], [1, 2, Math.sqrt(2)], [2, 3, 1], [1, 3, 1]];
        var G = new jsnx.Graph();
        var result = addEdge(initialEdgeList);
        var edges = initialEdgeList;
        
        assert.equal(weightMatrix[0][3], Math.sqrt(2));        
        assert.equal(weightMatrix[1][3], 1);
        assert.equal(weightMatrix[2][3], 1);
        assert.equal(weightMatrix[3][3], 0);

        assert.deepEqual(edges[0], unalteredEdgelist[0]);
        assert.deepEqual(edges[1], unalteredEdgelist[1]);
        assert.deepEqual(edges[2], unalteredEdgelist[4]);
        assert.deepEqual(edges[3], unalteredEdgelist[3]);
        assert.deepEqual(edges[4], unalteredEdgelist[2]);        
        
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

describe('getRandomInt', function(){
    it('getRandomInt generates a random integer between lower & upper bounds (inclusive)', function(){
        var random = getRandomInt(4,6);
        
        assert.isNumber(random);
        expect(random).to.be.at.least(4);
        expect(random).to.be.at.most(6);
    });
});

describe('isInArray', function(){
    it('isInArray checks if a specified value is contained in a specified array', function(){
        var array = [0,1,2,3];
        var notInArray = isInArray(10, array);
        var inArray = isInArray(2,array);

        expect(notInArray).to.be.false;
        expect(inArray).to.be.true;
    });
});

describe('sourceTargetPath', function(){
    it('sourceTargetPath specifies node 0 as the source node, and finds the sum of the weighted path to all other nodes in the graph', function(){
        var stronglyConnectedGraphEdges = [[0, 1, 1], [0, 2, 1], [0, 3, Math.sqrt(2)], [1, 3, 1], [1, 2, Math.sqrt(2)], [3, 2, 1]];
        var resultStronglyConnected = sourceTargetPath(stronglyConnectedGraphEdges);        
        var expectedResultStronglyConnected = 1+1+Math.sqrt(2);        
        assert.equal(expectedResultStronglyConnected, resultStronglyConnected);       
    });
});

describe('edgeWeightSum', function(){
    it('edgeWeightSum finds the sum of all weighted edges in a graph', function(){
        var stronglyConnectedGraphEdges = [[0, 1, 1], [0, 2, 1], [0, 3, Math.sqrt(2)], [1, 3, 1], [1, 2, Math.sqrt(2)], [3, 2, 1]];
        var result = edgeWeightSum(stronglyConnectedGraphEdges);
        var expectedResult = 1+1+1+1+Math.sqrt(2)+Math.sqrt(2);

        assert.equal(result, expectedResult);
    });
});

describe('q', function(){
    it('q calculates the probability of a graph being generated from all possible new graph generations', function(){
        var list1 = [[0, 1], [0, 2], [0, 3], [1, 3], [1, 2], [2, 3]];
        var list2 = [[0, 1], [0, 2], [0, 3]];
        var qExpectation1 = 1/4
        var qExpectation2 = 1/80
        var list1Result = q(list1);
        var list2Result = q(list2);

        assert.equal(qExpectation1, list1Result);
        assert.equal(qExpectation2, list2Result);
    });
});

describe('theta', function(){
    it('theta calculates a theta value for a given graph, source node, and r value', function(){
        var list1 = [[0,1,1],[0,2,1],[0,3, Math.sqrt(2)]];
        var list2 =  [[0,1,1],[0,2,1],[1,3,1],[2,3,1]];
        var list3 =  [[0,1,1],[0,2,1],[1,3,1],[2,3,1],[0,3, Math.sqrt(2)]];
        var expect1 = 4+ 2*Math.sqrt(2);
        var expect2 = 8;
        var expect3 = 6 + 2*Math.sqrt(2);
        var result1 = theta(list1);
        var result2 = theta(list2);
        var result3 = theta(list3);

        assert.equal(expect1, result1);
        assert.equal(expect2, result2);
        assert.equal(expect3, result3);

    });
});

describe('generateNewGraph', function(){
    it('generateNewGraph generates a new graph randomly by selecting a random number of eges which the graph will contain, and randomly selects those unique edge from a list of all possible edges preventing edge duplication', function(){
        var listOfPossibleEdges = [[0, 1], [0, 2], [0, 3], [1, 3], [1, 2], [3, 2]];
        result = generateNewGraph();
        
        expect(result).to.be.an('array');
        expect(result.length).to.be.at.least(3);
        expect(result.length).to.be.at.most(6);
    });
});

describe('piJI', function(){
    it('piJI calculates theta values for two graphs, and computes pi(j)/pi(i) for the two graphs', function(){
        var edgeList1 = [[0,1,1],[0,2,1],[1,3,1],[2,3,1],[0,3, Math.sqrt(2)]];
        var edgeList2 = [[0,1,1],[0,2,1],[1,3,1],[2,3,1],[0,3, Math.sqrt(2)],[1,2, Math.sqrt(2)]];
        var result = piJI(edgeList1, edgeList2);
        var result2 = piJI(edgeList2, edgeList1);

        expect(result).to.be.almost.equal(4.113250378782923);
        expect(result2).to.be.almost.equal(0.24311673443421443);

    });
});

describe('acceptOrReject', function(){
    it('acceptOrReject takes two graphs as inputs, a current state and a proposed state, and determines whether to accept or reject the proposed state via the Metropolis-Hastings algorithm', function(){
        var mocklist = [[0,1,1],[0,2,1], [1,3,1]];
        var mocklist2 = [[0,1,1],[0,2,1],[1,3,1],[2,3, 1]];
        var result = acceptOrReject(mocklist, mocklist2);
        var pi = piJI(mocklist2, mocklist);
        var qj = q(mocklist2);
        var qi = q(mocklist);
        var qRatio = qj/qi;
        var proposal = pi * qRatio;

        if(proposal >= 1){
            expect(result[0]).to.equal(1);
        };
        if(proposal < 1){
            expect(result[0]).to.be.greaterThan(1);
        };         
    });
});


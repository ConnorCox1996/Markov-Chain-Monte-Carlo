const jsnx = require('jsnetworkx');


/* Project Notes:
- Need to Get Travis build working
- Need to set up system to handle CLA...
- Need to address that I don't calculate q
    (maybe figure a way to calculate it from randomly generated edgelist?)


    Add descriptions to all functions...
*/


/*Takes as input M number of nodes to be generated
Generates the coordinates of M number of nodes in a quasi-grid arrangement
                    CREATES GLOBAL COORDINATES (coordinates won't change throughout program)
*/
function nodeCoords(M) {
    var rows = Math.round(Math.sqrt(M));
    var count = 0
    var disp = [];
    if(M<1) throw "Error"    
        for(var i = 0; i < rows+1; i++){
            for(var j = 0; j < rows; j++){
                var point = [i,j];    
                disp.push(point);
                count++;
                if( count == M ) {
                    return disp;
                };
            };
        };
        
};

var coordinates = nodeCoords(4);

/*Takes as input a list of node coordinates, and two nodes in that list
Calculates the distance between the two nodes
*/
function interPointDistance(positions, point1, point2){
    var deltax = (positions[point2][0]) - (positions[point1][0]);
    var deltay = (positions[point2][1]) - (positions[point1][1]);
    var dist = Math.sqrt((Math.pow(deltax, 2) + Math.pow(deltay, 2)));
    return dist;
};

/*Takes as an input the list of node coordinates
Generates a matrix of nodes in the graph (to be filled in with weights of edges between nodes)
                    CREATES GLOBAL MATRIX
*/
function matrixGenerator(){
    var arrayLength = coordinates.length;
    var Matrix = [];
    for(var i = 0; i < arrayLength; i++ ){
        Matrix[i] = []
        for(var j = 0; j < arrayLength; j++){
            Matrix[i][j] = j;
        };
    };
    
    return Matrix
};

/*Takes as input a graph and the set of coordinates of that graph
Fills the node matrix with the distance between each node
                FILLS IN GLOBAL MATRIX (with distnace between all edges)
*/
function nodeDistanceMatrix(coordinateList){
    var matrix = matrixGenerator();
    var nodeCoordinates = coordinateList;
    var len = nodeCoordinates.length;
    for(var i = 0; i < len; i++){
        for(var j = 0; j < len; j++){
            var dist = interPointDistance(nodeCoordinates, i, j);
            matrix[i][j] = dist;
        };
    };
    return matrix;
};

var weightMatrix = nodeDistanceMatrix(coordinates);
var initialEdgeList = [[0, 1], [0, 3], [0, 2], [1,2], [1,3], [2,3]];

/*Takes as an input a graph too add edges to & a list of edges to be added
Adds edges with weight = distance between nodes
    WEIGHT is accessed from the global node distance matrix
*/
function addEdge(edgeList){
    for(var i =0; i < edgeList.length; i++){
        var node1 = edgeList[i][0];
        var node2 = edgeList[i][1];
        var weight = weightMatrix[node1][node2];
        edgeList[i].push(weight);
    };
    return edgeList;
};

var initialEdgesWithWeights = addEdge(initialEdgeList);
console.log('initial edge list with weight');
console.log(initialEdgeList);

/*Takes as input a list of edges with weights
Calculates the distance between the endpoints of the edge, and adds as a weight
returns a modified version of the input edge list
*/
function adjacencyMatrix(edgeListWithWeights){
    var adjacency = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for(var i = 0; i < edgeListWithWeights.length; i++){
        var node1 = edgeListWithWeights[i][0];
        var node2 = edgeListWithWeights[i][1];
        var weight = edgeListWithWeights[i][2];
        adjacency[node1][node2] = weight;
    };     
    
    for(var i = 0; i < edgeListWithWeights.length; i++){
        var node1 = edgeListWithWeights[i][0];
        var node2 = edgeListWithWeights[i][1];
        var weight = edgeListWithWeights[i][2];
        adjacency[node2][node1] = weight;
    };     
    return adjacency;     
};
console.log('initial Adj Mat');
var initialGraphAdjacencyMatrix = adjacencyMatrix(initialEdgeList);
console.log(initialGraphAdjacencyMatrix);
console.log('');

var secondaryEdgeList = [[0,1],[1,2],[0,2]];
var edgeList2WithWeights =addEdge(secondaryEdgeList);
/*Takes as input a list of weighted edges and the adjacency matrix associated with that list of edges
Determines if the graph associated with the list of egdes is connected or not
if CONNECTED returns true
if NOT CONNECTED returns false 
*/
function connected(edgeList, adjMatrix){
    var adjMatrix = adjMatrix;
    var x = 'string';
    var y = 'string';
    var z = 'string'; 
    for(var i =0; i < edgeList.length; i++){
        if(edgeList[i][2] == Math.sqrt(2)){
            x = edgeList[i][0];
            y = edgeList[i][1];
        };
    };
    for(j=0; j < adjMatrix[x].length; j++){
        if(adjMatrix[x][j] == 1){
            z = j;
        };
    };
    if(adjMatrix[y][z] == 1){
        return false;
    };
return true;
};

/* Takes as an input upper and lower bounds for a generated number
  Returns a random integer between min (inclusive) and max (inclusive)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var listOfPossibleEdges = [[0, 1], [0, 2], [0, 3], [1, 3], [1, 2], [3, 2]];

function generateNewGraph(){
    var numEdges = getRandomInt(3,6);
    console.log('number of edges in graph');
    console.log(numEdges);
    var newEdgeList = [];
    for( var i = 0; i < 100; i++){
        var addEdge = getRandomInt(0,5);
        if(isInArray(addEdge, newEdgeList) == false){
            newEdgeList.push(addEdge);    
        };
        if(newEdgeList.length ==numEdges){
            
            for(var j =0; j < numEdges; j++){
                var generatedEdge = newEdgeList[j];
                newEdgeList[j] = listOfPossibleEdges[generatedEdge];
            
            };
            
            return newEdgeList;
        }
    
    };
    
};
var ex1 = generateNewGraph();
var ex2 = generateNewGraph();
console.log('generatedGraphs');
console.log(ex1);
console.log(ex1.length);
console.log(ex2);
console.log(ex2.length);

function isInArray(value, array){
    return array.indexOf(value) > -1;
};

function sourceTargetPath(edgelistWithWeight){
    var source = 0;
    var targetList = [10, 10, 10, 10];
    targetList[source] =0 ;
    targetsReached = [source];
    var matrix = adjacencyMatrix(edgelistWithWeight);
    for(var m = source; m < matrix.length; m++){
        for(var j = 0; j < matrix.length; j++){
            if(matrix[m][j] != 0){
                var filter = isInArray(j,targetsReached);               
                if(filter == false){  
                    var stepWeight = targetsReached[m]
                    targetList[j] = matrix[source][j];
                    targetsReached.push(matrix[m][j]+stepWeight);                            
                    //console.log(targetsReached);
                    if(targetsReached.length == matrix.length){
                        var sumOfPathsFromSource = 0;
                        for( var s= 0; s < targetsReached.length; s++){
                            sumOfPathsFromSource += targetsReached[s];                        
                        }; 
                    return sumOfPathsFromSource                       
                    };
                };
            };          
        };
    };   
};
console.log('Total Path Length');
console.log(sourceTargetPath(initialEdgesWithWeights));

function edgeWeightSum(edgeListWithWeights){
    var edgeSum = 0
    //console.log(edgeListWithWeights);
    for(var i = 0; i < edgeListWithWeights.length; i++){
        edgeSum += edgeListWithWeights[i][2];

    };
    return edgeSum;
};
var sum1 = edgeWeightSum(initialEdgesWithWeights);
console.log('Sum of all (weighted Edges)');
console.log(sum1);

function theta(edgeList){
    var sum1 = sourceTargetPath(edgeList);
    var r =1;
    var sum2 = (r*(edgeWeightSum(edgeList)));
    var result = sum1 + sum2;
    return result;
};

var mocklist = [[0,1,1],[0,2,1],[1,3,1],[2,3,1],[0,3, Math.sqrt(2)]];
var mockresult = theta(mocklist);
console.log('theta');
console.log(mockresult)



var factorials = [0, 1, 2, 6, 24, 120, 720];

function q(edgeList){
    var edgesPresent = edgeList.length;
    var edgesPossible = 6;
    var proOfThisManyEdges = 1/4;
    var numberCombinationsPossible = (factorials[6])/(factorials[edgesPresent] * factorials[(edgesPossible - edgesPresent)]);
    if(numberCombinationsPossible == Infinity){
        numberCombinationsPossible = 1
    }; 
    var probOfThisEdgeCombination = 1/numberCombinationsPossible;
    var q = proOfThisManyEdges * probOfThisEdgeCombination;

    return q
};

function piJI(graphOne, graphTwo){
    var T = 1;
    var diff = theta(graphOne) - theta(graphTwo);
    var exponent = -(diff/T);
    var resultpi = Math.exp(exponent);
    return resultpi;
};

var graphOne = [[0,1,1],[0,2,1],[,3,1][2,3,1]];
var graphTwo = [[0,1,1],[0,2,1],[1,3,1],[2,3,1],[0,3, Math.sqrt(2)]];

var mocklist = [[0,1,1],[0,2,1], [1,3,1]];
console.log(theta(mocklist));
var mocklist2 = [[0,1,1],[0,2,1],[1,3,1],[2,3, 1]];
console.log(theta(mocklist2));

var tester = piJI(mocklist, mocklist2);
console.log('pi result')
console.log(tester);

/*takes as input two graphs as an ordered pair, where current graph is first & proposed graph is second
*/
function acceptOrReject(graphOne, graphTwo){
    var pi = piJI(graphTwo, graphOne);
    var qj = q(graphTwo);
    var qi = q(graphOne);
    var qRatio = qj/qi;
    var proposal = pi * qRatio;

    if(proposal >= 1){
        console.log('here 1')
        return [1, true, 'A =>1'];
    } else{
        var u = getRandomInt(0,1);
        if(u <= proposal){
            console.log('here 2')
            return [2, true, 'A < 1, but proposal => u'];
        } else{
            console.log('here 3')
            return [3, false, 'A <1 & A < u']
        };
    };
};
console.log('accept');
console.log(acceptOrReject(mocklist, mocklist2));














module.exports = {
    interPointDistance, 
    nodeCoords,
    matrixGenerator,
    nodeDistanceMatrix,
    addEdge,
    adjacencyMatrix,
    connected,
    getRandomInt,
    isInArray,
    sourceTargetPath,
    edgeWeightSum,
    q,
    theta,
    generateNewGraph,
    piJI,
    acceptOrReject
}
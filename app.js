
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

//Generating initial node coordinates
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

//creating a matrix of all possible edge weights
var weightMatrix = nodeDistanceMatrix(coordinates);
//creating list of initial edges, this list contains all possible edges for a graph with 4 nodes
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

//adding weight to initial graph edges 
var initialEdgesWithWeights = addEdge(initialEdgeList);
/*
console.log('initial edge list with weight');
console.log(initialEdgeList);
*/

/*Takes as input a list of edges with weights
Calculates the distance between the endpoints of the edge, and adds as a weight
Returns a modified version of the input edge list
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

/*Takes as input a list of weighted edges and the adjacency matrix associated with that list of edges
Determines if the graph associated with the list of egdes is connected or not
if CONNECTED returns true
if NOT CONNECTED returns false 
*/
function connected(edgeList, adjMatrix){
    var store = [[],[],[],[]];
    if(edgeList.length == 3){
        for(var i = 0; i < adjMatrix.length; i++){
            for(var j = 0; j < adjMatrix.length; j++){
                if(adjMatrix[i][j] == 0){
                    store[i].push(0);
                    if(store[i].length ==4){
                        return 0;
                    };
                };
            };
        };
        return 1;
        
    } else{
        return 1;
    };   
};
    
/* Takes as an input upper and lower bounds for a generated number
  Returns a random integer between min (inclusive) and max (inclusive)
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
//a list of al possible edges, which will be drawn from to create proposed graphs
var listOfPossibleEdges = [[0, 1], [0, 2], [0, 3], [1, 3], [1, 2], [3, 2]];

/*
Generates a proposed graph by 
--> randomly selecting the number of edges present, 
for a graph with 4 nodes, connection is possible with 3, 4, 5, or 6 edges 
so number of selected edges is a random integer between 3&6
--> then randomly selecting the determined number of edges from a list of all possible edges
*/
function generateNewGraph(){
    var numEdges = getRandomInt(3,6);
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

/*Takes as an input a value to look for in an array, and the array to look for that value in
If the value is found, returns 1
*/
function isInArray(value, array){
    return array.indexOf(value) > -1;
};

/*Takes as an input a list of weighted edges
Finds sum of all shortest paths from source node 0 to every other node in the graph
returns that sum
*/
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

/*Takes as an input a list of weighted edges
Calculates the sum of all weighted edges in the graph
Returns that sum
*/
function edgeWeightSum(edgeListWithWeights){
    var edgeSum = 0

    for(var i = 0; i < edgeListWithWeights.length; i++){
        edgeSum += edgeListWithWeights[i][2];

    };
    return edgeSum;
};

/*Takes as an input a list of edges (doesn't need to be weighted)
Calculates theta for that list of edges
Returns the theta value
*/
function theta(edgeList){
    var sum1 = sourceTargetPath(edgeList);
    var r =1;
    var sum2 = (r*(edgeWeightSum(edgeList)));
    var result = sum1 + sum2;
    return result;
};

/* a list of factorials 0 through 6
this list of factorials is used to calculate q for given states
*/
var factorials = [0, 1, 2, 6, 24, 120, 720];

/*Takes as an input a list of edges
calculates q, the probability of the state denoted by its edgelist being generated
Returns that q value
*/
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

/*Takes as an input a current state(graphOne) & a proposed state(graphTwo)
Calculates Pij/Pii according to the formula given
Returns that ratio
*/
function piJI(graphOne, graphTwo){
    var T = 1;
    var diff = theta(graphOne) - theta(graphTwo);
    var exponent = -(diff/T);
    var resultpi = Math.exp(exponent);
    return resultpi;
};

/*Takes as input two graphs as an ordered pair, where current graph is first & proposed graph is second
Uses the Metropolis-Hastings Algorithm to determine whether to accept or reject the proposed state
Returns true if the state is accepted, false if the state is rejected
*/
function acceptOrReject(graphOne, graphTwo){
    var pi = piJI(graphTwo, graphOne);
    var qj = q(graphTwo);
    var qi = q(graphOne);
    var qRatio = qj/qi;
    var proposal = pi * qRatio;

    if(proposal >= 1){
        return [1, true, 'A =>1'];
    } else{
        var u = getRandomInt(0,1);
        if(u <= proposal){
            return [2, true, 'A < 1, but proposal => u'];
        } else{
            return [3, false, 'A <1 & A < u']
        };
    };
};

/*Takes as an input the number of iterations which are desired
NOTE more than 15,000 iterations is expected to take over a minute to process
Iterates through the Metropolis-Hastings Algorithm
Returns a list of adjacency matrices for all accepted states
*/
function main(iterations){
    var hold = [[],[]];
    var store = [];
    var save = [];
    var X0 = initialEdgesWithWeights;
    var thetaX0 = theta(initialEdgesWithWeights);
    hold[0][0] = X0;
    var qX0 = q(initialEdgesWithWeights);
    hold[0][1] = qX0;

    for(var i =0; i < iterations; i++){
        var storeEdges = []
        var proposal = generateNewGraph();
        var weightedEdgeListi = addEdge(proposal);
        var adjacMatrix = adjacencyMatrix(proposal);
        var connection = connected(weightedEdgeListi,adjacMatrix);
        if(connection == true){
            var thetai = theta(weightedEdgeListi);
            hold[1][0] = proposal;
            var qXi = q(weightedEdgeListi);
            hold[1][1] = qXi;
            var acc = acceptOrReject(hold[0][0], hold[1][0]);

                if(acc[1] == true){
                    hold[0][0] = proposal;
                    console.log('proposal' + ' ' + i + ' ' + 'accepted: ');
                    console.log('');
                    storeEdges[i] = proposal.length;
                    var output = adjacencyMatrix(proposal);
                    console.log(output);
                    for(var k=0; k < output.length; k++){
                        for(var l =0; l < output.length; l++){
                            if(output[k][l] != 0){
                                save.push(1);

                            }else{
                                save.push(0);
                            }
                        }
                    }   
                var save1 =save.join('');
                var save2 = parseInt(save1,2);
        store[i]=save2
                        
                }else{
                    console.log('proposal ' + i + ' rejected');
                    storeEdges[i] = hold[0][0].length;

            };
        };

    };
    return;
};

var run = main(100);
console.log(run);




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
const jsnx = require('jsnetworkx');

/*
--> have to figure out how to deal with CLA?

-->when i generate my coordinates from a variable 
rather than from hard coded number (for M),
I get errors in my point distance generator
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
        //return disp;
};

var coordinates = nodeCoords(4);
console.log('generated coordinates');
console.log(coordinates);
console.log(coordinates.length);

/*Takes as input a list of node coordinates
Generates a graph containing each node, and the coordinate of each node as an attribute 
        CREATES INITIAL GRAPH
*/
function graphGen(coordList){
    var G = new jsnx.Graph();
    for(var i = 0; i < coordList.length; i++){
        G.addNode(i, {coordinate: coordList[i]});
    };
    return G
};


var graph = graphGen(coordinates);

console.log('generated graph');
console.log('TARGET');
console.log(graph.nodes());
console.log('number of nodes');
console.log(graph.nodes().length);
/*
console.log('node coordinates');
*/

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

console.log("here it is");
console.log(matrixGenerator());

/*Takes as input a graph and the set of coordinates of that graph
Fills the node matrix with the distance between each node
                FILLS IN GLOBAL MATRIX (with distnace between all edges)
*/
function nodeDistanceMatrix(G, coordinateList){
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

var weightMatrix = nodeDistanceMatrix(graph, coordinates);
console.log('show me the money');
console.log(weightMatrix);

var initialEdgeList = [[0, 1], [0, 2], [1, 3], [2, 3], [1,2]];
console.log('edgeslist')
console.log(initialEdgeList);
/*Takes as an input a graph too add edges to & a list of edges to be added
Adds edges with weight = distance between nodes
    WEIGHT is accessed from the global node distance matrix
*/
function addEdge(G, edgeList){
    for(var i =0; i < edgeList.length; i++){
        var node1 = edgeList[i][0];
        var node2 = edgeList[i][1];
        var weight = weightMatrix[node1][node2];
        edgeList[i].push(weight);
    };
    //for(var j =0; j < edgeList.length; j++);
    G.addEdgesFrom(edgeList);
    return G;
};

var trial = addEdge(graph, initialEdgeList);
console.log('edge list with weight');
console.log(initialEdgeList);

var externalAdjMat = matrixGenerator();
console.log(externalAdjMat);


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
console.log('LOOK HERE');
var grAph = adjacencyMatrix(initialEdgeList);
console.log(grAph);
console.log('');

var secondaryEdgeList = [[0,1],[1,2],[0,2]];
var edgeList2WithWeights =addEdge(graph, secondaryEdgeList);

console.log('list');
console.log(secondaryEdgeList);
console.log('');
var grAph2 = adjacencyMatrix(secondaryEdgeList);
console.log('second');
console.log(grAph2);
console.log(grAph2[0][3]);

function connected(edgeList, adjMatrix){
    var x = 'string';
    var y = 'string';
    var z = 'string'; 
    for(var i =0; i < edgeList.length; i++){
        if(edgeList[i][2] == Math.sqrt(2)){
            x = edgeList[i][0];
            y = edgeList[i][1];
            console.log(x + " xy " + y )
        }
    }
    for(j=0; j < adjMatrix[x].length; j++){
        if(adjMatrix[x][j] == 1){
            console.log("z " + j)
            z = j;
        }
    }

    if(adjMatrix[y][z] == 1){
        return false;
    }
return true;
}




var connectresult = connected(secondaryEdgeList, grAph2);
console.log(connectresult);




module.exports = {
    interPointDistance, 
    graphGen, 
    nodeCoords,
    //listOfLeftEdges,
    //listOfTopEdges,
    //listOfBottomEdges,
    //checkPerimeterConnection,
    matrixGenerator,
    nodeDistanceMatrix,
    addEdge,
    adjacencyMatrix,
    connected
}
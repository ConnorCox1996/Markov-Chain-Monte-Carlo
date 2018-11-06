const jsnx = require('jsnetworkx');

/*
--> have to figure out how to deal with CLA?

-->when i generate my coordinates from a variable 
rather than from hard coded number (for M),
I get errors in my point distance generator
*/

/*Takes as input M number of nodes to be generated
Generates the coordinates of M number of nodes in a quasi-grid arrangement
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
console.log(graph.nodes());
console.log('number of nodes');
console.log(graph.nodes().length);
console.log('node coordinates');
console.log(graph.node.get(0).coordinate);
console.log(graph.node.get(1).coordinate);
console.log(graph.node.get(2).coordinate);
console.log(graph.node.get(3).coordinate);

/*Takes as input a list of node coordinates, and two nodes in that list
Calculates the distance between the two nodes
*/
function interPointDistance(positions, point1, point2){
    var deltax = (positions[point2][0]) - (positions[point1][0]);
    var deltay = (positions[point2][1]) - (positions[point1][1]);
    var dist = Math.sqrt((Math.pow(deltax, 2) + Math.pow(deltay, 2)));
    return dist;
};

/*
These variables store stuff that will later be stored within the function that these subfunctions are called within
will be deleted later...
*/

/*Takes as input list of node coordinates
Set of 'listOf_blank_edges' functions together find the eges at the perimeter of the generated quasi-grid
This function finds a list of edges at the right boundary of the graph
*/
function listOfLeftEdges(coordinateList){
    var leftList = [];
    for(var j = 0; j < coordinateList.length; j++){
        if (coordinateList[j][0] == 0 && coordinateList[j+1][0] == 0){
        var edge = [j,j+1];
        leftList.push(edge);
        };
    };
    return leftList
};
console.log('Left Edge');
console.log(listOfLeftEdges(coordinates));

/*Takes as input list of node coordinates
Set of 'listOf_blank_edges' functions together find the eges at the perimeter of the generated quasi-grid
This function finds a list of edges at the top boundary of the graph
*/
function listOfTopEdges(coordinateList){
    var coordinateSpacing =listOfLeftEdges(coordinateList).length
    //var startIndex = coordinateSpacing
    var topList = [];
    
    for(var j = 0; j < coordinateList.length; j++){
        //var space = j + coordinateSpacing
        if(coordinateList[j][1] == coordinateSpacing){
            var edge = [j,j+coordinateSpacing+1];
            topList.push(edge);
        
        }
    
    };
    topList.pop()
    return topList
};
console.log('Top Edge');
console.log(listOfTopEdges(coordinates));


/*Takes as input list of node coordinates
Set of 'listOf_blank_edges' functions together find the eges at the perimeter of the generated quasi-grid
This function finds a list of edges at the bottom boundary of the graph
*/
function listOfBottomEdges(coordinateList){
    var coordinateSpacing = listOfLeftEdges(coordinateList).length;
    var bottomList = [];
    
    for(var i = 0; i < coordinateList.length; i++){
        if(coordinateList[i][1] == 0){
            var edge = [i,i+coordinateSpacing+1];
            bottomList.push(edge);
        
        }
    
    };
    bottomList.pop()
    return bottomList
}
console.log('Bottom Edge');
console.log(listOfBottomEdges(coordinates));


/*Takes as input list of node coordinates
Set of 'listOf_blank_edges' functions together find the eges at the perimeter of the generated quasi-grid
This function finds a list of edges at the right boundary of the graph
ALSO checks to see if the eges along top boundary connect with edges along the bottom boundary, connecting the perimeter
*/
function listOfRightEdges(coordinateList){
    //var coordinateSpacing =listOfLeftEdges(coordinateList).length
    //var startIndex = coordinateSpacing  
    var bottomListItems = listOfBottomEdges(coordinateList);
    var topListitemsLength = bottomListItems.length;
    var startPoint = bottomListItems[topListitemsLength - 1][1];
    var rightList = [];

    for(var j = startPoint; j < coordinateList.length-1; j++){
        var edge = [j,j+1];
        rightList.push(edge);
        
    
    };
    return rightList
};
console.log('Right Edge');
console.log(listOfRightEdges(coordinates));

/*Takes as input a list of node coordinates
Checks to see if the edges at the top bounary of the graph connect to the edges at the right edge of the graph,
If they don't connect, this function will connect them
*/
function checkPerimeterConnection(coordinateList){
    var leftListItems = listOfLeftEdges(coordinateList);
    var leftListItemsLength = leftListItems.length;
    var topListItems = listOfTopEdges(coordinateList);
    var topListItemsLength = topListItems.length;
    var endpointOfFinalEdgeTop = topListItems[topListItemsLength-1][1];
    var rightListItems = listOfRightEdges(coordinateList);
    var rightListItemsLength = rightListItems.length;
    var bottomListItems = listOfBottomEdges(coordinateList);
    var bottomListItemsLength = bottomListItems.length;
    //var endpointOfFinalEdgeRight = rightListItems[rightListItemsLength-1][1];
    var connection = []

    if(rightListItemsLength < 1 && leftListItemsLength >1){
        var edge = [bottomListItems[bottomListItemsLength-1][1], endpointOfFinalEdgeTop];
        

        connection.push(edge);
        return connection;
    };

    if(endpointOfFinalEdgeTop != endpointOfFinalEdgeRight){
        var endpointOfFinalEdgeRight = rightListItems[rightListItemsLength-1][1];
        var edge = [endpointOfFinalEdgeTop, endpointOfFinalEdgeRight];
        connection.push(edge);
        return connection;
    };
    
};
console.log('connecting edge')
console.log(checkPerimeterConnection(coordinates));


/*
Takes as input a graph, & a matrix containging the distance from any point to any other point in that graph
Evaluates the distance between perimeter nodes in the graph, adds edges between those nodes with their distance as the node weight
*/
function addInitialEdges(G, distances){
    var nodeList = G.nodes();
    var nodeCoordinates = new Array(nodeList.length);
    for(var i = 0; i < nodeList.length; i++){
        var coord = G.node.get(i).coordinate;
        nodeCoordinates[i] = coord;   
    };
    
    var edgeWeight = distances;
    var leftList = [];
    

    var topList = [];
    for(var j = 0; j < nodeCoordinates.length; j++){
        if (nodeCoordinates[j][0] == 0 && nodeCoordinates[j+1][0] == 0){
        var edge = [j,j+1];
        leftList.push(edge);
        };
    };
    return leftList
    

    //return leftList
    
    
    /*
    G.addWeightedEdgesFrom([0,1,zeroToOne]);
    G.addWeightedEdgesFrom([0,2,zeroToTwo]);
    G.addWeightedEdgesFrom([1,3,OneToThree]);
    G.addWeightedEdgesFrom([3,2,threeToTwo]);
    */
};
var show = addInitialEdges(graph);
console.log('result');
console.log(show);




/*
var F = jsnx.completeGraph(6);
console.log('another graph');
console.log(F);
*/



module.exports = {
    interPointDistance, 
    graphGen, 
    nodeCoords,
    listOfLeftEdges,
    listOfTopEdges,
    listOfBottomEdges,
    checkPerimeterConnection
}
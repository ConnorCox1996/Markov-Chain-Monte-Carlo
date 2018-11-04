const jsnx = require('jsnetworkx');

/*
--> have to figure out how to deal with CLA?

when i generate my coordinates from a variable 
rather than from hard coded number (for M),
I get errors in my point distance generator
*/


/*
function initialPointGen(M){
    var xCoordinates = [];
    var yCoordinates = [];
    for(var i = 0; i < M; i++){
        xCoordinates[i]=i+1;
    };
    for(var j = 0; j < M; j++){
        yCoordinates[j] = j+2;
    };
    return [xCoordinates, yCoordinates];
};
*/

//var pointList = initialPointGen(4);




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

//takes as input a list of point coordinates, and the index of the points to calculate the distance between
function interPointDistance(positions, point1, point2){
    var deltax = (positions[point2][0]) - (positions[point1][0]);
    var deltay = (positions[point2][1]) - (positions[point1][1]);
    var dist = Math.sqrt((Math.pow(deltax, 2) + Math.pow(deltay, 2)));
    return dist;
};
/*
console.log("below is the dist between points");
console.log(interPointDistance(positions, 1, 4));
*/    


/*takes as input the a list of point coordinates
--> figure out how to add coordinates to graphGen
*/
function graphGen(coordList){
    var G = new jsnx.Graph();
    for(var i = 0; i < coordList.length; i++){
        G.addNode(i, {coordinate: coordList[i]});
    };
    var lst = G.nodes();
    return lst;
};

//adds (weighted) inital edges, initially connects graph
function addEdges(M){
    var initalCoords = nodeCoords(M);
    var zeroToOne = interPointDistance(initalCoords, 0, 1);
    var zeroToTwo = interPointDistance(initalCoords, 0, 2);
    var OneToThree = interPointDistance(initalCoords, 1, 3);
    var threeToTwo = interPointDistance(initalCoords, 3, 2);

    
    G.addWeightedEdgesFrom([0,1,zeroToOne]);
    G.addWeightedEdgesFrom([0,2,zeroToTwo]);
    G.addWeightedEdgesFrom([1,3,OneToThree]);
    G.addWeightedEdgesFrom([3,2,threeToTwo]);
}

var positions = nodeCoords(4);
console.log('coordinates');
console.log(positions);
console.log('Graph Nodes');
var initialGraph = graphGen(positions)
console.log(initialGraph);

/*
var F = jsnx.completeGraph(6);
console.log('another graph');
console.log(F);
*/



module.exports = {interPointDistance, graphGen, nodeCoords}
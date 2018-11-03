const jsnx = require('jsnetworkx');

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

//console.log(initialPointGen(3));

var positions = initialPointGen(5);
//console.log(positions);
function interPointDistance(positions, point1, point2){
    var deltax = (positions[0][point2]) - (positions[0][point1]);
    var deltay = (positions[1][point2]) - (positions[1][point1]);
    var dist = Math.sqrt((Math.pow(deltax, 2) + Math.pow(deltay, 2)));
    return dist;
};
    

function graphGen(M){
    var G = new jsnx.Graph();
    for(var i = 0; i < M; i++){
        G.addNode(i);
    };
    return G.nodes();
    
};

console.log(graphGen(4))

module.exports = {initialPointGen, interPointDistance}
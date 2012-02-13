var canvas=null; // Canvas object
var ctx=null; // 2d Context object
var buffer=null;
var bufferCtx=null;
var WIDTH = 900; // Buffer canvas width
var HEIGHT = 650; // Buffer canvas height
var MAXFPS = 32;
var SECONDS_BETWEEN_FRAMES = 1 / MAXFPS;

/*imagenes
var layer1 = new Image();
layer1.src = "layer1.png";
var layer2 = new Image();
layer2.src = "mar.png";
var layer3 = new Image();
layer3.src = "arboles.png";*/

window.onload = init;

function init(){
	// Obtengo los objetos canvas y sus contextos
	canvas = document.getElementById('canvas-engine');
	ctx = this.canvas.getContext('2d');
    buffer = document.createElement('canvas');
    buffer.width = this.canvas.width;
    buffer.height = this.canvas.height;
    bufferCtx = this.buffer.getContext('2d');
	
	new GameManager().initGameManager();
	
}

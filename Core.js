var canvas = null;
// Canvas object
var ctx = null;
// 2d Context object
var buffer = null;
var bufferCtx = null;
var WIDTH = 850;
// Buffer canvas width
var HEIGHT = 600;
// Buffer canvas height
var MAXFPS = 60;
var SECONDS_BETWEEN_FRAMES = 1 / MAXFPS;
// Ejes de desplazamiento
var DAXIS_X = 300;
var DAXIS_Y = 250;

function Plano(x, y, w, h, wS, hS, numStage, limitStageX, limitStageY,west,east,north,south)
{
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   this.wS = wS;
   this.hS = hS;
   this.numStage = numStage;
   this.limitStageX = limitStageX;
   this.limitStageY = limitStageY;
   this.changeStage = false;
   this.west = west;
   this.east = east;
   this.north = north;
   this.south = south;
  
   this.setPlano = function(plano)
   {
      this.x = plano.x;
      this.y = plano.y;
      this.w = plano.w;
      this.h = plano.h;
      this.wS = plano.wS;
      this.hS = plano.hS;
      this.numStage = plano.numStage;
      this.limitStageX = plano.limitStageX;
      this.limitStageY = plano.limitStageY;
	  this.west = plano.west;
	this.east = plano.east;
	this.north = plano.north;
	this.south = plano.south;
   }
}

var PLANO = null;

// Propiedades del Personaje principal

function Personaje(x, y, w, h, ws, hs)
{
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   this.ws = ws;
   this.hs = hs;
}

var PERSONAJE_PRINCIPAL = null;

/* Carga los elementos de un escenario
   stage:  @type ImageManager
   elements: arreglo de elementos a cargar
   conectors: arreglo de conectores del escenario hacia otro escenario
*/
function loadEscenario(elements, conectors)
{

   var stage = new ImageManager().initImageManager();
   // Cargo elementos del escenario
   if (elements.length < 10){
    var hola =1;
   }
   for (var i = 0; i < elements.length; i ++ )
   {
      if (elements[i][0] == "Stage")
      {
         stage.addImage(new Stage(elements[i][1], elements[i][2], elements[i][3], elements[i][4],
         elements[i][5], elements[i][6], elements[i][7], elements[i][8]));
      }
      else if (elements[i][0] == "EntityImage")
      {
         stage.addImage(new EntityImage(elements[i][1], elements[i][2], elements[i][3], elements[i][4],
         elements[i][5], elements[i][6], elements[i][7], elements[i][8], elements[i][9],
         elements[i][10], elements[i][11], elements[i][12]));
      }
      else if (elements[i][0] == "EntityImageScrollChild")
      {
         stage.addImage(new EntityImageScrollChild(elements[i][1], elements[i][2], elements[i][3], elements[i][4],
         elements[i][5], elements[i][6], elements[i][7], elements[i][8], elements[i][9],
         elements[i][10], elements[i][11]));
      }
      else if (elements[i][0] == "EntityImageChild")
      {
         stage.addImage(new EntityImageChild(elements[i][1], elements[i][2], elements[i][3], elements[i][4],
         elements[i][5], elements[i][6]));
      }
      else if (elements[i][0] == "Enemy")
      {
         stage.addImage(new Enemy(elements[i][1], elements[i][2], elements[i][3], elements[i][4],
         elements[i][5], elements[i][6], elements[i][7], elements[i][8], elements[i][9],
         elements[i][10], elements[i][11], elements[i][12], elements[i][13], elements[i][14], elements[i][15]));
      }
      else if (elements[i][0] == "FpsCore")
      {
         stage.addImage(new FpsCore(elements[i][1], elements[i][2]));
      }
      else if (elements[i][0] == "Character")
      {
         stage.addImage(new Character(elements[i][1], elements[i][2], elements[i][3], elements[i][4],
         elements[i][5], elements[i][6], elements[i][7], elements[i][8], elements[i][9],
         elements[i][10], elements[i][11], elements[i][12], elements[i][13], elements[i][14], elements[i][15]));
      }
	  else if (elements[i][0] == "TextDialogWindow2")
      {
         stage.addImage(new TextDialogWindow2(elements[i][1], elements[i][2], elements[i][3], elements[i][4], elements[i][5], elements[i][6]));
      }
	  
   }
   
   stage.sortImage();

   // Cargo conectores del escenario
   var idx = conectors[0][0];
   var conecc = new Array();
   for (var i = 0; i < conectors.length; i ++ )
   {
      if (idx != conectors[i][0])
      {
         var character_t = conecc[0];
         var plano_t = conecc[1];
         var character = new SimpleCharacter(character_t[2], character_t[3], character_t[4], character_t[5], 
         character_t[6], character_t[7], character_t[8], character_t[9], character_t[10]);
         var plano = new Plano(plano_t[2], plano_t[3], plano_t[4], plano_t[5], plano_t[6], plano_t[7], plano_t[8], plano_t[9], plano_t[10],
		 plano_t[11], plano_t[12], plano_t[13], plano_t[14]);
         stage.addNearStages(new ConfigStage(idx, character, plano));
         
         conecc = new Array();
         conecc.push(conectors[i]);
         idx = conectors[i][0];
      }
      else
      {
         conecc.push(conectors[i]);
      }
   }
   
   return stage;
}


/********************* Funciones de colisión ***********************/
//Colisión de un rectángulo con rectángulo
function collisionRectRect(rect1,rect2){
	if (rect1.x  + rect1.w < rect2.x)
    {
        return false;
    }
    if (rect1.y + rect1.h < rect2.y)
    {
        return false;
    }
    if (rect1.x  > rect2.x + rect2.w)
    {
        return false;
    }
    if (rect1.y  > rect2.y + rect2.h)
    {
        return false;
    }
	return true;
}
//Colisión de un circulo con rectángulo
function collisionCircleRect(circle,rect){
	var circleDistanceX = Math.abs(circle.x - rect.x - rect.w/2);
	var circleDistanceY = Math.abs(circle.y - rect.y - rect.h/2);
 
	if (circleDistanceX > (rect.w/2 + circle.r)) { return false; }
	if (circleDistanceY > (rect.h/2 + circle.r)) { return false; }
 	if (circleDistanceX <= (rect.w/2)) { return true; }
	if (circleDistanceY <= (rect.h/2)) { return true; }
 
	var cornerDistance_sq = Math.pow(circleDistanceX - rect.w/2, 2) + Math.pow(circleDistanceY - rect.h/2, 2);
 
	return (cornerDistance_sq <= (Math.pow(circle.r, 2)));
}

function wrapText(context, text, x, y, maxWidth, lineHeight){
		var words = text.split(" ");
		var line = "";
 
		for (var n = 0; n < words.length; n++) {
			var testLine = line + words[n] + " ";
			var metrics = context.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth) {
				context.fillText(line, x, y);
				line = words[n] + " ";
				y += lineHeight;
			}
			else {
				line = testLine;
			}
		}
		context.fillText(line, x, y);
}

function TextDialogInfo(textDialogs, textLengthCharacter){

	this.textDialogs = textDialogs;
	this.textLengthCharacter = textLengthCharacter;

}
function getDialogText(dialogos,paragraphLength,maxWidthIn, fontText){
   var canvasTmp = document.createElement('canvas');
   canvasTmp.width = 800;
   canvasTmp.height = 650;
   var canvasTmpCtx = canvasTmp.getContext('2d');
   canvasTmpCtx.font = fontText;
   var textDialogs = new Array();
   var textLengthCharacter = new Array();
   
   var line = "";
   var ini = 0, fin = 1;
   var test =  true;
   var maxWidth = paragraphLength * maxWidthIn;
   for (var j=0; j < dialogos.length; j++){
		var testCharacterName = dialogos[j][0];
		var metricsCharacterName = canvasTmpCtx.measureText(testCharacterName);
		textLengthCharacter.push(metricsCharacterName.width);
		
		var dialog = new Array();
        while (test){
			var testLine = dialogos[j][3].substring(ini,fin);
			var metrics = canvasTmpCtx.measureText(testLine);
			var testWidth = metrics.width;
			if (testWidth > maxWidth) {
				var lasIndex = testLine.lastIndexOf(" ");
				dialog.push(dialogos[j][3].substring(ini,lasIndex));
				ini = lasIndex;
				fin = ini+1;
			} else {
				fin++;
				if (fin == dialogos[j][3].length){
					dialog.push(dialogos[j][3].substring(ini,fin));
				}
			}
			test = fin < dialogos[j][3].length;
		}
		textDialogs.push(dialog);
		ini = 0;
		fin = 1;
		test =  true;
	}
	
	return new TextDialogInfo(textDialogs,textLengthCharacter);
}


var textDialogInfo = getDialogText(dialog2,3,750,"20px verdana");

for (var i = 0; i < textDialogInfo.textDialogs.length; i++){
	console.log(i + "-" + dialog2[i][0]);
	for (var j = 0; j < textDialogInfo.textDialogs[i].length; j++){
		console.log("--" + textDialogInfo.textDialogs[i][j])
	}
}

console.log("***************************************************************************************************");

for (var i = 0; i < textDialogInfo.textLengthCharacter.length; i++){
	console.log(dialog2[i][0] + "->" + textDialogInfo.textLengthCharacter[i]);
	
}

/* Punto de partida de la aplicación */
window.onload = init;

function init()
{
   // Obtengo los objetos canvas y sus contextos
   canvas = document.getElementById('canvas-engine');
   ctx = canvas.getContext('2d');
   buffer = document.createElement('canvas');
   buffer.width = canvas.width;
   buffer.height = canvas.height;
   bufferCtx = buffer.getContext('2d');

   new GameManager().initGameManager();
}

// Recibe 2 valores booleanos
function xor(a, b)
{
   return a ? ! b : b;
}

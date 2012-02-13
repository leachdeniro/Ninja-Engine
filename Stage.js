/*
Clase que representa a una entidad con imagen. Extiende de la clase Entity
*/
function Stage(src,x,y,z){
	//Constructor de la clase padre
	Entity.call(this,x,y,z);
	//this.x = x;
	//this.y = y;
	//this.zdepth = z;
	this.image = new Image();
	this.image.src = src;
	
	this.isUpdate = false;
	
	this.draw = function (context) {
		for (yAxis=500; yAxis<= 637;yAxis+=13){
			for (xAxis=0; xAxis<= 882;xAxis+=18){
				context.drawImage(this.image, xAxis, yAxis);
			}
		}
	}
		
}
	
//Extiendo de Entity
Stage.prototype = new Entity();

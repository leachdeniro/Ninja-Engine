// JavaScript Document
function StageManager(){

    //@type ImageManager
    this.stages = new Array();
    
    this.addStage =  function (stage){
		this.stages.push(stage);
	}
	
	this.setIndex =  function (position,stage){
		this.stages[position]=stage;
	}
	
	this.getStage = function(position){
	   return this.stages[position];
	}
	
}

// JavaScript Document
function ConfigStage(character,plano)
{
   //@type SimpleCharacter 
   this.character = character;
   //@type Plano
   this.plano = plano;
  
}

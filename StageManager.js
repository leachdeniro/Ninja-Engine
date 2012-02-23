// JavaScript Document
function StageManager(){

    //@type ImageManager
    this.stages = new Array();
    this.indexs = [0];
    
    this.addStage =  function (stage){
		this.stages.push(stage);
	}
	
	this.addIndex =  function (index){
		this.indexs.push(index);
	}
	
	this.getStage = function(position){
	   return this.stages[position];
	}
	
}

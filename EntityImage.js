/*
La variable direction_scrolling, es externa porque responde a un evento externo al objeto. Los valores que soporta están definidos
en la clase EntiyImageBase valores(NORTH, EAST, SOUTH, WEST, NONE).
 */
function EntityImage(src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage)
{
   // Constructor de la clase padre
   EntityImageBase.call(this, src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage);

   this.north = false;
   this.east = false;
   this.south = false;
   this.west = false;
   this.none = true;
   this.xplano = PLANO.x;
   this.yplano = PLANO.y;
   this.xPscroll = this.xScroll;
   this.yPscroll = this.yScroll;

   this.update = function (dt)
   {

      this.xPscroll = this.xScroll;
      this.yPscroll = this.yScroll;
      this.xplano = PLANO.x;
      this.yplano = PLANO.y;

      if (xor(this.east, this.west) && PLANO.limitStageX == NONE )
      {
         this.move(1,dt);
      }
      if (xor(this.north, this.south) && PLANO.limitStageY == NONE )
      {
         this.move(2,dt);
      }

      PLANO.x = this.xScroll;
      PLANO.y = this.yScroll;

      PERSONAJE_PRINCIPAL.x = PERSONAJE_PRINCIPAL.x + (PLANO.x - this.xplano);
      PERSONAJE_PRINCIPAL.y = PERSONAJE_PRINCIPAL.y + (PLANO.y - this.yplano);
      PERSONAJE_PRINCIPAL.xInS = PERSONAJE_PRINCIPAL.x;
      PERSONAJE_PRINCIPAL.yInS = PERSONAJE_PRINCIPAL.y;
      
   }

   this.collision = function(entity)
   {
      if (entity instanceof Stage)
      {
		 //console.log(PERSONAJE_PRINCIPAL.x +"," +PERSONAJE_PRINCIPAL.y +"," + PERSONAJE_PRINCIPAL.xInS +"," + PERSONAJE_PRINCIPAL.yInS + "," +PERSONAJE_PRINCIPAL.typeCollision);
         return entity.collision(PERSONAJE_PRINCIPAL);
      }
      return false;
   }

   this.afterCollision = function(entity)
   {
	  //console.log("EntityImage.afterCollision");
      if (entity instanceof Stage)
      {
		 //console.log("EntityImage.afterCollision");
         this.xScroll = this.xPscroll;
         this.yScroll = this.yPscroll;
         PLANO.x = this.xplano;
         PLANO.y = this.yplano;
      }

   }

   this.draw = function(context)
   {
      // Invoco al método draw del padre
      new EntityImageBase("layer0.png").draw.call(this, context);

      // Pinto las coordenadas de desplazamiento dentro del fondo
      this.drawCoordinates(context, 10, 35)

   }

   /* se desplaza por una imagen
   */
   this.move = function(type,dt)
   {

      if (type == 2)
      {
         if (this.north)
         {
            if ((this.yScroll - this.yAxisd*dt) >= 0)
            {
               this.yScroll -= this.yAxisd*dt;
            }
            else
            {
               this.yScroll = 0;
               PLANO.limitStageY = NORTH;
            }
         }
         if (this.south)
         {
            if ((this.yScroll + this.yAxisd*dt) <= (this.maxHStage - this.yAxisd*dt))
            {
               this.yScroll += this.yAxisd*dt;
            }
            else
            {
               this.yScroll = this.maxHStage;
               PLANO.limitStageY = SOUTH;
            }
         }

      }
      else if (type == 1)
      {

         if (this.west)
         {
            if ((this.xScroll - this.xAxisd*dt) >= 0)
            {
               this.xScroll -= this.xAxisd*dt;
            }
            else
            {
               this.xScroll = 0;
               PLANO.limitStageX = WEST;
            }
         }
         if (this.east)
         {
            if ((this.xScroll + this.xAxisd*dt) <= (this.maxWStage - this.xAxisd*dt))
            {
				console.log("this.move xScroll-1:" + this.xScroll + "," + PLANO.limitStageX + "," + dt);
               this.xScroll += this.xAxisd*dt;
				console.log("this.move xScroll-2:" + this.xScroll + "," + PLANO.limitStageX + "," + dt);
            }
            else
            {
               this.xScroll = this.maxWStage;
               PLANO.limitStageX = EAST;
			   console.log("this.move xScroll:" + this.xScroll + "," + PLANO.limitStageX + "," + dt);
            }
         }

      }
   }


   this.keyDown = function(event)
   {

	  if (PERSONAJE_PRINCIPAL.busy){
		return;
	  }
      if (event.keyCode == 37 && ! this.west)
      {
         this.west = true;

      }
      if (event.keyCode == 38 && ! this.north)
      {
         this.north = true;

      }
      if (event.keyCode == 39 && ! this.east)
      {
         this.east = true;

      }
      if (event.keyCode == 40 && ! this.south)
      {
         this.south = true;

      }
   }

   this.keyUp = function(event)
   {
	  if (PERSONAJE_PRINCIPAL.busy){
		return;
	  }
      if (event.keyCode == 37)
      {
         this.west = false;

      }
      if (event.keyCode == 38)
      {
         this.north = false;

      }
      if (event.keyCode == 39)
      {
         this.east = false;

      }
      if (event.keyCode == 40)
      {
         this.south = false;

      }

   }

}
// Extiendo de Entity
//EntityImageBase.call(this, src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage);
EntityImage.prototype = new EntityImageBase("layer0.png");


/*
EntityImageChild
 */
function EntityImageChild(src, x, y, z, widthImage, heightImage)
{
   // Constructor de la clase padre
   Entity.call(this, x, y, widthImage, heightImage, z);
   this.image = new Image();
   this.image.src = src;

   this.xInit = x;
   this.yInit = y;
   this.x = this.xInit - PLANO.x;
   this.y = this.yInit - PLANO.y;


   this.update = function()
   {
      this.x = this.xInit - PLANO.x;
      this.y = this.yInit - PLANO.y;
   }

   this.draw = function (context)
   {
      context.drawImage(this.image, this.x, this.y, this.w, this.h);
   }

}

// Extiendo de Entity
EntityImageChild.prototype = new Entity();


/*
TextDialogWindow
 *
function TextDialogWindow(src1, src2, texto, z, velocity, paragraphLength)
{

   if (paragraphLength > texto.length){
		throw "El largo del párrafo no puede ser mayor al largo del texto completo"
   }
   this.image1 = new Image();
   this.image1.src = src1;
   this.image2 = new Image();
   this.image2.src = src2;
   
   this.z = z;
   this.busy = false;
   
   this.velocity = velocity;
   this.countVelocity = velocity;
      
   this.countText = 1;
   this.countTextAccumulated = 1;
   this.maxCountText = 0;
   this.maxCountParagraph = 0;
   this.initIdxText = 1;
   this.paragraphLength = paragraphLength;
   this.paragraphLengthAccumulated = paragraphLength+1;
   
   for (var i = 1; i < texto.length; i++){
		this.maxCountText += texto[i].length;
   }
   
   for (var i = 1; i < paragraphLength+1; i++){
		this.maxCountParagraph += texto[i].length;
   }
   
   this.textToShow = texto;
   this.endParagraph = false;
   this.lockEndParagraph = false;
   this.countNextText = 0;

   this.update = function()
   {
		if (this.busy){
			
			return;
		}
	    if ((this.countVelocity % this.velocity) != 0){
			this.countVelocity ++;
			return;
		}
		this.countVelocity = 1;
		
		if (this.endParagraph){
			this.lockEndParagraph = true;
		}
		
		if (this.countNextText == 2 ){
			if ((this.initIdxText + this.paragraphLength) >= this.textToShow.length){
				this.busy = true;
				return;
			}
			this.countText = 1;
			this.initIdxText += this.paragraphLength;
			this.paragraphLengthAccumulated+=this.paragraphLength;
			if (this.paragraphLengthAccumulated >= this.textToShow.length){
				this.paragraphLengthAccumulated = this.textToShow.length;
			}
			this.countNextText = 0;
			this.maxCountParagraph = 0;
			for (var i = this.initIdxText; i < this.paragraphLengthAccumulated; i++){
				this.maxCountParagraph += texto[i].length;
			}
		}
		
		if ((this.countText < this.maxCountParagraph) && (this.countTextAccumulated < this.maxCountText) ){
			this.countText++;
			this.countTextAccumulated ++;
		} 
   }

   this.draw = function (ctx)
   {
		ctx.drawImage(this.image1, 20, 150 , 250, 264);
		
		ctx.save();
		ctx.translate(10, 390);
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.strokeRect (0, 0, 830, 200);
        ctx.fillStyle = "rgba(0, 0, 0, .9)";
        ctx.fillRect (0, 0, 830, 200);
        ctx.fill();
        ctx.restore();
		
		ctx.save();
		ctx.translate(20, 390);
		ctx.font = "20px verdana";
		ctx.fillStyle = "rgb(255,255,255)";
		
		ctx.fillText(this.textToShow[0], 5, 30);
		
		var yText = 80;
		var continueText = true;
		var i = this.initIdxText;
		var subTextLength = this.countText;
		var accumulated = 0;
		while (continueText){
			var text = "";
			var diffText = this.countText - (this.textToShow[i].length + accumulated);
			if (diffText <= 0){
				text = this.textToShow[i].substring(0,subTextLength);
				continueText = false;
			} else {
				text = this.textToShow[i];
				subTextLength = diffText;
				accumulated += this.textToShow[i].length;
				i++;
			}
			ctx.fillText(text, 5, yText);
			yText += 25;
		}
		ctx.restore();
   }
   
   this.keyDown = function(event)
   {
	  if (this.busy){
		return;
	  }
	  if (!this.lockEndParagraph){
		if (event.keyCode == 78)
		{
		    console.log(this.countNextText);
			this.countText = this.maxCountParagraph;
			this.endParagraph = true;
			this.countNextText++;
		}
	  }
   }

   this.keyUp = function(event) {
   
		if (this.busy){
			return;
		}
		
		if (event.keyCode == 78)
		{
			this.lockEndParagraph = false;
			this.endParagraph = false;
		}
   }

}*/

function TextDialogWindow2(src1, src2, texto, z, velocity, paragraphLength)
{

   if (paragraphLength > texto.length){
		throw "El largo del párrafo no puede ser mayor al largo del texto completo"
   }
   this.image1 = new Image();
   this.image1.src = src1;
   this.image2 = new Image();
   this.image2.src = src2;
   
   this.z = z;
   this.busy = false;
   
   this.velocity = velocity;
   this.countVelocity = velocity;
      
   this.countText = 0;
   this.currentIdxText = 0;
   this.currentIdxCharacter = 0;
   this.paragraphLength = paragraphLength;
   
   this.textToShow = texto;
   this.endParagraph = false;
   this.lockEndParagraph = false;
   this.countNextText = 0;
   
   this.fontText = "20px verdana";
   this.colorRectLine = "rgb(255, 255, 255)";
   this.colorRectFill = "rgba(0, 0, 0, .9)";
   this.colorText = "rgb(255,255,255)";;
   
   var textDialogInfo = getDialogText(texto,paragraphLength,750,this.fontText);
   this.textDialogs = textDialogInfo.textDialogs;
   this.textLengthCharacter = textDialogInfo.textLengthCharacter;
   
   this.currentText = this.textDialogs[0][0];

   this.update = function()
   {
		if (this.busy){
			stages.removeEntity(this);
			return;
		}
	    if ((this.countVelocity % this.velocity) != 0){
			this.countVelocity ++;
			return;
		}
		this.countVelocity = 1;
		
		if (this.endParagraph){
			this.lockEndParagraph = true;
		}
		
		if (this.countNextText == 2 ){
			this.currentIdxText++;
			console.log(this.currentIdxCharacter + "," + this.currentIdxText + "," + this.countText);
			if (this.currentIdxText < this.textDialogs[this.currentIdxCharacter].length){
				console.log("this.currentIdxText");
				this.currentText = this.textDialogs[this.currentIdxCharacter][this.currentIdxText];
				this.countText = 0;
			} else {
				console.log("this.currentIdxText - else");
				this.currentIdxCharacter++;
				if (this.currentIdxCharacter < this.textDialogs.length){
					this.currentIdxText = 0;
					this.countText = 0;
					this.currentText = this.textDialogs[this.currentIdxCharacter][this.currentIdxText];
				} else {
					this.busy = true;
				}
			}
			this.countNextText = 0;
			console.log(this.currentIdxCharacter + "," + this.currentIdxText + "," + this.currentText + "," + this.countText);
		}
		
		if (this.countText < this.currentText.length) {
			this.countText++;
		} else {
			this.countNextText = 1;
		}
   }

   
   this.draw = function (ctx)
   {
   
		if (this.busy){
			return;
		}
		var xImg = 0, yImg = 0, img;
		switch(this.textToShow[this.currentIdxCharacter][1] )
		{
			case 0:
				break;
			case 1:
				xImg = 10;
				yImg = 250;
				img = this.image1;
				break;
			case 2:
				xImg = 580;
				yImg = 250;
				img = this.image2;
				break;
			default:
				throw "No existe ese tipo de orientación '" + this.textToShow[this.currentIdxCharacter][1] + "' para la imágen";
  
		}
		var xName = 0;
		switch(this.textToShow[this.currentIdxCharacter][2] )
		{
			case 1:
				xName = 0;
				break;
			case 2:
				xName = 830 - (this.textLengthCharacter[this.currentIdxCharacter] + 20);
				break;
			default:
				throw "No existe ese tipo de orientación '" + this.textToShow[this.currentIdxCharacter][2] + "' para el nombre del personaje";
  
		}
		if (this.textToShow[this.currentIdxCharacter][1] > 0){
			ctx.drawImage(img, xImg, yImg , 250, 264);
		}
		
		ctx.save();
		
		ctx.beginPath();
		ctx.translate(10, 460);
        ctx.strokeStyle = this.colorRectLine;
        ctx.strokeRect (xName, 0, this.textLengthCharacter[this.currentIdxCharacter] + 20, 30);
        ctx.fillStyle = this.colorRectFill;
        ctx.fillRect (xName, 0, this.textLengthCharacter[this.currentIdxCharacter] + 20, 30);
		ctx.closePath();
        ctx.fill();
		
		ctx.beginPath();
		ctx.strokeRect (0, 30, 830, 100);
        ctx.fillRect (0, 30, 830, 100);
		ctx.closePath();
        ctx.fill();
        ctx.restore();
		
		ctx.save();
		ctx.translate(20, 460);
		ctx.font = this.fontText;
		ctx.fillStyle = this.colorText;
		
		ctx.fillText(this.textToShow[this.currentIdxCharacter][0], xName, 20);
		var text = this.currentText.substring(0,this.countText);
		wrapText(ctx, text, 10, 60, 800, 25);
		
		ctx.restore();
   }
   
   this.keyDown = function(event)
   {
	  if (this.busy){
		return;
	  }
	  if (!this.lockEndParagraph){
		if (event.keyCode == 78)
		{
		    //console.log(this.countNextText);
			this.countText = this.currentText.length;
			this.endParagraph = true;
			this.countNextText++;
		}
	  }
   }

   this.keyUp = function(event) {
   
		if (this.busy){
			return;
		}
		
		if (event.keyCode == 78)
		{
			this.lockEndParagraph = false;
			this.endParagraph = false;
		}
   }

}

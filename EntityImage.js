/*La variable direction_scrolling, es externa porque responde a un evento externo al objeto. Los valores que soporta est�n definidosen la clase EntiyImageBase valores(NORTH, EAST, SOUTH, WEST, NONE). */function EntityImage(src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage){   // Constructor de la clase padre   EntityImageBase.call(this, src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage);   this.north = false;   this.east = false;   this.south = false;   this.west = false;   this.none = true;   this.xplano = PLANO.x;   this.yplano = PLANO.y;   this.xPscroll = this.xScroll;   this.yPscroll = this.yScroll;   this.update = function (dt)   {      this.xPscroll = this.xScroll;      this.yPscroll = this.yScroll;      this.xplano = PLANO.x;      this.yplano = PLANO.y;      if (xor(this.east, this.west) && PLANO.limitStageX == NONE )      {         this.move(1,dt);      }      if (xor(this.north, this.south) && PLANO.limitStageY == NONE )      {         this.move(2,dt);      }      PLANO.x = this.xScroll;      PLANO.y = this.yScroll;      PERSONAJE_PRINCIPAL.x = PERSONAJE_PRINCIPAL.x + (PLANO.x - this.xplano);      PERSONAJE_PRINCIPAL.y = PERSONAJE_PRINCIPAL.y + (PLANO.y - this.yplano);      PERSONAJE_PRINCIPAL.xInS = PERSONAJE_PRINCIPAL.x;      PERSONAJE_PRINCIPAL.yInS = PERSONAJE_PRINCIPAL.y;         }   this.collision = function(entity)   {      if (entity instanceof Stage)      {		 console.log(PERSONAJE_PRINCIPAL.x +"," +PERSONAJE_PRINCIPAL.y +"," + PERSONAJE_PRINCIPAL.xInS +"," + PERSONAJE_PRINCIPAL.yInS + "," +PERSONAJE_PRINCIPAL.typeCollision);         return entity.collision(PERSONAJE_PRINCIPAL);      }      return false;   }   this.afterCollision = function(entity)   {	  console.log("EntityImage.afterCollision");      if (entity instanceof Stage)      {		 console.log("EntityImage.afterCollision");         this.xScroll = this.xPscroll;         this.yScroll = this.yPscroll;         PLANO.x = this.xplano;         PLANO.y = this.yplano;      }   }   this.draw = function(context)   {      // Invoco al m�todo draw del padre      new EntityImageBase("layer0.png").draw.call(this, context);      // Pinto las coordenadas de desplazamiento dentro del fondo      this.drawCoordinates(context, 10, 35)   }   /* se desplaza por una imagen   */   this.move = function(type,dt)   {      if (type == 2)      {         if (this.north)         {            if ((this.yScroll - this.yAxisd*dt) >= 0)            {               this.yScroll -= this.yAxisd*dt;            }            else            {               this.yScroll = 0;               PLANO.limitStageY = NORTH;            }         }         if (this.south)         {            if ((this.yScroll + this.yAxisd*dt) <= (this.maxHStage - this.yAxisd*dt))            {               this.yScroll += this.yAxisd*dt;            }            else            {               this.yScroll = this.maxHStage;               PLANO.limitStageY = SOUTH;            }         }      }      else if (type == 1)      {         if (this.west)         {            if ((this.xScroll - this.xAxisd*dt) >= 0)            {               this.xScroll -= this.xAxisd*dt;            }            else            {               this.xScroll = 0;               PLANO.limitStageX = WEST;            }         }         if (this.east)         {            if ((this.xScroll + this.xAxisd*dt) <= (this.maxWStage - this.xAxisd*dt))            {               this.xScroll += this.xAxisd*dt;            }            else            {               this.xScroll = this.maxWStage;               PLANO.limitStageX = EAST;            }         }      }   }   this.keyDown = function(event)   {      if (event.keyCode == 37 && ! this.west)      {         this.west = true;      }      if (event.keyCode == 38 && ! this.north)      {         this.north = true;      }      if (event.keyCode == 39 && ! this.east)      {         this.east = true;      }      if (event.keyCode == 40 && ! this.south)      {         this.south = true;      }   }   this.keyUp = function(event)   {      if (event.keyCode == 37)      {         this.west = false;      }      if (event.keyCode == 38)      {         this.north = false;      }      if (event.keyCode == 39)      {         this.east = false;      }      if (event.keyCode == 40)      {         this.south = false;      }   }}// Extiendo de Entity//EntityImageBase.call(this, src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage);EntityImage.prototype = new EntityImageBase("layer0.png");/*EntityImageChild */function EntityImageChild(src, x, y, z, widthImage, heightImage){   // Constructor de la clase padre   Entity.call(this, x, y, widthImage, heightImage, z);   this.image = new Image();   this.image.src = src;   this.xInit = x;   this.yInit = y;   this.x = this.xInit - PLANO.x;   this.y = this.yInit - PLANO.y;   this.update = function()   {      this.x = this.xInit - PLANO.x;      this.y = this.yInit - PLANO.y;   }   this.draw = function (context)   {      context.drawImage(this.image, this.x, this.y, this.w, this.h);   }}// Extiendo de EntityEntityImageChild.prototype = new Entity();
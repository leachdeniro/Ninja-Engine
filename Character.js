
/*
Propiedades sprite de prueba
width = 196
height = 168
widthFrame = 28
heightFrame = 42
 */

// Acciones del personaje principal
var CHARACTER_WALK_NORTH = 0,
CHARACTER_WALK_EAST = 1,
CHARACTER_WALK_SOUTH = 2,
CHARACTER_WALK_WEST = 3,
CHARACTER_STILL = - 1;
// Configuración arreglo de acciones para personaje principal
var arrayPrincipal = [42, 84, 0, 126];



function SimpleCharacter(x, y, busy,walkWest, walkEast, walkNorth, walkSouth, typeCollision, maxCountAnimationCollision)
{
   this.x = x;
   this.y = y;
   this.busy = busy;
   this.walkWest = walkWest;
   this.walkEast = walkEast;
   this.walkNorth = walkNorth;
   this.walkSouth = walkSouth;
   this.typeCollision = typeCollision;
   this.maxCountAnimationCollision = maxCountAnimationCollision;
}

/*
Clase para la configuración del personaje principal
 */
function Character(src, x, y, z, widthFrame, heightFrame, numRows, numColums, velocity, xsd, ysd, widthCh, heightCh, arraySprite, inS)
{
   // Constructor de la clase padre
   Entity.call(this, x, y, widthCh, heightCh, z);

   this.walkWest = false;
   this.walkEast = false;
   this.walkNorth = false;
   this.walkSouth = false;
   this.shoot = false;
   this.lockShoot = false;
   
   this.lastPosition = CHARACTER_WALK_SOUTH;

   this.image = new Image();
   this.image.src = src;

   this.widthFrame = widthFrame;
   this.heightFrame = heightFrame;
   this.numRows = numRows;
   this.numColums = numColums;

   // posición inicial
   this.xPositionOnSprite = 0;
   this.yPositionOnSprite = 0;

   // variables para controlar velocidad del personaje
   this.velocityFactor = velocity;
   this.velocity = velocity;

   // máximos del Sprite
   this.maxWitdhtSprite = widthFrame * numColums - widthFrame;
   this.maxHeightSprite = heightFrame * numRows - heightFrame;

   // m‡ximos ancho y alto
   this.maxWStage = WIDTH - widthCh;
   //this.maxWStage = this.maxWStage % xsd == 0 ? this.maxWStage : this.maxWStage - (this.maxWStage % xsd);
   this.maxHStage = HEIGHT - heightCh;
   //this.maxHStage = this.maxHStage % ysd == 0 ? this.maxHStage : this.maxHStage - (this.maxHStage % ysd);

   // valor desplazamiento de los ejex x y x para el personaje
   this.xsd = xsd;
   this.ysd = ysd;

   // seteo arreglo de sprites
   this.arraySprite = arraySprite;

   // Coordenadas dentro del escenario
   this.xInS = inS.x;
   this.yInS = inS.y;
   this.cxIns = this.xInS;
   this.cyIns = this.yInS;

   this.maxWidthScenario = PLANO.wS - widthCh;
   this.maxHeightScenario = PLANO.hS - heightCh;

   this.cx = this.x;
   this.cy = this.y;

   // Valores para reestablecer el personaje luego de la animación de colisión
   this.xInit = this.x;
   this.yInit = this.y;
   this.iniW = this.w;
   this.initH = this.h;
   this.countAnimationCollision = 0;
   // 1 = Colisión con enemigo, 2 = colisión con escenario, 3 = colisión con paso a otro escenario
   this.typeCollision = 0;
   this.idNearStage = 0;
   this.maxCountAnimationCollision = 10;
   
   

   this.setSimpleCharacter = function(sCharacter){
        this.x = sCharacter.x;
        this.y = sCharacter.y;
        this.busy = sCharacter.busy;
        this.walkWest = sCharacter.walkWest;
        this.walkEast = sCharacter.walkEast;
        this.walkNorth = sCharacter.walkNorth;
        this.walkSouth = sCharacter.walkSouth;
        this.typeCollision = sCharacter.typeCollision;
        this.countAnimationCollision = 0;
        this.maxCountAnimationCollision = sCharacter.maxCountAnimationCollision;
        this.idNearStage = 0;
   }

   this.draw = function (context)
   {

      context.drawImage(this.image, this.xPositionOnSprite, this.yPositionOnSprite, this.widthFrame, this.heightFrame, this.x, this.y, this.w, this.h);
      this.drawCoordinates(context);

   }
   
   this.update = function (dt)
   {
      // actualizo los datos para la animación de colisión
      if (this.busy && this.typeCollision == 1)
      {

         if (this.countAnimationCollision <= 50)
         {
            this.w += 1;
            this.h += 1;
            this.countAnimationCollision ++ ;
            return;
         }
         else
         {
            this.countAnimationCollision = 0;
            this.busy = false;
            this.typeCollision = 0;

            // Recupero los valores iniciales
            this.x = this.xInit;
            this.y = this.yInit;
            this.w = this.iniW;
            this.h = this.initH;
            this.walkWest = false;
            this.walkEast = false;
            this.walkNorth = false;
            this.walkSouth = false;
            PLANO.limitStageX = WEST;
            PLANO.limitStageY = NORTH;
         }
      }

      if (this.busy && this.typeCollision == 3)
      {
         if (this.countAnimationCollision <= this.maxCountAnimationCollision)
         {
            this.countAnimationCollision += this.xsd*dt;
         }
         else
         {
            this.busy = false;
			PERSONAJE_PRINCIPAL.busy = false;
            this.countAnimationCollision = 0;
            this.typeCollision == 0;
            PLANO.changeStage = true;
         }
      }
      if (this.busy && this.typeCollision == 4)
      {
         if (this.countAnimationCollision <= this.maxCountAnimationCollision)
         {
            //console.log("typeCollision == 4: " + this.countAnimationCollision + "/" + this.xInS + "," + this.yInS + "/" + this.getAction());
            this.countAnimationCollision += this.xsd*dt;
            
         }
         else
         {
            this.busy = false;
			PERSONAJE_PRINCIPAL.busy = false;
		    this.countAnimationCollision = 0;
            this.typeCollision == 0;
            this.walkWest = false;
            this.walkEast = false;
            this.walkNorth = false;
            this.walkSouth = false;
            PLANO.changeStage = false;
            console.log("Salida this.typeCollision == 4: " + this.xInS + "," + this.yInS);
         }
      }

      // Avanzo las coordenadas del personaje dentro del escenario
      this.cx = this.x;
      this.cy = this.y;
	  this.cxIns = this.xInS;
	  this.cyIns = this.yInS;

      this.move(dt);
      this.advanceInS();

      this.animationSprite(dt);

      // Actualizo variable del personaje principal
      PERSONAJE_PRINCIPAL.x = this.xInS;
      PERSONAJE_PRINCIPAL.y = this.yInS;
      PERSONAJE_PRINCIPAL.xInS = PERSONAJE_PRINCIPAL.x;
      PERSONAJE_PRINCIPAL.yInS = PERSONAJE_PRINCIPAL.y;
   }

   /* Chequea la colisión con otra entidad de forma rectangular */
   this.collision = function(entity)
   {

      if (this.busy || entity.busy)
      {
         return false;
      }

      this.typeCollision = 0;

      if (entity instanceof Enemy)
      {
	     var rect1 = new Entity(this.xInS,this.yInS,this.w,this.h,0);
         var coll = collisionRectRect(rect1,entity);
         this.typeCollision = coll ? 1 : 0;
         return coll;
      }
      else if (entity instanceof Stage)
      {
         return entity.collision(this);
      }

      return false;
   }

   this.afterCollision = function(entity)
   {

      if (this.busy || entity.busy)
      {
         return false;
      }

      if (entity instanceof Stage)
      {
         this.x = this.cx;
         this.y = this.cy;
		 this.xInS = this.cxIns;
		 this.yInS = this.cyIns;
		 console.log(this.x +"," +this.y +"," + this.xInS +"," + this.yInS + "," +this.typeCollision);
         if (this.typeCollision == 3)
         {
            this.busy = true;
			PERSONAJE_PRINCIPAL.busy = true;
         }
      }
      else if (entity instanceof Enemy)
      {
         /* Acá va la animación para cuando el personaje colisione con un enemigo */
         // alert("Ud. ha chocado");
         console.log("Colisión: Principal(" + this.xInS + "," + this.yInS + ")/Enemy(" +  entity.x + "," + entity.y + ")");
         this.busy = true;
      }
   }


   /* se desplaza por una imagen
   */
   this.move = function(dt)
   {

      if (xor(this.walkEast, this.walkWest) && PLANO.limitStageX != NONE)
      {
         this.advance(dt, 2);

         if ((this.x >= (DAXIS_X - this.xsd*dt)) && (this.x <= (DAXIS_X + this.xsd*dt)))
         {
            PLANO.limitStageX = NONE;
			console.log("this.move");
         }
      }
      if (xor(this.walkNorth, this.walkSouth) && PLANO.limitStageY != NONE)
      {
         this.advance(dt, 1);
         if ((this.y >= (DAXIS_Y - this.ysd*dt)) && (this.y <= (DAXIS_Y + this.ysd*dt)))
         {
            PLANO.limitStageY = NONE;
         }
      }
	  
	  if (this.shoot && !this.lockShoot){
		stages.addEntity(new Shoot(this.x + (this.w/2),this.y + (this.h/2),this.walkWest,this.walkEast,this.walkNorth,this.walkSouth,this.lastPosition,stages.getLengthCurrentEntities+1));
		this.lockShoot = true;
	  }
   }

   this.animationSprite = function(dt)
   {
      
      if (this.velocityFactor % this.velocity == 0)
      {
         if ((this.xPositionOnSprite + this.widthFrame) <= (this.maxWitdhtSprite))
         {
            this.xPositionOnSprite += this.widthFrame;
         }
         else
         {
            this.xPositionOnSprite = 0;
         }
         this.velocityFactor = 1;
      }
      else
      {
         this.velocityFactor += 1;
      }

      this.yPositionOnSprite = arraySprite[this.getAction()];

   }

   this.getAction = function()
   {
      if (this.walkWest)
      {
         return CHARACTER_WALK_WEST;
      }
      else
      if (this.walkNorth)
      {
         return CHARACTER_WALK_NORTH;
      }
      else
      if (this.walkEast)
      {
         return CHARACTER_WALK_EAST;
      }
      else
      if (this.walkSouth)
      {
         return CHARACTER_WALK_SOUTH;
      }
      return this.lastPosition;
   }

   this.advance = function(dt, type)
   {
      if (type == 1)
      {
         if (this.walkNorth)
         {
            if ((this.y - this.ysd*dt) >= 0)
            {
               this.y -= this.ysd * dt;
            }
            else
            {
               this.y = 0;
            }

         }
         if (this.walkSouth)
         {
            if ((this.y + this.ysd*dt) <= (this.maxHStage - this.ysd*dt))
            {
               this.y += this.ysd * dt;
            }
            else
            {
               this.y = this.maxHStage;
            }

         }
      }
      else if (type == 2)
      {

         if (this.walkEast)
         {
            if ((this.x + this.xsd*dt) <= (this.maxWStage - this.xsd*dt))
            {
               this.x += this.xsd * dt;
            }
            else
            {
               this.x = this.maxWStage;

            }
         }
         if (this.walkWest)
         {
            if ((this.x - this.xsd*dt) >= 0)
            {
               this.x -= this.xsd * dt;
            }
            else
            {
               this.x = 0;
            }
         }
      }

   }


   this.advanceInS = function()
   {
      this.xInS = this.x + PLANO.x;
      this.yInS = this.y + PLANO.y;

   }

   this.drawCoordinates = function (context)
   {
      context.save();
      context.fillStyle = 'rgb(255,255,255)';
      context.font = 'bold 10px sans-serif';
      context.fillText('(x,y)(xis,yis)/lX,lY: (' + this.x + ',' + this.y + ')(' + this.xInS + ',' + this.yInS + ')/' + PLANO.limitStageX + ',' + PLANO.limitStageY, 10, 25);
	  context.fillText('PP(x,y)(xis,yis): (' + PERSONAJE_PRINCIPAL.x + ',' + PERSONAJE_PRINCIPAL.y + ')(' + PERSONAJE_PRINCIPAL.xInS + ',' + PERSONAJE_PRINCIPAL.yInS + ')', 10, 45);
      context.restore();
   }

   this.keyDown = function(event)
   {

      if (this.busy)
      {
         return;
      }

      var updateSprite = false;

      if (event.keyCode == 37 && ! this.walkWest)
      {
         this.walkWest = true;
         updateSprite = true;
      }
      if (event.keyCode == 38 && ! this.walkNorth)
      {
         this.walkNorth = true;
         updateSprite = true;
      }
      if (event.keyCode == 39 && ! this.walkEast)
      {
         this.walkEast = true;
         updateSprite = true;
      }
      if (event.keyCode == 40 && ! this.walkSouth)
      {
         this.walkSouth = true;
         updateSprite = true;
      }
	  if (!this.lockShoot){
		if (event.keyCode == 88 && !this.shoot)
		{
			this.shoot = true;
			updateSprite = true;
		}
	  }
	 
	 if (updateSprite)
      {
         this.animationSprite(1);
      }

   }

   this.keyUp = function(event)
   {

      if (this.busy)
      {
         return;
      }

      var updateSprite = false;

      if (event.keyCode == 37)
      {
         this.walkWest = false;
         updateSprite = true;
	     this.lastPosition = CHARACTER_WALK_WEST;
      }
      if (event.keyCode == 38)
      {
         this.walkNorth = false;
         updateSprite = true;
		 this.lastPosition = CHARACTER_WALK_NORTH;
      }
      if (event.keyCode == 39)
      {
         this.walkEast = false;
         updateSprite = true;
		 this.lastPosition = CHARACTER_WALK_EAST;
      }
      if (event.keyCode == 40)
      {
         this.walkSouth = false;
         updateSprite = true;
		 this.lastPosition = CHARACTER_WALK_SOUTH;
      }
	  
	  if (event.keyCode == 88)
      {
         this.shoot = false;
		 updateSprite = true;
		 this.lockShoot = false;
      }

      if (updateSprite)
      {
         this.animationSprite(1);
      }

   }


}

// Extiendo de Entity
Character.prototype = new Entity();

// Acciones del enemigo
var ENEMY_WALK_WEST = 0, ENEMY_WALK_EAST = 1;
// Configuración arreglo de acciones para el enemigo
var arrayEnemy = [0, 48];
/*
arrayRoad = [xini, xfin]. Rango del eje x por el que se desplaza
 */

function Enemy(src, x, y, z, widthFrame, heightFrame, numRows, numColums, velocity, xsd, ysd, widthCh, heightCh, arraySprite, arrayRoad)
{
   // Constructor de la clase padre
   Entity.call(this, x, y, widthCh, heightCh, z);

   // Dirección al este
   this.directionFactor = 1;
   this.action = ENEMY_WALK_EAST;
   this.arrayRoad = arrayRoad;
   this.x = arrayRoad[0];

   this.image = new Image();
   this.image.src = src;

   this.widthFrame = widthFrame;
   this.heightFrame = heightFrame;
   this.numRows = numRows;
   this.numColums = numColums;

   // máximos del Sprite
   this.maxWitdhtSprite = widthFrame * numColums - widthFrame;
   this.maxHeightSprite = heightFrame * numRows - heightFrame;

   // posición inicial
   this.xPositionOnSprite = 0;
   this.yPositionOnSprite = 0;

   // variables para controlar velocidad del personaje
   this.velocityFactor = velocity;
   this.velocity = velocity;

   // valor desplazamiento de los ejes "x" e "y" para el personaje
   this.xsd = xsd;
   this.ysd = ysd;

   // seteo arreglo de sprites
   this.arraySprite = arraySprite;
   
   //propiedades que controlan los impactos con la entidad Shoot
   this.countToDeath = 0;
   this.maxCountToDeath = 5;
   
   this.draw = function (context)
   {

      context.drawImage(this.image, this.xPositionOnSprite, this.yPositionOnSprite, this.widthFrame, this.heightFrame, this.x  - PLANO.x, this.y - PLANO.y, this.w, this.h);
      //context.drawImage(this.image, this.xPositionOnSprite, this.yPositionOnSprite, this.widthFrame, this.heightFrame, this.x, this.y, this.w, this.h);
   }

   this.update = function (dt)
   {
      // Avanzo las coordenadas del personaje dentro del escenario
      this.advance(dt);
      this.animationSprite();
   }

   this.animationSprite = function()
   {

      if (this.velocityFactor % this.velocity == 0)
      {
         if ((this.xPositionOnSprite + this.widthFrame) <= (this.maxWitdhtSprite))
         {
            this.xPositionOnSprite += this.widthFrame;
         }
         else
         {
            this.xPositionOnSprite = 0;
         }
         this.velocityFactor = 1;
      }
      else
      {
         this.velocityFactor += 1;
      }

      this.yPositionOnSprite = arraySprite[this.action];

   }

   this.advance = function(dt)
   {
      if (this.x > arrayRoad[1])
      {
         this.directionFactor = - 1
         this.action = ENEMY_WALK_WEST;
      }
      if (this.x < arrayRoad[0])
      {
         this.directionFactor = 1;
         this.action = ENEMY_WALK_EAST;
      }
	  
	  if (!isNaN(dt))
      {
	      this.x += this.xsd * dt * this.directionFactor;
	  }
   }

   /* Chequea la colisión con otra entidad de forma rectangular */
   this.collision = function(entity)
   {

      if (this.busy || entity.busy)
      {
         return;
      }
	
      var coll = false;
      if (entity instanceof Character){
	     var rect2 = new Entity(entity.xInS,entity.yInS,entity.w,entity.h,0);
         coll = collisionRectRect(this,rect2);
		 entity.typeCollision = coll ? 1 : 0;
      } else if (entity instanceof Shoot){
	     var rect = new Entity(this.x-PLANO.x,this.y-PLANO.y,this.w,this.h,0);
		 coll = collisionCircleRect(entity,rect);
		 if (coll){
			this.countToDeath++;
		 }
	  }

      return coll;
   }

   this.afterCollision = function(entity)
   {
      /* Acción que se realiza en una entidad tipo Enemy cuán colisiona */
	  if (this.countToDeath == this.maxCountToDeath){
		stages.removeEntity(this);
	  }
   }

}

// Extiendo de Entity
Enemy.prototype = new Entity();


function Shoot(x, y,west,east,north,south,lastPosition,z)
{
   // Constructor de la clase padre
   Entity.call(this, x, y, 0, 0, z);
   
   this.r = 5;
   this.vx = 4;
   this.vy = 4;
   
   
   this.west = west;
   this.east = east;
   this.north = north;
   this.south = south;
   if (!west && !east && !north && !south){
		switch(lastPosition){
			case CHARACTER_WALK_WEST:
				this.west = true;
				break;
			case CHARACTER_WALK_EAST:
				this.east = true;
				break;
			case CHARACTER_WALK_NORTH:
				this.north = true;
				break;
			case CHARACTER_WALK_SOUTH:
				this.south = true;
				break;
			default:
		}
	}
   
   this.draw = function(context)
   {
      context.save();
      context.translate(this.x, this.y);
      context.fillStyle = "rgb(0,0,0)";
      context.beginPath();
      context.arc(0, 0, this.r, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.restore();
   }
   
   this.update = function(){
	  if (this.west){
	    this.x-=this.vx ;
	  } else 
	  if (this.east){
	    this.x+=this.vx ;
	  }
	  if (this.north){
	    this.y-=this.vy ;
	  } else 
	  if (this.south){
	    this.y+=this.vy ;
	  }
	  
	  if ((this.x + this.r > WIDTH || this.x + this.r < 0) || (this.y + this.r > HEIGHT|| this.y + this.r < 0)){
		stages.removeEntity(this);
	  }
   }
   
   /* Chequea la colisión con otra entidad de forma rectangular */
   this.collision = function(entity)
   {
		if (entity instanceof Enemy || entity instanceof Stage){
			return collisionCircleRect(this,entity);
		}
		return false;
   }

   this.afterCollision = function(entity)
   {
	  stages.removeEntity(this);
	  /* Acción que se realiza en una entidad tipo Enemy cuán colisiona */
   }
   
}

// Extiendo de Entity
Shoot.prototype = new Entity();


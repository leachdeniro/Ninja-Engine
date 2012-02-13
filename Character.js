
/*
Propiedades sprite de prueba
width = 196
height = 168
widthFrame = 28
heightFrame = 42

 */

function Character(src, x, y, z, widthFrame, heightFrame, numRows, numColums, velocity, update)
{
   // Constructor de la clase padre
   Entity.call(this, x, y, z, update);
   this.image = new Image();
   this.image.src = src;
   this.widthFrame = widthFrame;
   this.heightFrame = heightFrame;
   this.numRows = numRows;
   this.numColums = numColums;

   // posición inicial
   this.xPositionOnSprite = 0;
   this.yPositionOnSprite = 84;

   // variables para controlar velocidad del personaje
   this.velocityFactor = velocity;
   this.velocity = velocity;

   // máximos del Sprite
   this.maxWitdhtSprite = widthFrame * numColums - widthFrame;
   this.maxHeighttSprite = heightFrame * numRows - heightFrame;


   this.draw = function (context)
   {

      context.drawImage(this.image, this.xPositionOnSprite, this.yPositionOnSprite, this.widthFrame, this.heightFrame, this.x, this.y, this.widthFrame + 20, this.heightFrame + 20);

   }

   this.update = function ()
   {
      this.move(direction_scrolling);
   }

   /* se desplaza por una imagen
   */
   this.move = function(action)
   {
      switch (action)
      {
         case NORTH :
            this.animationSprite();
            this.yPositionOnSprite = 42;

            break;
         case EAST :
            this.animationSprite();
            this.yPositionOnSprite = 84;

            break;
         case SOUTH :
            this.animationSprite();
            this.yPositionOnSprite = 0;

            break;
         case WEST :
            this.animationSprite();
            this.yPositionOnSprite = 126;

            break;
         default :
            break;
      }

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
   }
}

// Extiendo de Entity
Character.prototype = new Entity();

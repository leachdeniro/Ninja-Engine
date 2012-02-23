// JavaScript Document


function EntityImageChild(src, x, y, z, widthImage, heightImage)
{
   // Constructor de la clase padre
   Entity.call(this, x, y, widthImage, heightImage, z);
   this.image = new Image();
   this.image.src = src;

   this.xInit = x;
   this.yInit = y;
   this.x = this.xInit - X_PLANO;
   this.y = this.yInit - Y_PLANO;


   this.update = function()
   {
         this.x = this.xInit - X_PLANO;
         this.y = this.yInit - Y_PLANO;
   }

   this.draw = function (context)
   {
      context.drawImage(this.image, this.x, this.y, this.w, this.h);
   }

}

// Extiendo de Entity
EntityImageChild.prototype = new Entity();

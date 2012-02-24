

/*
Clase base para las entidades a dibujar
 */

function Entity(x, y, w, h, z)
{
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   this.zdepth = z;
   this.busy = false;

   // return this; Sin uso por ahora
   this.drawFn =  function(fn, context)
   {
      fn(context);
   }

   this.collision = function(entity)
   {
      return false
   }
   this.afterCollision = function(entity)
   {

   }

}

function FatherEntityImage(xsFather, ysFather, xsdFather, ysdFather)
{
   this.xsFather = xsFather;
   this.ysFather = ysFather;
   this.xsdFather = xsdFather;
   this.ysdFather = ysdFather;
}

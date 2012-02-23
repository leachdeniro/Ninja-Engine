

/*
Clase base para las entidades a dibujar
 */

function Entity(x, y, w,h,z)
{
   this.x = x;
   this.y = y;
   this.w = w;
   this.h = h;
   this.zdepth = z;
   
   // return this; Sin uso por ahora
   this.drawFn =  function(fn, context)
   {
      fn(context);
   }
   
   /*Chequea la colisión con otra entidad de forma rectangular*/
   this.collision = function(entity)
   {

      if (this.x  + this.w < entity.x)
      {
         return false;
      }
      if (this.y + this.h < entity.y)
      {
         return false;
      }
      if (this.x  > entity.x + entity.w)
      {
         return false;
      }
      if (this.y  > entity.y + entity.h)
      {
         return false;
      }
      return true;
   }

}

function FatherEntityImage(xsFather,ysFather, xsdFather, ysdFather){
    this.xsFather = xsFather;
    this.ysFather = ysFather;
    this.xsdFather = xsdFather;
    this.ysdFather = ysdFather;
}


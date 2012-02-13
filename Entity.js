

/*
Clase base para las entidades a dibujar
 */

function Entity(x, y, z, update)
{
   this.x = x;
   this.y = y;
   this.zdepth = z;
   this.isUpdate = update;

   // return this; Sin uso por ahora
   this.drawFn =  function(fn, context)
   {
      fn(context);
   }

}

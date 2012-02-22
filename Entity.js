

/*
Clase base para las entidades a dibujar
 */

function Entity(x, y, z)
{
   this.x = x;
   this.y = y;
   this.zdepth = z;
   
   // return this; Sin uso por ahora
   this.drawFn =  function(fn, context)
   {
      fn(context);
   }

}

function FatherEntityImage(xsFather,ysFather, xsdFather, ysdFather){
    this.xsFather = xsFather;
    this.ysFather = ysFather;
    this.xsdFather = xsdFather;
    this.ysdFather = ysdFather;
}


// Orientación

var NORTH = 1,
EAST = 2,
SOUTH = 3,
WEST = 4,
NONE = 0;

/*
Clase que representa las propiedades de un escenario con scrolling
Sin uso hasta verificar, cómo acceder a los atributos del objeto al pasarlo como parámetro en otra clase.
 */
function StageEntity(widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage)
{
   this.widthScroll = widthScroll;
   this.heightScroll = heightScroll;
   this.xScroll = xs;
   this.yScroll = ys;
   this.xAxisd = xsd;
   this.yAxisd = ysd;
   this.widthStage = widthStage;
   this.heightStage = heightStage;
}


/*
Clase que representa a una entidad con imagen. Extiende de la clase Entity
Parámetros
src = path de la imagen a pintar
x, y = coordenadas en la que se pintará la imagen dentro del canvas
widthScroll, heightScroll = ancho y alto de selección de la imagen a pintar
xs, ys = coordenadar de la imagen en la que comienza la selección
xsd, ysd = aumento para cada coordenada en la que se desplaza dentro de la imagen
widthStage, heightStage = ancho y alto de la imagen
update = true si el objeto requiere actulización
scroll = true si el objeto funciona con scroll
autoScroll = true si el objeto se deplaza automanticamente sin la enceisas de intervención continua del teclado
 */
function EntityImageBase(src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage)
{
   // Constructor de la clase padre
   Entity.call(this, x, y, z);
   this.image = new Image();
   this.image.src = src;
   this.widthScroll = widthScroll;
   this.heightScroll = heightScroll;
   this.xScroll = xs;
   this.yScroll = ys;
   this.xAxisd = xsd;
   this.yAxisd = ysd;
   this.widthStage = widthStage;
   this.heightStage = heightStage;
   this.maxWStage = widthStage - widthScroll;
   this.maxHStage = heightStage - heightScroll;

   if (this.maxWStage < 0 || this.maxHStage < 0)
   {
      throw "El área de scrolling es menor que la imágen a recorrer";
   }

   this.draw = function (context)
   {

      context.drawImage(this.image, this.xScroll, this.yScroll, this.widthScroll, this.heightScroll, this.x, this.y, this.widthScroll, this.heightScroll);
      
   }
   
   this.drawCoordinates = function (context,px,py)
   {
      context.save();
      context.fillStyle = 'rgb(255,255,255)';
      context.font = 'bold 10px sans-serif';
      context.fillText('P-z,x,y ' + this.zdepth + ',' + this.xScroll + ',' + this.yScroll , px, py);
      context.restore();
   }

}

// Extiendo de Entity
EntityImageBase.prototype = new Entity();

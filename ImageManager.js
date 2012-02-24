function ImageManager()
{
   this.images = null;
   

   this.initImageManager = function()
   {
      this.images = new Array();
     
      return this;
   }

   this.addImage =  function (image)
   {
      this.images.push(image);
   }

   this.removeImage =  function (image)
   {
   }
   
   this.getImage = function(idx){
    return this.images[idx]; 
   }

   /* ordena de forma ascencente o desdendente.
   type == 1, ascendente(default)
   type == 2, descendente
   Esto es para indicar la profundidad en la que se pinta la imagen.
   */
   this.sortImage = function(type)
   {
      if (type !== 2)
      {
         this.images.sort(function(a, b)
         {
            return a.zdepth - b.zdepth;
         }
         )
      }
      else
      {
         this.images.sort(function(a, b)
         {
            return b.zdepth - a.zdepth;
         }
         )
      }
   }

   this.cleanImage = function()
   {
   }

}

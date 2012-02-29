function ImageManager()
{
   // Cualguier objeto dibujable
   this.images = null;
   // @type ConfigStage
   this.nearStages = null;

   this.initImageManager = function()
   {
      this.images = new Array();
      this.nearStages = new Array();

      return this;
   }

   this.addImage =  function (image)
   {
      this.images.push(image);
   }

   this.addNearStages =  function (configStage)
   {
      this.nearStages.push(configStage);
   }

   this.removeImage =  function (image)
   {
   }

   this.getImage = function(idx)
   {
      return this.images[idx];
   }

   this.getNearStages = function(idx)
   {
      return this.nearStages[idx];
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

   this.findCharacter = function()
   {

      for (var i = 0; i < this.images.length; i ++ )
      {
         if (this.images[i] instanceof Character)
         {
            return this.images[i];
         }
      }
      return null;
   }

   this.findImageZero = function()
   {
      for (var i = 0; i < this.images.length; i ++ )
      {
         if (this.images[i] instanceof EntityImage)
         {
            return this.images[i];
         }
      }
      return null;
   }

   this.setCharacter = function(character)
   {
      for (var i = 0; i < this.images.length; i ++ )
      {
         if (this.images[i] instanceof Character)
         {
            this.images[i].setSimpleCharacter(character);
            return;
         }
      }
   }
   
   this.setImageZero = function(plano)
   {
      for (var i = 0; i < this.images.length; i ++ )
      {
         if (this.images[i] instanceof EntityImage)
         {
            this.images[i].xScroll = plano.x;
            this.images[i].yScroll = plano.y;
            return;
         }
      }
   }

   this.cleanImage = function()
   {
   }

}

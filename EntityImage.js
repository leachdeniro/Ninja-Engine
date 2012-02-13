/* 
    La variable direction_scrolling, es externa porque responde a un evento externo al objeto. Los valores que soporta están definidos
    en la clase EntiyImageBase valores(NORTH,EAST,SOUTH,WEST,NONE).
*/
function EntityImage(src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage, update)
{
   // Constructor de la clase padre
   EntityImageBase.call(this, src, x, y, z,widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage, update);
  
   this.update = function ()
   {
      this.move();
   }

   /* se desplaza por una imagen
   */
   this.move = function()
   {

      switch (direction_scrolling)
      {
         case NORTH :
            if ((this.yScroll - this.yAxisd) >= 0)
            {
               this.yScroll -= this.yAxisd;
            }
            else
            {
               this.yScroll = 0;
            }

            break;
         case EAST :
            if ((this.xScroll + this.xAxisd) <= (this.maxWStage - this.xAxisd))
            {
               this.xScroll += this.xAxisd;
            }
            else
            {
               this.xScroll = this.maxWStage;
            }

            break;
         case SOUTH :
            if ((this.yScroll + this.yAxisd) <= (this.maxHStage - this.yAxisd))
            {
               this.yScroll += this.yAxisd;
            }
            else
            {
               this.yScroll = this.maxHStage;
            }

            break;
         case WEST :
            if ((this.xScroll - this.xAxisd) >= 0)
            {
               this.xScroll -= this.xAxisd;
            }
            else
            {
               this.xScroll = 0;
            }

            break;
         default :
            break;
      }

   }

}

// Extiendo de Entity
EntityImage.prototype = new EntityImageBase();

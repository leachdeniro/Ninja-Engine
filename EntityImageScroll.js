// JavaScript Document
function EntityImageScroll(src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage, update, direction)
{
   // Constructor de la clase padre
   EntityImageBase.call(this, src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage, update);
   this.direction = direction;


   this.update = function()
   {
      this.move();
   }

   this.move = function()
   {

      switch (this.direction)
      {
         case NORTH :
            if ((this.yScroll - this.yAxisd) >= 0)
            {
               this.yScroll -= this.yAxisd;
            }
            else
            {
               this.yScroll = this.maxHStage;
            }

            break;
         case EAST :
            if ((this.xScroll + this.xAxisd) <= (this.maxWStage - this.xAxisd))
            {
               this.xScroll += this.xAxisd;
            }
            else
            {
               this.xScroll = 0;
            }

            break;
         case SOUTH :
            if ((this.yScroll + this.yAxisd) <= (this.maxHStage - this.yAxisd))
            {
               this.yScroll += this.yAxisd;
            }
            else
            {
               this.yScroll = 0;
            }

            break;
         case WEST :
            if ((this.xScroll - this.xAxisd) >= 0)
            {
               this.xScroll -= this.xAxisd;
            }
            else
            {
               this.xScroll = this.maxWStage;
            }

            break;
         default :
            break;
      }

   }
}

// Extiendo de Entity
EntityImageScroll.prototype = new EntityImageBase();

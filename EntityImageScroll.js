// JavaScript Document
function EntityImageScroll(src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage, direction)
{
   // Constructor de la clase padre
   EntityImageBase.call(this, src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage);
   this.direction = direction;

   this.update = function(dt)
   {
      this.move();
   }

   this.move = function(dt)
   {

      switch (this.direction)
      {
         case NORTH :
            if ((this.yScroll - this.yAxisd*dt) >= 0)
            {
               this.yScroll -= this.yAxisd*dt;
            }
            else
            {
               this.yScroll = this.maxHStage;
            }

            break;
         case EAST :
            if ((this.xScroll + this.xAxisd*dt) <= (this.maxWStage - this.xAxisd*dt))
            {
               this.xScroll += this.xAxisd*dt;
            }
            else
            {
               this.xScroll = 0;
            }

            break;
         case SOUTH :
            if ((this.yScroll + this.yAxisd*dt) <= (this.maxHStage - this.yAxisd*dt))
            {
               this.yScroll += this.yAxisd*dt;
            }
            else
            {
               this.yScroll = 0;
            }

            break;
         case WEST :
            if ((this.xScroll - this.xAxisd*dt) >= 0)
            {
               this.xScroll -= this.xAxisd*dt;
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
EntityImageScroll.prototype = new EntityImageBase("layer0.png");


function EntityImageScrollChild(src, x, y, z, widthScroll, heightScroll, xsd, ysd, widthStage, heightStage, direction)
{
   // Constructor de la clase padre
   EntityImageScroll.call(this, src, x, y, z, widthScroll, heightScroll, 0, 0, xsd, ysd, widthStage, heightStage, direction);
   this.xInit = x;
   this.yInit = y;
   this.x = this.xInit - PLANO.x;
   this.y = this.yInit - PLANO.y;

   this.update = function(dt)
   {
      this.move(dt);
      this.scroll();
   }

   this.scroll = function()
   {
         this.x = this.xInit - PLANO.x;
         this.y = this.yInit - PLANO.y;

   }
   
   
}

// Extiendo de Entity
EntityImageScrollChild.prototype = new EntityImageScroll("layer0.png");

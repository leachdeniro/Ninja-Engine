// JavaScript Document
function EntityImageScroll(src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage, direction)
{
   // Constructor de la clase padre
   EntityImageBase.call(this, src, x, y, z, widthScroll, heightScroll, xs, ys, xsd, ysd, widthStage, heightStage);
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



function EntityImageScrollChild(src, x, y, z, widthScroll, heightScroll, xsd, ysd, widthStage, heightStage, father, direction)
{
   // Constructor de la clase padre
   EntityImageScroll.call(this, src, x, y, z, widthScroll, heightScroll, 0, 0, xsd, ysd, widthStage, heightStage, direction);

   this.x -= father.xsFather;
   this.y -= father.ysFather;
   this.xsdFather = father.xsdFather;
   this.ysdFather = father.ysdFather;

   this.update = function()
   {
      this.move();
      this.scroll();
   }

   this.scroll = function()
   {
      switch (direction_scrolling)
      {
         case NORTH :
         if (limitStageY == NONE)
         {
            this.y += this.ysdFather;
         }
         break;

         case EAST :
         if (limitStageX == NONE)
         {
            // this.x -= this.xsdFather;
         }
         break;

         case SOUTH :
         if (limitStageY == NONE)
         {
            this.y -= this.ysdFather;
         }
         break;

         case WEST :
         if (limitStageX == NONE)
         {
            // this.x += this.xsdFather;
         }
         break;

         default :
         break;
      }

   }
}

// Extiendo de Entity
EntityImageScrollChild.prototype = new EntityImageScroll();


function EntityImageScrollChild2(src, x, y, z, widthScroll, heightScroll, xsd, ysd, widthStage, heightStage, direction)
{
   // Constructor de la clase padre
   EntityImageScroll.call(this, src, x, y, z, widthScroll, heightScroll, 0, 0, xsd, ysd, widthStage, heightStage, direction);
   this.xInit = x;
   this.yInit = y;
   this.x = this.xInit - X_PLANO;
   this.y = this.yInit - Y_PLANO;

   this.update = function()
   {
      this.move();
      this.scroll();
   }

   this.scroll = function()
   {
         this.x = this.xInit - X_PLANO;
         this.y = this.yInit - Y_PLANO;

   }
}

// Extiendo de Entity
EntityImageScrollChild2.prototype = new EntityImageScroll();

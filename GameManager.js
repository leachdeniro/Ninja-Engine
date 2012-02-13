var direction_scrolling = SOUTH;
// var direction_character = SOUTH;

function GameManager()
{
   this.imageManager = null;

   this.initGameManager = function()
   {
      // cargo las imagenes y objetos
      gameManager = this;


      this.imageManager = new ImageManager().initImageManager();
      this.registerKeyPress();

      // 		this.imageManager.addImage(new Stage("layer0.png", 0, 0, 5));
      this.imageManager.addImage(new EntityImage("paisaje.png", 0, 0, 1, 600, 400, 0, 0, 1, 1, 900, 650, true));
      this.imageManager.addImage(new EntityImageScroll("mar.png", 0, 50, 2, 600, 320, 0, 0, 2, 2, 1707, 320, true, EAST));
      this.imageManager.addImage(new EntityImage("arboles.png", 0, 100, 3, 600, 320, 0, 0, 4, 4, 1707, 320, true));
      this.imageManager.addImage(new Character("personaje.png", 300, 330, 4, 28, 42, 4, 7, 5, true));
      this.imageManager.addImage(new FpsCore(5, "rgb(255,255,255)"));
      this.imageManager.sortImage();


      // use setInterval to call the draw function
      // setInterval(function(){gameManager.render(); }, SECONDS_BETWEEN_FRAMES);
      setInterval(function()
      {
         gameManager.render();
      }
      , 1000 / 32);
      // this.render();

      return this;
   }

   this.render = function()
   {
      // limpio los contextos canvas
      bufferCtx.clearRect(0, 0, bufferCtx.width, bufferCtx.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (i = 0; i < this.imageManager.images.length;
      i ++ )
      {
         if (this.imageManager.images[i].isUpdate)
         {
            this.imageManager.images[i].update();
         }
      }
      direction_scrolling = NONE;
      // direction_character = NONE;

      for (i = 0; i < this.imageManager.images.length;
      i ++ )
      {
         this.imageManager.images[i].draw(bufferCtx);
      }
      // copy the back buffer to the displayed canvas
      ctx.drawImage(buffer, 0, 0);

   }

   this.registerKeyPress = function()
   {
      document.onkeydown = function (event)
      {
         var keyCode;

         if (event == null)
         {
            keyCode = window.event.keyCode;
         }
         else
         {
            keyCode = event.keyCode;
         }

         switch (keyCode)
         {
               // left
            case 37 :
               // action when pressing left key
               direction_scrolling = WEST;
               break;

               // up
            case 38 :
               // action when pressing up key
               direction_scrolling = NORTH;
               break;

               // right
            case 39 :
               // action when pressing right key
               direction_scrolling = EAST;
               break;

               // down
            case 40 :
               // action when pressing down key
               direction_scrolling = SOUTH;
               break;

            default :
               break;
         }
      }

   }

}


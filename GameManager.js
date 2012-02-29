// var direction_scrolling = NONE;// var action_character = CHARACTER_STILL;// var limitStageX = WEST;// var limitStageY = NORTH;// var limitStageX = NONE;// var limitStageY = NONE;function GameManager(){   // this.imageManager = null;   this.stages = new StageManager();   this.stage = null;   this.initGameManager = function()   {      gameManager = this;      this.stages.addStage(this.loadFirstStage());      this.stages.addStage(this.loadSecondStage());      this.load = 0;      PLANO.numStage = 1;      PLANO.limitStageX = WEST;      PLANO.limitStageY = NORTH;      PLANO.changeStage = true;            this.stage = this.stages.getStage(PLANO.numStage - 1);      setInterval(function()      {         gameManager.render();      }      , 1000 / MAXFPS);      //                   this.render();      return this;   }   this.render = function()   {      // calculate the time since the last frame      var thisFrame = new Date().getTime();      var dt = (thisFrame - this.lastFrame) / 1000;      this.lastFrame = thisFrame;      dt = 1;      if (PLANO.changeStage)      {         var character = this.stage.findCharacter();         var imageZero = this.stage.findImageZero();         if (character.idNearStage > 0)         {            var idx = character.idNearStage - 100;            var configStage = this.stage.getNearStages(idx);            PLANO.setPlano(configStage.plano);            PERSONAJE_PRINCIPAL.setSimpleCharacter(configStage.character);            this.stage = this.stages.getStage(configStage.plano.numStage - 1);            this.stage.setCharacter(configStage.character);            this.stage.setImageZero(configStage.plano);            console.log("changeStage: " + character.idNearStage + "," + idx);         }         else         {            this.stage = this.stages.getStage(PLANO.numStage - 1);                     }         this.registerKeyPress(this.stage.images);         PLANO.changeStage = false;      }      else      {         this.stage = this.stages.getStage(PLANO.numStage - 1);      }      // limpio los contextos canvas      bufferCtx.clearRect(0, 0, bufferCtx.width, bufferCtx.height);      ctx.clearRect(0, 0, canvas.width, canvas.height);      /* Actualizo los datos de las entidades */      for (i = 0; i < this.stage.images.length;      i ++ )      {         if (this.stage.images[i].update)         {            this.stage.images[i].update(dt);         }      }      /* Colisiones */      for(var i = 0; i < this.stage.images.length - 1;      i ++ )      {         for(var j = i + 1; j < this.stage.images.length;         j ++ )         {            var uno = this.stage.images[i];            var otro = this.stage.images[j];            if (uno.collision(otro))            {               uno.afterCollision(otro);               otro.afterCollision(uno);            }         }      }      /* Dibujo las entidades */      for (i = 0; i < this.stage.images.length;      i ++ )      {         this.stage.images[i].draw(bufferCtx, dt);      }      // copy the back buffer to the displayed canvas      ctx.drawImage(buffer, 0, 0);   }   this.registerKeyPressDown = function(event, images)   {      for (var x = 0; x < images.length;      x ++ )      {         if (images[x].keyDown)         {            images[x].keyDown(event);         }      }   }   this.registerKeyPressUp = function(event, images)   {      for (var x = 0; x < images.length;      x ++ )      {         if (images[x].keyUp)         {            images[x].keyUp(event);         }      }   }   this.loadFirstStage = function()   {          var inS = new Entity(50, 50);      PLANO = new Plano(0, 0, WIDTH, HEIGHT, 900, 650, 1);      PERSONAJE_PRINCIPAL = new Character("personaje.png", 50, 50, 9, 28, 42, 4, 7, 4, 3, 3, 50, 60, arrayPrincipal, inS);      // cargo las imagenes y objetos      var imageManager = new ImageManager().initImageManager();      imageManager.addImage(new Stage("layer0.png", 0, 0, 4, 900, 650, etapa2));      imageManager.addImage(new EntityImage("layer2.png", 0, 0, 1, WIDTH, HEIGHT, PLANO.x, PLANO.y, 3, 3, PLANO.wS, PLANO.hS));      imageManager.addImage(new EntityImageScrollChild("mar.png", 0, 0, 2, 900, 320, 2, 2, 1707, 320, EAST));      imageManager.addImage(new EntityImageChild("arboles.png", 0, 100, 3, 1707, 320));      imageManager.addImage(new Character("personaje.png", 50, 50, 9, 28, 42, 4, 7, 4, 3, 3, 50, 60, arrayPrincipal, inS));      var arrayRoad1 = [300, 600];      imageManager.addImage(new Enemy("enemy.png", 0, 50, 5, 48, 48, 1, 12, 4, 2, 2, 70, 70, arrayEnemy, arrayRoad1));      var arrayRoad2 = [50, 400];      imageManager.addImage(new Enemy("enemy.png", 0, 200, 6, 48, 48, 1, 12, 4, 2, 2, 70, 70, arrayEnemy, arrayRoad2));      var arrayRoad3 = [100, 500];      imageManager.addImage(new Enemy("enemy.png", 0, 300, 7, 48, 48, 1, 12, 4, 2, 2, 70, 70, arrayEnemy, arrayRoad3));      var arrayRoad4 = [600, 800];      imageManager.addImage(new Enemy("personaje.png", 0, 400, 8, 28, 42, 4, 7, 4, 4, 4, 70, 70, arrayPrincipal, arrayRoad4));      imageManager.addImage(new EntityImageChild("tunel_west.png", 820, 580, 11, 80, 70));      imageManager.addImage(new EntityImageChild("tunel_east.png", 0, 350, 12, 80, 90));      imageManager.addImage(new FpsCore(10, "rgb(255,255,255)"));      imageManager.sortImage();            //Cargo escenarios cercanos      //Primer punto      var character = new SimpleCharacter(0, 540, true,false,true,false,false,4,30);      var plano = new Plano(0, 50, WIDTH, HEIGHT, 900, 650, 2,WEST,SOUTH);      var configStage = new ConfigStage(character,plano);      imageManager.addNearStages(configStage);            //Segundo punto      character = new SimpleCharacter(820, 20, true,true,false,false,false,4,35);      plano = new Plano(50, 0, WIDTH, HEIGHT, 900, 650, 2,EAST,NORTH);      configStage = new ConfigStage(character,plano);      imageManager.addNearStages(configStage);      return imageManager;   }   this.loadSecondStage = function()   {//      PLANO.limitStageX = WEST;//      PLANO.limitStageY = NORTH;      var inS = new Entity(50, 50);      PLANO = new Plano(0, 50, WIDTH, HEIGHT, 900, 650, 2);      PERSONAJE_PRINCIPAL = new Character("personaje.png", 50, 50, 9, 28, 42, 4, 7, 4, 3, 3, 50, 60, arrayPrincipal, inS);      // cargo las imagenes y objetos      var imageManager = new ImageManager().initImageManager();      imageManager.addImage(new Stage("layer0.png", 0, 0, 4, 900, 650, etapa3));      imageManager.addImage(new EntityImage("paisaje.png", 0, 0, 1, WIDTH, HEIGHT, PLANO.x, PLANO.y, 3, 3, PLANO.wS, PLANO.hS));      imageManager.addImage(new Character("personaje.png", 50, 50, 9, 28, 42, 4, 7, 4, 3, 3, 50, 60, arrayPrincipal, inS));      var arrayRoad1 = [300, 600];      imageManager.addImage(new Enemy("enemy.png", 0, 50, 5, 48, 48, 1, 12, 4, 2, 2, 70, 70, arrayEnemy, arrayRoad1));      var arrayRoad2 = [50, 400];      imageManager.addImage(new Enemy("enemy.png", 0, 200, 6, 48, 48, 1, 12, 4, 2, 2, 70, 70, arrayEnemy, arrayRoad2));      var arrayRoad3 = [100, 500];      imageManager.addImage(new Enemy("enemy.png", 0, 300, 7, 48, 48, 1, 12, 4, 2, 2, 70, 70, arrayEnemy, arrayRoad3));      imageManager.addImage(new EntityImageChild("tunel_east.png", 0, 580, 11, 80, 70));      imageManager.addImage(new EntityImageChild("tunel_west.png", 820, 0, 12, 80, 90));      // imageManager.addImage(new EntityImageChild("tunel.png", 820, 580, 11, 80, 70));      imageManager.addImage(new FpsCore(10, "rgb(255,255,255)"));      imageManager.sortImage();                   //Cargo escenarios cercanos      //Primer punto      var character = new SimpleCharacter(820, 540, true,true,false,false,false,4,35);      var plano = new Plano(50, 50, WIDTH, HEIGHT, 900, 650, 1,EAST,SOUTH);      var configStage = new ConfigStage(character,plano);      imageManager.addNearStages(configStage);            //Segundo punto      character = new SimpleCharacter(0, 300, true,false,true,false,false,4,25);      plano = new Plano(0,50, WIDTH, HEIGHT, 900, 650, 1,WEST,SOUTH);      configStage = new ConfigStage(character,plano);      imageManager.addNearStages(configStage);      return imageManager;   }   this.registerKeyPress = function(images)   {      // Registro los eventos de teclado      gameManager = this;      document.onkeydown = function(event)      {         gameManager.registerKeyPressDown(event, images);      }      document.onkeyup = function(event)      {         gameManager.registerKeyPressUp(event, images);      }      this.load = PLANO.numStage;   }}
var stages = new StageManager();

function GameManager() {
	
	this.stage = null;
	
	this.initGameManager = function () {
		gameManager = this;
		
		PLANO = new Plano(0, 0, WIDTH, HEIGHT, 900, 650, 1);
		PERSONAJE_PRINCIPAL = new Character("personaje.png", 30, 50, 9, 28, 42, 4, 7, 4, 80, 80, 50, 60, arrayPrincipal, new Entity(50, 50));
		
		stages.addStage(loadEscenario(elements_s1, conectors_s1));
		console.log("Se han cargado los elementos s1");
		stages.addStage(loadEscenario(elements_s2, conectors_s2));
		console.log("Se han cargado los elemento s2");
		stages.addStage(loadEscenario(elements_s3, conectors_s3));
		console.log("Se han cargado los elemento s3");
		stages.addStage(loadEscenario(elements_s4, conectors_s4));
		console.log("Se han cargado los elemento s4");
		
		this.load = 0;
		PLANO.numStage = 1;
		PLANO.limitStageX = WEST;
		PLANO.limitStageY = NORTH;
		PLANO.changeStage = true;
		
		this.stage = stages.getStage(PLANO.numStage - 1);
		
		setInterval(function () {
			gameManager.render();
		}, 1000 / MAXFPS);
		//this.render();
		
		return this;
	}
	
	this.render = function () {
		
		// calculate the time since the last frame
		var thisFrame = new Date().getTime();
		var dt = (thisFrame - this.lastFrame) / 1000;
		//var dt = (thisFrame - this.lastFrame);
		this.lastFrame = thisFrame;
		//dt = 1;
		
		if (PLANO.changeStage) {
			var character = this.stage.findCharacter();
			var imageZero = this.stage.findImageZero();
			if (character.idNearStage > 0) {
				var configStage = this.stage.getNearStages(character.idNearStage);
				
				PLANO.setPlano(configStage.plano);
				PERSONAJE_PRINCIPAL.setSimpleCharacter(configStage.character);
				this.stage = stages.getStage(configStage.plano.numStage - 1);
				this.stage.setCharacter(configStage.character);
				this.stage.setImageZero(configStage.plano);
				console.log("changeStage: " + character.idNearStage + "," + character.idNearStage);
			} else {
				this.stage = stages.getStage(PLANO.numStage - 1);
				
			}
			this.registerKeyPress(this.stage.images);
			PLANO.changeStage = false;
		} else {
			this.stage = stages.getStage(PLANO.numStage - 1);
		}
		
		if (this.stage.newEntities()) {
			//console.log("newEntities");
			this.stage.pushOverEntities();
		}
		
		// limpio los contextos canvas
		bufferCtx.clearRect(0, 0, bufferCtx.width, bufferCtx.height);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		/* Actualizo los datos de las entidades */
		for (i = 0; i < this.stage.images.length;
			i++) {
			if (this.stage.images[i].update) {
				this.stage.images[i].update(dt);
			}
		}
		
		/*if (PERSONAJE_PRINCIPAL.x > 300 && PERSONAJE_PRINCIPAL.x < 350) {
			var hola = 1;
		}*/
		
		/* Colisiones */
		for (var i = 0; i < this.stage.images.length - 1;
			i++) {
			for (var j = i + 1; j < this.stage.images.length;
				j++) {
				var uno = this.stage.images[i];
				var otro = this.stage.images[j];
				if (uno.collision) {
					if (uno.collision(otro)) {
						uno.afterCollision(otro);
						otro.afterCollision(uno);
					}
				} 
			}
		}
		
		/* Dibujo las entidades */
		for (i = 0; i < this.stage.images.length;
			i++) {
			this.stage.images[i].draw(bufferCtx, dt);
		}
		//this.text(bufferCtx);
		//this.physics(bufferCtx);
		
		// copy the back buffer to the displayed canvas
		ctx.drawImage(buffer, 0, 0);
		
		//Elimino las entidades marcadas para eliminar
		this.stage.removeDeletesEntities();
	}
	
	this.text = function(ctx){
		var image = new Image();
		image.src = "monje1.png";
		ctx.drawImage(image, 20,150 , 250, 264);
		
		ctx.save();
		ctx.translate(10, 390);
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.strokeRect (0, 0, 830, 200);
        ctx.fillStyle = "rgba(0, 0, 0, .7)";
        ctx.fillRect (0, 0, 830, 200);
        ctx.fill();

        ctx.restore();
		
		ctx.save();
		ctx.translate(20, 390);
		ctx.font = "20px verdana";
		ctx.fillStyle = "rgb(255,255,255)";
		var text = "Monje: \
		Esta es la historia de un niño que se convirtió en hombre, \
		y que descubrió el motivo de la oscuridad de su corazón.";
		var text2 = "Para ello tuvo que arriesgar su vida y la de ... bueno, \
		es mejor no adelantar los hechos, siempre es mejor ... \
		descubrirlo por uno mismo. La mayor tesitura que tuvo que enfentar, \
		fue la de conservar su cordura. Mientras su búsqueda continuaba, \
		lo que descubria no era los esperado.";
		wrapText(ctx, text, 10, 40, 800, 25);
		wrapText(ctx, text2, 10, 100, 800, 25);
		ctx.restore();
	}
	
	
	
	this.registerKeyPressDown = function (event, images) {
		for (var x = 0; x < images.length;
			x++) {
			if (images[x].keyDown) {
				images[x].keyDown(event);
			}
		}
		
	}
	
	this.registerKeyPressUp = function (event, images) {
		for (var x = 0; x < images.length;
			x++) {
			if (images[x].keyUp) {
				images[x].keyUp(event);
			}
		}
		
	}
	
	this.registerKeyPress = function (images) {
		// Registro los eventos de teclado
		gameManager = this;
		document.onkeydown = function (event) {
			gameManager.registerKeyPressDown(event, images);
		}
		document.onkeyup = function (event) {
			gameManager.registerKeyPressUp(event, images);
		}
		this.load = PLANO.numStage;
		
	}
	
}

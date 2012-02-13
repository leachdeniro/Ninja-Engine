	var NORTH = 1,
	EAST = 2,
	SOUTH = 4,
	WEST = 8,
	HEAD = 16,
	TAIL = 32,
	CELL_SIZE = 20,
	PI = Math.PI,
	MAX_X = 45,
	MAX_Y = 32,
	FOOD_GROWTH = 5,
	DIRECTIONS = [NORTH, EAST, SOUTH, WEST];
	
	var snakeBits = [], //Posición de cada bit de snake
	heading, // Orientación actual de la cabeza(N/S/E/W)
	bitsToGrow, //Número de bit que faltan para crecer
	timer, // Game Loop
	food; // Posición actual de la comida
	
	/*
	Funciones utilitarias
	 */
	function bit(x, y) {
		return {
			x : x,
			y : y
		};
	}
	
	function drawBit(bit) {
		drawInCell(bit.x, bit.y, function () {
			bufferCtx.beginPath();
			bufferCtx.rect(0, 0, CELL_SIZE, CELL_SIZE);
			bufferCtx.fill();
			
		});
		
	}
	
	function drawInCell(cellX, cellY, fn) {
		/*var x = cellX * CELL_SIZE,
		y = cellY * CELL_SIZE;*/
		
		var x = cellX * 2,
		y = cellY * 2;
		
		bufferCtx.save();
		bufferCtx.translate(x, y);
		fn();
		bufferCtx.restore();
	}
	
	function placeFood() {
		var x = Math.round(Math.random() * (MAX_X - 1)),
		y = Math.round(Math.random() * (MAX_Y - 1));
		
		if (inSnake(x, y, true))
			return placeFood();
		
		food = {
			x : x,
			y : y
		};
	}
	
	function inSnake(x, y, includeHead) {
		var length = snakeBits.length,
		i = includeHead ? 0 : 1;
		
		for (; i < length; i++) {
			if (x == snakeBits[i].x && y == snakeBits[i].y)
				return true;
		}
		return false;
		
	}
	
	function registerKeyPress() {
			document.onkeydown = function (event) {
				var keyCode;
				
				if (event == null) {
					keyCode = window.event.keyCode;
				} else {
					keyCode = event.keyCode;
				}
				
				switch (keyCode) {
					// left
				case 37:
					// action when pressing left key
					heading = WEST;
					break;
					
					// up
				case 38:
					// action when pressing up key
					heading = NORTH;
					break;
					
					// right
				case 39:
					// action when pressing right key
					heading = EAST;
					break;
					
					// down
				case 40:
					// action when pressing down key
					heading = SOUTH;
					break;
					
				default:
					break;
				}
			}
			
		}
	
	/*
	Fin funciones utilitarias
	 */
	
	/*
	Función que inicializa los valores para Snake
	 */
	function startGame() {
		
		heading = EAST;
		bitsToGrow = FOOD_GROWTH;
		snakeBits.unshift(bit(10, 4));
		placeFood();
		registerKeyPress();
		
	}
	
	/*
	Definición de clases
	 */
	function Snake(z,update) {
		
		this.zdepth = z;
		this.isUpdate = update;
		
		
		
		this.update = function() {
			bufferCtx.fillStyle = "rgb(0,0,0)";
			this.advanceSnake();
			this.checkCollision();
		}
		
		this.advanceSnake = function () {
			this.head = snakeBits[0];
			switch (heading) {
			case NORTH:
				snakeBits.unshift(bit(this.head.x, this.head.y - 1));
				break;
			case SOUTH:
				snakeBits.unshift(bit(this.head.x, this.head.y + 1));
				break;
			case EAST:
				snakeBits.unshift(bit(this.head.x + 1, this.head.y));
				break;
			case WEST:
				snakeBits.unshift(bit(this.head.x - 1, this.head.y));
				break;
			}
			
			if (0 == bitsToGrow) {
				snakeBits.pop();
			} else {
				bitsToGrow--;
			}
			
		}
		
		this.checkCollision = function () {
			this.head = snakeBits[0];
			if (this.head.x == MAX_X - 1 && heading == EAST) {
				//clearInterval(timer);
				//alert('ha chocado');
				heading = SOUTH;
				//exit;
			} else if (this.head.y == MAX_Y - 1 && heading == SOUTH) {
				//alert('ha chocado');
				heading = WEST;
			} else if (this.head.x == 0 && heading == WEST) {
				//alert('ha chocado');
				heading = NORTH;
			} else if (this.head.y == 0 && heading == NORTH) {
				//alert('ha chocado');
				heading = EAST;
			} else if (this.head.x == food.x && this.head.y == food.y) {
				placeFood();
			}
			
		}
		
		this.draw = function() {
			
			var i,
			length = snakeBits.length;
			for (i = 0; i < length; i++) {
				drawBit(snakeBits[i]);
			}
		}
		
	}
	
	function Food(z,update) {
		this.zdepth = z;
		this.isUpdate = update;
		
		this.draw = function () {
			drawInCell(food.x, food.y, function () {
				bufferCtx.fillStyle = "#090";
				bufferCtx.beginPath();
				bufferCtx.arc(CELL_SIZE / 2, CELL_SIZE / 2, CELL_SIZE / 2, 0, PI * 2, false);
				bufferCtx.fill();
			});
		}
	}


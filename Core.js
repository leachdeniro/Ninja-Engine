var canvas = null;// Canvas objectvar ctx = null;// 2d Context objectvar buffer = null;var bufferCtx = null;var WIDTH = 850;// Buffer canvas widthvar HEIGHT = 600;// Buffer canvas heightvar MAXFPS = 32;var SECONDS_BETWEEN_FRAMES = 1 / MAXFPS;// Ejes de desplazamientovar DAXIS_X = 300;var DAXIS_Y = 250;function Plano(x, y, w, h, wS, hS, numStage, limitStageX, limitStageY){   this.x = x;   this.y = y;   this.w = w;   this.h = h;   this.wS = wS;   this.hS = hS;   this.numStage = numStage;   this.limitStageX = limitStageX;   this.limitStageY = limitStageY;   this.changeStage = false;   this.setPlano = function(plano)   {      this.x = plano.x;      this.y = plano.y;      this.w = plano.w;      this.h = plano.h;      this.wS = plano.wS;      this.hS = plano.hS;      this.numStage = plano.numStage;      this.limitStageX = plano.limitStageX;      this.limitStageY = plano.limitStageY;   }}var PLANO = null;// Propiedades del Personaje principalfunction Personaje(x, y, w, h, ws, hs){   this.x = x;   this.y = y;   this.w = w;   this.h = h;   this.ws = ws;   this.hs = hs;}var PERSONAJE_PRINCIPAL = null;/* Carga los elementos de un escenario   stage:  @type ImageManager   elements: arreglo de elementos a cargar   conectors: arreglo de conectores del escenario hacia otro escenario*/function loadEscenario(stage, elements, conectors){   // Cargo elementos del escenario   for (var i = 0; i < elements.length; i ++ )   {      if (elements_s1[i][0] == "Stage")      {         stage.addImage(new Stage(elements[i][1], elements[i][2], elements[i][3], elements[i][4],         elements[i][5], elements[i][6], elements[i][7]);      }      else if (elements_s1[i][0] == "EntityImage")      {         stage.addImage(new EntityImage(elements[i][1], elements[i][2], elements[i][3], elements[i][4],         elements[i][5], elements[i][6], elements[i][7], elements[i][8], elements[i][9],         elements[i][10], elements[i][11], elements[i][12]));      }      else if (elements_s1[i][0] == "EntityImageScrollChild")      {         stage.addImage(new EntityImageScrollChild(elements[i][1], elements[i][2], elements[i][3], elements[i][4],         elements[i][5], elements[i][6], elements[i][7], elements[i][8], elements[i][9],         elements[i][10], elements[i][11]));      }      else if (elements_s1[i][0] == "EntityImageChild")      {         stage.addImage(new EntityImageChild(elements[i][1], elements[i][2], elements[i][3], elements[i][4],         elements[i][5], elements[i][6]));      }      else if (elements_s1[i][0] == "Enemy")      {         stage.addImage(new Enemy(elements[i][1], elements[i][2], elements[i][3], elements[i][4],         elements[i][5], elements[i][6], elements[i][7], elements[i][8], elements[i][9],         elements[i][10], elements[i][11], elements[i][12], elements[i][13], elements[i][14], elements[i][15]));      }      else if (elements_s1[i][0] == "FpsCore")      {         stage.addImage(new FpsCore(elements[i][1], elements[i][2]));      }      else if (elements_s1[i][0] == "Character")      {         stage.addImage(new Character(elements[i][1], elements[i][2], elements[i][3], elements[i][4],         elements[i][5], elements[i][6], elements[i][7], elements[i][8], elements[i][9],         elements[i][10], elements[i][11], elements[i][12], elements[i][13], elements[i][14], elements[i][15]));      }   }   // Cargo conectores del escenario   var idx = 100;   var conecc = new Array();   for (var i = 0; i < conectors.length; i ++ )   {      if (idx != conectors[i][0])      {         var character_t = conecc[0];         var plano_t = conecc[1];         var character = new SimpleCharacter(character_t[2], character_t[3], character_t[4], character_t[5],          character_t[6], character_t[7], character_t[8], character_t[9], character_t[10]);         var plano = new Plano(plano_t[2], plano_t[3], plano_t[4], plano_t[5], plano_t[6], plano_t[7], plano_t[8], plano_t[9], plano_t[10]);         stage.addNearStages(new ConfigStage(character, plano));         conecc = new Array();         idx = conectors[i][0];      }      else      {         conecc.push(conectors[i]);      }   }}/* Punto de partida de la aplicación */window.onload = init;function init(){   // Obtengo los objetos canvas y sus contextos   canvas = document.getElementById('canvas-engine');   ctx = canvas.getContext('2d');   buffer = document.createElement('canvas');   buffer.width = canvas.width;   buffer.height = canvas.height;   bufferCtx = buffer.getContext('2d');   new GameManager().initGameManager();}// Recibe 2 valores booleanosfunction xor(a, b){   return a ? ! b : b;}
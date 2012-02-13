 /*
 Clase que cuenta los FPS
 */
function FpsCore(z,inColor)
{
    // Variables necesarias para el recuento de FPS y el cálculo del delay.
    this.frameCount = 0;
	this.currentFps = 0;
	this.drawInterval = 1 / MAXFPS * 1000;
	this.lastFps = new Date().getTime();
	this.zdepht = z;
	this.isUpdate = true;
	this.color = inColor;
	
    this.update = function()
    {
        // Calculamos el tiempo desde el último frame.
        var thisFrame = new Date().getTime();
        var diffTime = Math.ceil((thisFrame - this.lastFps));
 
        if (diffTime >= 1000) {
            this.currentFps = this.frameCount;
            this.frameCount = 0.0;
            this.lastFps = thisFrame;
        }
 
        this.frameCount++;
    }
 
    this.draw = function (context)
    {
        // Finalmente, pintamos los FPS.
        context.save();
        //context.fillStyle = '#000';
		//context.fillStyle ='rgb(255,255,255)';
		context.fillStyle = this.color;
        context.font = 'bold 10px sans-serif';
        context.fillText('FPS: ' + this.currentFps + '/' + MAXFPS, 10,15);
        context.restore();
    }
}
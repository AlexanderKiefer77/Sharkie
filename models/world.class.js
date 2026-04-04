class World {

    canvas;


    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();

    }


     draw() {
        // if (this.gameStopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
     }







}

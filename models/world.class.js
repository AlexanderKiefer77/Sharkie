class World {
    level;
    canvas;
    ctx;
    // keyboard;

    constructor(canvas, level) { // keyboard, 
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        // this.keyboard = keyboard;
        this.level = level;
        this.gameStopped = false;
        this.draw();

    }


    draw() {
        // if (this.gameStopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.level.backgroundObjects);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (!mo) return;
        // if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx); // to draw the frames
        // if (mo.otherDirection) this.flipImageBack(mo);
    }





}

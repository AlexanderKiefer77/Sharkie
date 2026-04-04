class World {
    character = new Character();
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard, level) { 
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.gameStopped = false;
        this.draw();
        this.setWorld(); // für Keyboard

    }

    setWorld() { // benutzt für keyboard
        this.character.world = this; // übergibt die aktuelle Instanz der Welt
    }

    draw() {
        // if (this.gameStopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (!mo) return;
        // if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx); // to draw the frames
        // if (mo.otherDirection) this.flipImageBack(mo);
    }





}

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
        this.character.world = this;
    }

    draw() {
        // if (this.gameStopped) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());

        // let self = this;
        // requestAnimationFrame(function () {
        //     self.draw(); // im "requestAnimationFrame" funktioniert "this" nicht, deshalb mit Hilfsvariable self
        // });
    }

   

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        // if (!mo) return;
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx); // to draw the frames
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    flipImage(mo) {
        // Speichert den aktuellen Zustand des Canvas (Position, Skalierung, Rotation)
        this.ctx.save();

        // Verschiebt den Ursprung des Canvas nach rechts um die Breite des Objekts
        // Dadurch wird das Spiegeln korrekt am Objekt ausgerichtet
        this.ctx.translate(mo.width, 0);

        // Spiegelt das Canvas horizontal
        // -1 auf der X-Achse bedeutet: alles wird nach links gespiegelt
        this.ctx.scale(-1, 1);

        // Da das Canvas gespiegelt wurde, muss auch die X-Position des Objekts invertiert werden
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        // Setzt die X-Position wieder auf den ursprünglichen Wert
        mo.x = mo.x * -1;

        // Stellt den gespeicherten Canvas-Zustand wieder her
        // (hebt translate und scale wieder auf)
        this.ctx.restore();
    }



}

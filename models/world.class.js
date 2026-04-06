
class World {
    character = new Character();
    // greenPufferFish = new GreenPufferFishes();
    // orangePufferFish = new OrangePufferFishes();
    // redPufferFish = new RedPufferFishes();
    endboss = new Endboss(this);
    fishes;
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
        this.initFishes();
        this.gameStopped = false;

        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    initFishes() {
        this.level.fishes.forEach(fishes => {
            if (this.fishes) {
                this.fishes.world = this;
                if (this.fishes.animate) fishes.animate();
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.fishes);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);

        this.addToMap(this.endboss);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    // Subfunktion wenn es mehrer Objekte vom gleichen Typ gibt, z.B. fishes
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) this.flipImageBack(mo);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
class World {
    character = new Character();
    endboss = new Endboss(this);
    bubbles = [];
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

        this.setWorld();
        this.draw();

        // kleine Verzögerung verhindert Start-Bugs
        setTimeout(() => {
            this.run();
        }, 200);
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    initFishes() {
        this.level.fishes.forEach(fish => {
            fish.world = this;
            if (fish.animate) fish.animate();
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.fishes);

        this.addToMap(this.character);
        this.addToMap(this.endboss);

        this.addObjectsToMap(this.bubbles);

        this.ctx.translate(-this.camera_x, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) this.flipImageBack();
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width / 2, mo.y + mo.height / 2);
        this.ctx.scale(-1, 1);
        this.ctx.translate(- (mo.x + mo.width / 2), - (mo.y + mo.height / 2));
    }

    flipImageBack() {
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);
    }

    checkCollisions() {
        this.level.fishes.forEach((fish) => {
            if (this.character.isColliding(fish) && !fish.isDead) {

                if (this.character.isAttacking && fish instanceof PufferFish) {
                    // console.log('Fisch besiegt!');
                    fish.die(!this.character.otherDirection); 

                    // Nach 2 Sekunden aus dem Array löschen
                    setTimeout(() => {
                        let index = this.level.fishes.indexOf(fish);
                        if (index > -1) {
                            this.level.fishes.splice(index, 1);
                        }
                    }, 2000);

                } else {
                    // Sharkie wird getroffen, falls er nicht gerade angreift
                    this.character.hit();
                }
            }
        });
    }

    // checkCollisions() {
    //     this.level.fishes.forEach((fish) => {
    //         // Wir prüfen, ob der Charakter den Fisch berührt
    //         if (this.character.isColliding(fish)) {
    //             // console.log('Kollision mit:', fish);

    //             // Hier kannst du entscheiden:
    //             // 1. Schlägt Sharkie gerade? (Fin Slap)
    //             if (this.character.isAttacking) {
    //                 // console.log('Fisch besiegt!');
    //                 // fish.hit(); // Falls Fische Leben haben
    //             } else {
    //                 this.character.hit();
    //                 // 2. Sharkie wird getroffen
    //                 // console.log('Sharkie verletzt!');
    //                 // this.character.hit(); 
    //             }
    //         }
    //     });
    // }
}


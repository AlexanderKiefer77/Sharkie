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
            this.checkBubbleCollisions();
        }, 50);
    }

    checkCollisions() {
        this.level.fishes.forEach((fish) => {
            if (this.character.isColliding(fish) && !fish.isDead) {

                if (this.character.isAttacking && this.character.attackType === 'FINSLAP' && fish instanceof PufferFish) {
                    
                    fish.die(!this.character.otherDirection);

                    // Nach 2 Sekunden aus dem Array löschen
                    setTimeout(() => {
                        let index = this.level.fishes.indexOf(fish);
                        if (index > -1) {
                            this.level.fishes.splice(index, 1);
                        }
                    }, 2000);

                } else if (!fish.isDead) {
                    // Sharkie wird getroffen, falls er nicht gerade angreift
                    this.character.hit();
                }
            }
        });
    }

    checkBubbleCollisions() {
        this.bubbles.forEach((bubble) => {
            this.level.fishes.forEach((fish) => {
                // Wir prüfen: Kollidiert Blase mit Gegner UND ist der Gegner eine Qualle?
                if (bubble.isColliding(fish) && fish instanceof JellyFish && !fish.isDead) {

                    fish.beTrapped(); // Qualle einfangen

                    // Die Blase selbst entfernen, da sie "verbraucht" wurde
                    let bIndex = this.bubbles.indexOf(bubble);
                    this.bubbles.splice(bIndex, 1);

                    // Die Qualle nach 2 Sekunden aus der Welt löschen
                    setTimeout(() => {
                        let eIndex = this.level.fishes.indexOf(fish);
                        if (eIndex > -1) {
                            this.level.fishes.splice(eIndex, 1);
                        }
                    }, 2000);
                }
            });
        });
    }

}



    // ############## für Zwischenabfrage ###########
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



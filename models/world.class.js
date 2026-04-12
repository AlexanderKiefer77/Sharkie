class World {
    character = new Character();
    endboss = new Endboss(this);
    bubbles = [];
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    // status display
    healthCharacter = 100;
    collectCoins = 0;
    collectBottles = 0;
    healthEndboss = 100;

    // point-system
    points = 0;
    pointsHurtsCharacter = 30; // points loose per hurt
    pointsCollectCoins = 10; // points per coin
    pointsCollectBottle = 10; // points per bottle
    pointsHitPufferFish = 100; // points when hitting a puffer fish with finslap
    pointsHitJellyFish = 150; // points when hitting a jelly fish with bubble
    pointsHitEndboss = 300; // points when hitting the endboss with finslap

    statusHealth = new StatusHealth();
    statusCoin = new StatusCoin();
    statusBottle = new StatusBottle();

    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.initFishes();
        this.initWorldStats();
        this.gameStopped = false;

        this.setWorld();
        this.draw();

        setTimeout(() => {
            this.run();
        }, 200);
    }

    initWorldStats() {
        this.totalCoins = this.level.coins.length;
        // this.totalBottles = this.level.bottles ? this.level.bottles.length : 0;
        // this.maxBottleCount = this.availableBottles + this.totalBottles;
    }

    setWorld() {
        this.character.world = this;
        // this.endboss.world = this;

        // Set world for coins
        if (this.level.coins) {
            this.level.coins.forEach(coin => {
                if (coin) coin.world = this;
            });
        }

        // Set world for bottles on ground
        if (this.level.bottles) {
            this.level.bottles.forEach(bottle => {
                if (bottle) bottle.world = this;
            });
        }
    }


    initFishes() {
        this.level.fishes.forEach(fish => {
            fish.world = this;
            if (fish.animate) fish.animate();
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dynamic
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        // fixed
        this.addToMap(this.statusHealth);
        this.drawHealth(55, 45);
        this.addToMap(this.statusCoin);
        this.drawCoins(140, 45);
        this.addToMap(this.statusBottle);
        this.drawBottles(225, 45);
        this.drawPoints();
        this.drawHealthEndboss(620, 45);

        // Dynamic
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
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
        this.ctx.translate(-(mo.x + mo.width / 2), -(mo.y + mo.height / 2));
    }

    flipImageBack() {
        this.ctx.restore();
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBubbleCollisions();
            this.checkCoinCollisions();
            this.checkBottleCollisions();
        }, 50);
    }

    checkCollisions() {
        this.level.fishes.forEach((fish) => {
            if (this.character.isColliding(fish) && !fish.isDead) {
                if (this.character.isAttacking && this.character.attackType === 'FINSLAP' && fish instanceof PufferFish) {
                    fish.die(!this.character.otherDirection);
                    this.addPoints(this.pointsHitPufferFish);
                    setTimeout(() => {
                        let index = this.level.fishes.indexOf(fish);
                        if (index > -1) {
                            this.level.fishes.splice(index, 1);
                        }
                    }, 2000);
                } else if (!fish.isDead) {
                    this.character.hit();
                }
            }
        });

        // Collision with the endboss
        if (this.endboss && this.character.isColliding(this.endboss)) {
            if (this.endboss.state === 'DEAD') return;

            if (this.character.isAttacking && this.character.attackType === 'FINSLAP') {
                let tookDamage = this.endboss.hit();

                if (tookDamage) {
                    this.healthEndboss -= 20; // 20% deduction per shot

                    if (this.healthEndboss <= 0) {
                        this.healthEndboss = 0;
                        this.endboss.state = 'DEAD';
                        this.endboss.currentImage = 0;
                    }
                }
            } else {
                this.character.hit();
            }
        }
    }

    checkBubbleCollisions() {
        this.bubbles.forEach((bubble) => {
            this.level.fishes.forEach((fish) => {
                if (bubble.isColliding(fish) && fish instanceof JellyFish && !fish.isDead) {
                    fish.beTrapped();
                    this.addPoints(this.pointsHitJellyFish);
                    let bIndex = this.bubbles.indexOf(bubble);
                    this.bubbles.splice(bIndex, 1);
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

    checkCoinCollisions() {
        this.level.coins = this.level.coins.filter(coin => {
            if (this.character.isColliding(coin)) {
                this.collectCoins++;
                // this.playCoinSound();
                this.addPoints(this.pointsCollectCoins);
                return false;
            }
            return true;
        });
    }

    checkBottleCollisions() {
        if (!this.level.bottles) return;
        this.level.bottles = this.level.bottles.filter(bottle => {
            if (this.character.isColliding(bottle)) {
                this.collectBottles++;
                // this.playBottleSound();
                this.addPoints(this.pointsCollectBottle);
                return false;
            }
            return true;
        });
    }

    drawHealth(x, y) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.font = 'bold 1.2rem Calibri';
        this.ctx.textAlign = 'left';
        let health = this.healthCharacter;
        this.ctx.fillText(`${health}`, x, y);
    }

    drawCoins(x, y) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.font = 'bold 1.2rem Calibri';
        this.ctx.textAlign = 'left';
        let coins = this.collectCoins;
        this.ctx.fillText(`${coins}`, x, y);
    }

    drawBottles(x, y) {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.font = 'bold 1.2rem Calibri';
        this.ctx.textAlign = 'left';
        let bottles = this.collectBottles;
        this.ctx.fillText(`${bottles}`, x, y);
    }

    addPoints(amount) {
        if (!this.points) this.points = 0;
        this.points = Math.max(0, this.points + amount);
    }

    drawPoints() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.font = 'bold 1.5rem Calibri';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${this.points} Punkte`, this.canvas.width / 2, 45);
    }

    drawHealthEndboss(x, y) {
        this.ctx.fillStyle = 'rgba(54, 3, 3, 0.98)';
        this.ctx.font = 'bold 1.5rem Calibri';
        this.ctx.textAlign = 'center';
        let energy = this.healthEndboss;
        this.ctx.fillText(`Endboss ${energy} %`, x, y);
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


}
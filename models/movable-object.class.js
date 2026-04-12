
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0; // for Gravity
    acceleration = 0.4;
    lastHit = 0;
    state = 'IDLE'; // IDLE | IDLE_LONG | SLEEP

    sharkie_start_animation = true;
    endboss_start_animation = true;

    // Default values ​​for all moving objects
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    applyGravity() {
        setInterval(() => {
            if (this.sharkie_start_animation && this.y < 180) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit(enemy) {
        if (this.isHurt()) return;

        if (this.world) {
            this.world.healthCharacter -= 10;
            this.world.addPoints(-this.world.pointsHurtsCharacter);

            if (this.world.healthCharacter < 0) {
                this.world.healthCharacter = 0;
            }

            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 4000;
    }

    // isHurt() {
    //     let timepassed = Date.now() - this.lastHit; // Zeit seit letztem Treffer
    //     timepassed = timepassed / 1000; // Umrechnung in Sekunden
    //     return timepassed < 1; // Gibt true zurück, wenn der Treffer weniger als 1 Sekunde her ist
    // }

    isDead() {        
        return this.energy === 0;
    }

    playAnimation(images, loop = true) {
        let i = this.currentImage;

        if (i >= images.length) {
            if (loop) {
                this.currentImage = 0;
                i = 0;
            } else {
                return;
            }
        }

        let path = images[i];
        this.img = this.imageCache[path];

        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    moveUp() {
        this.sharkie_start_animation = false;
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }


}

class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0; // for Gravity
    acceleration = 0.4;

    state = 'IDLE'; // IDLE | IDLE_LONG | SLEEP
    
    sharkie_start_animation = true;
    endboss_start_animation = true;

    applyGravity() {
        setInterval(() => {
            // if (this.sharkie_start_animation && this.isAboveGround() || this.speedY > 0) {  // "this.speedY > 0" wird verwendet, zum springen vom Boden aus für den Character+
             if (this.sharkie_start_animation && this.y < 200) { 
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            }, 1000 / 25);
    }

    isAboveGround() { // Subfunktion für applyGravity
        // if (this instanceof ThrowableObject) { // damit die Flasche weiter nach unten fällt
        //     return true;
        // } else {
            return this.y < 200; // fällt nur bis zu dem Punkt
        // }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        // this.currentImage = (this.currentImage + 1) % images.length;
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

    drawFrame(ctx) { // in drawable-object.class.js verschoben
        // Zeichnet Rechteck um die Elemente
        if (this instanceof Character || this instanceof Endboss) { //  || this instanceof Chicken || this instanceof Endboss
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }
}
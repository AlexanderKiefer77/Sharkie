
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;

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
        this.y -= this.speed;
    }

    moveDown() {
        this.y += this.speed;
    }

    drawFrame(ctx) { // in drawable-object.class.js verschoben
        // Zeichnet Rechteck um die Elemente
        if (this instanceof Character) { //  || this instanceof Chicken || this instanceof Endboss
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
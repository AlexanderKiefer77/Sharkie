
class Bubble extends MovableObject {
    width = 40;
    height = 40;
    speedY = 1.2;
    hasHit = false;

    IMAGES_NORMAL = ['./assets/img/Sharkie/Attack/Bubble trap/Bubble.png'];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_NORMAL[0]);
        this.x = x;
        this.y = y;
        this.rise();
    }

    rise() {
        setInterval(() => {
            this.y -= this.speedY;
        }, 1000 / 60);
    }

}

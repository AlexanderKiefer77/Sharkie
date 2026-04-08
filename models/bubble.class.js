
class Bubble extends MovableObject {
    width = 40;
    height = 40;
    speedY = 1;
    hasHit = false;

    IMAGES_NORMAL = ['./assets/img/1.Sharkie/4.Attack/Bubble trap/Bubble.png'];
    // Hier die Bilder einfügen, wenn eine Qualle gefangen ist
    IMAGES_TRAPPED = [
        './assets/img/2.Enemy/jelly-fish/dead/yellow/y1.png',
        './assets/img/2.Enemy/jelly-fish/dead/yellow/y2.png',
        './assets/img/2.Enemy/jelly-fish/dead/yellow/y3.png',
        './assets/img/2.Enemy/jelly-fish/dead/yellow/y4.png'
    ]; 

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_NORMAL[0]);
        this.loadImages(this.IMAGES_TRAPPED);
        this.x = x;
        this.y = y;
        this.rise();
    }

    rise() {
        setInterval(() => {
            if (!this.hasHit) {
                this.y -= this.speedY;
            } else {
                this.y -= this.speedY * 1.5;
            }
        }, 1000 / 60);
    }

    onHit() {
    this.hasHit = true;
    // Damit die Animation der gefangenen Qualle geloopt wird:
    setInterval(() => {
        this.playAnimation(this.IMAGES_TRAPPED);
    }, 150);
}
}
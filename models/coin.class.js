class Coin extends MovableObject {
    height = 25;
    width = 25;

    offset = {
        top: 25,
        bottom: 25,
        left: 25,
        right: 25
    };

    IMAGES_COIN = [
        './assets/img/Sonstiges/Coin.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);

        this.x = x;
        this.y = y;

        this.animate();
    }

    animate() {
        // this.setStoppableInterval(() => {
        // if (this.world?.isPaused) return;
        this.playAnimation(this.IMAGES_COIN);
        // }, 300);
    }
}

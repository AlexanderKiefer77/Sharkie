class Bottle extends MovableObject {

    y = 370;
    width = 50;
    height = 60;

    offset = {
        top: 22,
        left: 5,
        right: 5,
        bottom: 5
    };

    IMAGES_BOTTLE = [
        './assets/img/Sonstiges/Bottle-Left.png',
        './assets/img/Sonstiges/Bottle-Right.png'
    ];

    constructor(x) {
        super();
        this.loadImage(this.IMAGES_BOTTLE[0]);
        this.loadImages(this.IMAGES_BOTTLE);

        this.x = x || 300 + Math.random() * 3000;

        this.animate();
    }

    animate() {
       setInterval(() => {
            // if (this.world?.isPaused) return;
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 700);
    }
}
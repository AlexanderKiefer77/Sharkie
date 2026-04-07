
class OrangePufferFishes extends MovableObject {
   
    height = 40;
    width = 50;

    offset = {
        top: 0,
        bottom: 10,
        left: 2,
        right: 2
    };

    // puffer-fish
    IMAGES_SWIMMING_ORANGE = [
        './assets/img/2.Enemy/puffer-fish/Orange/swim/1.png',
        './assets/img/2.Enemy/puffer-fish/Orange/swim/2.png',
        './assets/img/2.Enemy/puffer-fish/Orange/swim/3.png',
        './assets/img/2.Enemy/puffer-fish/Orange/swim/4.png',
        './assets/img/2.Enemy/puffer-fish/Orange/swim/5.png'
    ];

    IMAGES_BUBBLESWIMM_ORANGE = [
        './assets/img/2.Enemy/puffer-fish/Orange/bubbleeswim/1.png',
        './assets/img/2.Enemy/puffer-fish/Orange/bubbleeswim/2.png',
        './assets/img/2.Enemy/puffer-fish/Orange/bubbleeswim/3.png',
        './assets/img/2.Enemy/puffer-fish/Orange/bubbleeswim/4.png',
        './assets/img/2.Enemy/puffer-fish/Orange/bubbleeswim/5.png'
    ];

    IMAGES_TRANSITION_ORANGE = [
        './assets/img/2.Enemy/puffer-fish/Orange/transition/1.png',
        './assets/img/2.Enemy/puffer-fish/Orange/transition/2.png',
        './assets/img/2.Enemy/puffer-fish/Orange/transition/3.png',
        './assets/img/2.Enemy/puffer-fish/Orange/transition/4.png',
        './assets/img/2.Enemy/puffer-fish/Orange/transition/5.png',
    ];

    IMAGES_DEAD_ORANGE = [
        './assets/img/2.Enemy/puffer-fish/Orange/die/1.png'
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING_ORANGE[0]);
        this.loadImages(this.IMAGES_SWIMMING_ORANGE);
        this.loadImages(this.IMAGES_BUBBLESWIMM_ORANGE);
        this.loadImages(this.IMAGES_TRANSITION_ORANGE);
        this.loadImages(this.IMAGES_DEAD_ORANGE);

        this.x = 300 + Math.random() * 3600;
        this.y = 50 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.3;

        this.animate();
    }

    animate() { 
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        // Animation der Bilder Chicken
        setInterval(() => {
            // in eigenen Funktion in movable-object.class.js verschoben
            // let path = this.IMAGES_WALKING[this.currentImage];
            // this.img = this.imageCache[path];
            // this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
            this.playAnimation(this.IMAGES_SWIMMING_ORANGE);
        }, 250);
    }
}
class GreenPufferFishes extends MovableObject {
   
    height = 40;
    width = 50;

    offset = {
        top: 0,
        bottom: 10,
        left: 2,
        right: 2
    };

    // puffer-fish
    IMAGES_SWIMMING_GREEN = [
        './assets/img/2.Enemy/puffer-fish/Green/swim/1.png',
        './assets/img/2.Enemy/puffer-fish/Green/swim/2.png',
        './assets/img/2.Enemy/puffer-fish/Green/swim/3.png',
        './assets/img/2.Enemy/puffer-fish/Green/swim/4.png',
        './assets/img/2.Enemy/puffer-fish/Green/swim/5.png'
    ];

    IMAGES_BUBBLESWIMM_GREEN = [
        './assets/img/2.Enemy/puffer-fish/Green/bubbleeswim/1.png',
        './assets/img/2.Enemy/puffer-fish/Green/bubbleeswim/2.png',
        './assets/img/2.Enemy/puffer-fish/Green/bubbleeswim/3.png',
        './assets/img/2.Enemy/puffer-fish/Green/bubbleeswim/4.png',
        './assets/img/2.Enemy/puffer-fish/Green/bubbleeswim/5.png'
    ];

    IMAGES_TRANSITION_GREEN = [
        './assets/img/2.Enemy/puffer-fish/Green/transition/1.png',
        './assets/img/2.Enemy/puffer-fish/Green/transition/2.png',
        './assets/img/2.Enemy/puffer-fish/Green/transition/3.png',
        './assets/img/2.Enemy/puffer-fish/Green/transition/4.png',
        './assets/img/2.Enemy/puffer-fish/Green/transition/5.png',
    ];

    IMAGES_DEAD_GREEN = [
        './assets/img/2.Enemy/puffer-fish/Green/die/1.png'
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING_GREEN[0]);
        this.loadImages(this.IMAGES_SWIMMING_GREEN);
        this.loadImages(this.IMAGES_BUBBLESWIMM_GREEN);
        this.loadImages(this.IMAGES_TRANSITION_GREEN);
        this.loadImages(this.IMAGES_DEAD_GREEN);

        this.x = 300 + Math.random() * 3500;
        this.y = 50 + Math.random() * 400;
        this.speed = 0.15 + Math.random() * 0.25;

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
            this.playAnimation(this.IMAGES_SWIMMING_GREEN);
        }, 250);
    }
}
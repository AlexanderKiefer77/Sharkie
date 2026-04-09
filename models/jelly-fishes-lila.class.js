
class LilaJellyFishes extends MovableObject {
   
    height = 30;
    width = 40;

    offset = {
        top: 0,
        bottom: 0,
        left: 2,
        right: 2
    };

    
    IMAGES_SWIMMING_LILA = [
        './assets/img/2.Enemy/jelly-fish/swim/Lila 1.png',
        './assets/img/2.Enemy/jelly-fish/swim/Lila 2.png',
        './assets/img/2.Enemy/jelly-fish/swim/Lila 3.png',
        './assets/img/2.Enemy/jelly-fish/swim/Lila 4.png'
    ]

    IMAGES_DANGEROUS_GREEN = [
        './assets/img/2.Enemy/jelly-fish/dangerous/Green 1.png',
        './assets/img/2.Enemy/jelly-fish/dangerous/Green 2.png',
        './assets/img/2.Enemy/jelly-fish/dangerous/Green 3.png',
        './assets/img/2.Enemy/jelly-fish/dangerous/Green 4.png'
    ];

    IMAGES_DEAD_LILA = [
        './assets/img/2.Enemy/jelly-fish/dead/Lila/L1.png',
        './assets/img/2.Enemy/jelly-fish/dead/Lila/L2.png',
        './assets/img/2.Enemy/jelly-fish/dead/Lila/L3.png',
        './assets/img/2.Enemy/jelly-fish/dead/Lila/L4.png'
    ];


    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_SWIMMING_LILA[0]);
        this.loadImages(this.IMAGES_SWIMMING_LILA);
        this.loadImages(this.IMAGES_DANGEROUS_GREEN);
        this.loadImages(this.IMAGES_DEAD_LILA);

        this.x = x;
        this.y = y;

        // this.x = 300 + Math.random() * 3600;
        // this.y = 450;
        this.speed = 0.15 + Math.random() * 0.15;

        this.animate();
    }

    animate() { 
        setInterval(() => {
            this.moveUp();
        }, 1000 / 60);

        // Animation der Bilder Chicken
        setInterval(() => {
            // in eigenen Funktion in movable-object.class.js verschoben
            // let path = this.IMAGES_WALKING[this.currentImage];
            // this.img = this.imageCache[path];
            // this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
            this.playAnimation(this.IMAGES_SWIMMING_LILA);
        }, 250);
    }
}
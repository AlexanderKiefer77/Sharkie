
class YellowJellyFishes extends MovableObject {
   
    height = 30;
    width = 40;

    offset = {
        top: 0,
        bottom: 0,
        left: 2,
        right: 2
    };

    
    IMAGES_SWIMMING_YELLOW = [
        './assets/img/2.Enemy/jelly-fish/swim/Yellow 1.png',
        './assets/img/2.Enemy/jelly-fish/swim/Yellow 2.png',
        './assets/img/2.Enemy/jelly-fish/swim/Yellow 3.png',
        './assets/img/2.Enemy/jelly-fish/swim/Yellow 4.png'
    ]

    IMAGES_DANGEROUS_PINK = [
        './assets/img/2.Enemy/jelly-fish/dangerous/Pink 1.png',
        './assets/img/2.Enemy/jelly-fish/dangerous/Pink 2.png',
        './assets/img/2.Enemy/jelly-fish/dangerous/Pink 3.png',
        './assets/img/2.Enemy/jelly-fish/dangerous/Pink 4.png'
    ];

    IMAGES_DEAD_YELLOW = [
        './assets/img/2.Enemy/jelly-fish/dead/yellow/y1.png',
        './assets/img/2.Enemy/jelly-fish/dead/yellow/y2.png',
        './assets/img/2.Enemy/jelly-fish/dead/yellow/y3.png',
        './assets/img/2.Enemy/jelly-fish/dead/yellow/y4.png'
    ];


    constructor() {
        super();
        this.loadImage(this.IMAGES_SWIMMING_YELLOW[0]);
        this.loadImages(this.IMAGES_SWIMMING_YELLOW);
        this.loadImages(this.IMAGES_DANGEROUS_PINK);
        this.loadImages(this.IMAGES_DEAD_YELLOW);

        this.x = 300 + Math.random() * 3600;
        this.y = 450;
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
            this.playAnimation(this.IMAGES_SWIMMING_YELLOW);
        }, 250);
    }
}
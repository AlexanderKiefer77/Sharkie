

class JellyFish extends MovableObject {
    height = 30;
    width = 40;

    IMAGES_SWIMMING = [];
    IMAGES_BUBBLESWIMM = [];
    IMAGES_TRANSITION = [];
    IMAGES_DEAD = [];

    offset = { top: 0, bottom: 0, left: 2, right: 2 };

    isDead = false;

    /**
     * @param {string} type - 'Lila' or 'Yellow'
     * @param {number} x - Startposition X
     * @param {number} y - Startposition Y
     */
    constructor(type, x, y) {
        super();
        this.setImages(type);

        this.loadImage(this.IMAGES_SWIMMING[0]);
        this.loadAllImages();

        this.x = x;
        this.y = y;
        this.speed = 0.1 + Math.random() * 0.3;

        this.animate();
    }

    setImages(type) {
        // Basic Paths for Swim
        this.IMAGES_SWIMMING = [
            `./assets/img/Fishes/jelly-fish/swim/${type} 1.png`,
            `./assets/img/Fishes/jelly-fish/swim/${type} 2.png`,
            `./assets/img/Fishes/jelly-fish/swim/${type} 3.png`,
            `./assets/img/Fishes/jelly-fish/swim/${type} 4.png`
        ];

        // Mapping for the "Dangerous" color
        let dangerColor = type === 'Lila' ? 'Green' : 'Pink';
        this.IMAGES_DANGEROUS = [
            `./assets/img/Fishes/jelly-fish/dangerous/${dangerColor} 1.png`,
            `./assets/img/Fishes/jelly-fish/dangerous/${dangerColor} 2.png`,
            `./assets/img/Fishes/jelly-fish/dangerous/${dangerColor} 3.png`,
            `./assets/img/Fishes/jelly-fish/dangerous/${dangerColor} 4.png`
        ];

        // Paths for Dead (Purple is uppercase in the path, yellow is lowercase - we match that)
        let deadFolder = type === 'Lila' ? 'Lila' : 'yellow';
        let deadPrefix = type === 'Lila' ? 'L' : 'y';
        this.IMAGES_DEAD = [
            `./assets/img/Fishes/jelly-fish/dead/${deadFolder}/${deadPrefix}1.png`,
            `./assets/img/Fishes/jelly-fish/dead/${deadFolder}/${deadPrefix}2.png`,
            `./assets/img/Fishes/jelly-fish/dead/${deadFolder}/${deadPrefix}3.png`,
            `./assets/img/Fishes/jelly-fish/dead/${deadFolder}/${deadPrefix}4.png`
        ];
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_DANGEROUS);
        this.loadImages(this.IMAGES_DEAD);
    }

    animate() {
        this.movementInterval = setInterval(() => {
            if (!this.isDead) {
                this.moveUp();
            }
        }, 1000 / 60);

        this.animationInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 250);
    }

    beTrapped() {
        if (this.isDead) return;
        this.isDead = true;

        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);

        this.currentImage = 0;
        let trappedInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_DEAD);
        }, 100);

        this.deathMovement = setInterval(() => {
            this.y -= 2;
        }, 1000 / 60);

        setTimeout(() => {
            clearInterval(trappedInterval);
            clearInterval(this.deathMovement);
        }, 2000);
    }
}


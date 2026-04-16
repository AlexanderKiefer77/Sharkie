
class PufferFish extends MovableObject {
    height = 40;
    width = 50;

    IMAGES_SWIMMING = [];
    IMAGES_BUBBLESWIMM = [];
    IMAGES_TRANSITION = [];
    IMAGES_DEAD = [];

    offset = { top: 0, bottom: 10, left: 2, right: 2 };

    isDead = false;

    /**
     * @param {string} color - 'Green', 'Orange' or 'Red'
     * @param {number} x - Startposition X
     * @param {number} y - Startposition Y
     */
    constructor(color, x, y) {
        super();
        this.setImages(color);

        this.loadImage(this.IMAGES_SWIMMING[0]);
        this.loadAllImages();

        this.x = x;
        this.y = y;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    setImages(color) {
        // We use template literals (``) to build the paths dynamically
        const basePath = `./assets/img/Fishes/puffer-fish/${color}`;

        this.IMAGES_SWIMMING = [
            `${basePath}/swim/1.png`, `${basePath}/swim/2.png`, `${basePath}/swim/3.png`,
            `${basePath}/swim/4.png`, `${basePath}/swim/5.png`
        ];

        this.IMAGES_BUBBLESWIMM = [
            `${basePath}/bubbleeswim/1.png`, `${basePath}/bubbleeswim/2.png`, `${basePath}/bubbleeswim/3.png`,
            `${basePath}/bubbleeswim/4.png`, `${basePath}/bubbleeswim/5.png`
        ];

        this.IMAGES_TRANSITION = [
            `${basePath}/transition/1.png`, `${basePath}/transition/2.png`, `${basePath}/transition/3.png`,
            `${basePath}/transition/4.png`, `${basePath}/transition/5.png`
        ];

        this.IMAGES_DEAD = [`${basePath}/die/1.png`, `${basePath}/die/2.png`, `${basePath}/die/3.png`];
    }

    loadAllImages() {
        this.loadImages(this.IMAGES_SWIMMING);
        this.loadImages(this.IMAGES_BUBBLESWIMM);
        this.loadImages(this.IMAGES_TRANSITION);
        this.loadImages(this.IMAGES_DEAD);
    }

    animate() {
        this.movementInterval = setStoppableInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        this.animationInterval = setStoppableInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_SWIMMING);
            }
        }, 250);
    }

    // die(hitFromLeft) {
    //     if (this.isDead) return;
    //     this.isDead = true;

    //     clearInterval(this.movementInterval);
    //     clearInterval(this.animationInterval);

    //     finSlapHitSound();
    //     whooshSound();
    //     this.currentImage = 0;
    //     this.loopCount = 0;

    //     this.deathAnimationInterval = setStoppableInterval(() => {
    //         this.deadImagesTransitions(this.deathAnimationInterval);
    //     }, 60);

    //     let horizontalFlight = hitFromLeft ? 2 : -2;
    //     this.deathMovementInterval = setStoppableInterval(() => {
    //         this.y -= 3;
    //         this.x += horizontalFlight;
    //         horizontalFlight *= 0.98;
    //     }, 1000 / 60);

    //     setTimeout(() => {
    //         if (!this.world || this.world.isPaused) return;
    //         clearInterval(this.deathMovementInterval);
    //     }, 7000);
    // }

    die(hitFromLeft) {
        if (this.isDead) return;
        this.isDead = true;

        this.resetDeathState();
        this.playDeathSounds();
        this.startDeathAnimation();
        this.startDeathMovement(hitFromLeft);
        this.scheduleDeathCleanup();
    }

    resetDeathState() {// Subfunction for die(hitFromLeft)
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);

        this.currentImage = 0;
        this.loopCount = 0;
    }

    playDeathSounds() {// Subfunction for die(hitFromLeft)
        finSlapHitSound();
        whooshSound();
    }

    startDeathAnimation() {// Subfunction for die(hitFromLeft)
        this.deathAnimationInterval = setStoppableInterval(() => {
            this.deadImagesTransitions(this.deathAnimationInterval);
        }, 60);
    }

    startDeathMovement(hitFromLeft) {// Subfunction for die(hitFromLeft)
        let horizontalFlight = hitFromLeft ? 2 : -2;

        this.deathMovementInterval = setStoppableInterval(() => {
            this.y -= 3;
            this.x += horizontalFlight;
            horizontalFlight *= 0.98;
        }, 1000 / 60);
    }

    scheduleDeathCleanup() {// Subfunction for die(hitFromLeft)
        setTimeout(() => {
            if (!this.world || this.world.isPaused) return;
            clearInterval(this.deathMovementInterval);
        }, 7000);
    }

    deadImagesTransitions(deathAnimationInterval) {// Subfunction for startDeathAnimation()
        this.playAnimation(this.IMAGES_TRANSITION);

        if (this.currentImage >= this.IMAGES_TRANSITION.length) {
            this.loopCount++;

            if (this.loopCount < 4) {
                this.currentImage = 0;
            } else {
                clearInterval(deathAnimationInterval);
                this.playAnimation(this.IMAGES_DEAD);
                this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
            }
        }
    }
}

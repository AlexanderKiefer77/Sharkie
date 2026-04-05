
class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 0;

    offset = {
        top: 135,
        bottom: 65,
        left: 15,
        right: 20
    };

    IMAGES_INTRODUCE = [
        './assets/img/2.Enemy/final-fish/Introduce/1.png',
        './assets/img/2.Enemy/final-fish/Introduce/2.png',
        './assets/img/2.Enemy/final-fish/Introduce/3.png',
        './assets/img/2.Enemy/final-fish/Introduce/4.png',
        './assets/img/2.Enemy/final-fish/Introduce/5.png',
        './assets/img/2.Enemy/final-fish/Introduce/6.png',
        './assets/img/2.Enemy/final-fish/Introduce/7.png',
        './assets/img/2.Enemy/final-fish/Introduce/8.png',
        './assets/img/2.Enemy/final-fish/Introduce/9.png',
        './assets/img/2.Enemy/final-fish/Introduce/10.png'
    ];

    IMAGES_FLOATING = [
        './assets/img/2.Enemy/final-fish/floating/1.png',
        './assets/img/2.Enemy/final-fish/floating/2.png',
        './assets/img/2.Enemy/final-fish/floating/3.png',
        './assets/img/2.Enemy/final-fish/floating/4.png',
        './assets/img/2.Enemy/final-fish/floating/5.png',
        './assets/img/2.Enemy/final-fish/floating/6.png',
        './assets/img/2.Enemy/final-fish/floating/7.png',
        './assets/img/2.Enemy/final-fish/floating/8.png',
        './assets/img/2.Enemy/final-fish/floating/9.png',
        './assets/img/2.Enemy/final-fish/floating/10.png',
        './assets/img/2.Enemy/final-fish/floating/11.png',
        './assets/img/2.Enemy/final-fish/floating/12.png',
        './assets/img/2.Enemy/final-fish/floating/13.png'
    ];

    IMAGES_ATTACK = [
        './assets/img/2.Enemy/final-fish/attack/1.png',
        './assets/img/2.Enemy/final-fish/attack/2.png',
        './assets/img/2.Enemy/final-fish/attack/3.png',
        './assets/img/2.Enemy/final-fish/attack/4.png',
        './assets/img/2.Enemy/final-fish/attack/5.png',
        './assets/img/2.Enemy/final-fish/attack/6.png'
    ];

    IMAGES_HURT = [
        './assets/img/2.Enemy/final-fish/Hurt/1.png',
        './assets/img/2.Enemy/final-fish/Hurt/2.png',
        './assets/img/2.Enemy/final-fish/Hurt/3.png',
        './assets/img/2.Enemy/final-fish/Hurt/4.png'
    ];

    IMAGES_DEAD = [
        './assets/img/2.Enemy/final-fish/Dead/Mesa de trabajo 2 copia 6.png',
        './assets/img/2.Enemy/final-fish/Dead/Mesa de trabajo 2 copia 7.png',
        './assets/img/2.Enemy/final-fish/Dead/Mesa de trabajo 2 copia 8.png',
        './assets/img/2.Enemy/final-fish/Dead/Mesa de trabajo 2 copia 9.png',
        './assets/img/2.Enemy/final-fish/Dead/Mesa de trabajo 2 copia 10.png',
    ]

    constructor(world) {
        super();

        this.world = world;

        this.loadImage(this.IMAGES_INTRODUCE[0]);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 3900;

        this.state = 'WAITING';
        this.currentImage = 0;
        this.triggered = false;

        this.animate();
    }

    animate() {
        setInterval(() => {

            if (!this.world) return;

            let cameraRight = -this.world.camera_x + this.world.canvas.width;
            
            if (!this.triggered && this.x < cameraRight) {
                this.triggered = true;
                this.state = 'INTRODUCE';
                this.currentImage = 0;
            }

            if (this.state === 'INTRODUCE') {
                this.playAnimation(this.IMAGES_INTRODUCE);

                if (this.currentImage >= this.IMAGES_INTRODUCE.length - 1) {
                    this.state = 'FLOATING';
                    this.currentImage = 0;
                }
            }

            else if (this.state === 'FLOATING') {
                this.playAnimation(this.IMAGES_FLOATING);
            }

        }, 200);
    }
}
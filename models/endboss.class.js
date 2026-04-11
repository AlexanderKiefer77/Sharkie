
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
        './assets/img/Fishes/final-fish/Introduce/1.png',
        './assets/img/Fishes/final-fish/Introduce/2.png',
        './assets/img/Fishes/final-fish/Introduce/3.png',
        './assets/img/Fishes/final-fish/Introduce/4.png',
        './assets/img/Fishes/final-fish/Introduce/5.png',
        './assets/img/Fishes/final-fish/Introduce/6.png',
        './assets/img/Fishes/final-fish/Introduce/7.png',
        './assets/img/Fishes/final-fish/Introduce/8.png',
        './assets/img/Fishes/final-fish/Introduce/9.png',
        './assets/img/Fishes/final-fish/Introduce/10.png'
    ];

    IMAGES_FLOATING = [
        './assets/img/Fishes/final-fish/floating/1.png',
        './assets/img/Fishes/final-fish/floating/2.png',
        './assets/img/Fishes/final-fish/floating/3.png',
        './assets/img/Fishes/final-fish/floating/4.png',
        './assets/img/Fishes/final-fish/floating/5.png',
        './assets/img/Fishes/final-fish/floating/6.png',
        './assets/img/Fishes/final-fish/floating/7.png',
        './assets/img/Fishes/final-fish/floating/8.png',
        './assets/img/Fishes/final-fish/floating/9.png',
        './assets/img/Fishes/final-fish/floating/10.png',
        './assets/img/Fishes/final-fish/floating/11.png',
        './assets/img/Fishes/final-fish/floating/12.png',
        './assets/img/Fishes/final-fish/floating/13.png'
    ];

    IMAGES_ATTACK = [
        './assets/img/Fishes/final-fish/attack/1.png',
        './assets/img/Fishes/final-fish/attack/2.png',
        './assets/img/Fishes/final-fish/attack/3.png',
        './assets/img/Fishes/final-fish/attack/4.png',
        './assets/img/Fishes/final-fish/attack/5.png',
        './assets/img/Fishes/final-fish/attack/6.png'
    ];

    IMAGES_HURT = [
        './assets/img/Fishes/final-fish/Hurt/1.png',
        './assets/img/Fishes/final-fish/Hurt/2.png',
        './assets/img/Fishes/final-fish/Hurt/3.png',
        './assets/img/Fishes/final-fish/Hurt/4.png'
    ];

    IMAGES_DEAD = [
        './assets/img/Fishes/final-fish/Dead/Mesa de trabajo 2 copia 6.png',
        './assets/img/Fishes/final-fish/Dead/Mesa de trabajo 2 copia 7.png',
        './assets/img/Fishes/final-fish/Dead/Mesa de trabajo 2 copia 8.png',
        './assets/img/Fishes/final-fish/Dead/Mesa de trabajo 2 copia 9.png',
        './assets/img/Fishes/final-fish/Dead/Mesa de trabajo 2 copia 10.png',
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
        this.speed = 15;
        this.state = 'WAITING';
        this.currentImage = 0;
        this.triggered = false;

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.world || !this.world.character) return;

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
            else if (this.state === 'FLOATING' || this.state === 'ATTACK') {
                this.checkAttackDistance();
            }

        }, 100);
    }

    checkAttackDistance() {
        let distance = Math.abs(this.x - this.world.character.x);

        if (distance < 450) {
            this.state = 'ATTACK';
            this.playAnimation(this.IMAGES_ATTACK);
            this.moveTowardsCharacter();
        } else {
            this.state = 'FLOATING';
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    moveTowardsCharacter() {
        let character = this.world.character;

        if (this.x > character.x) {
            this.moveLeft();
            this.otherDirection = false;
        } else if (this.x < character.x) {
            this.x += this.speed;
            this.otherDirection = true;
        }

        // We use an offset (e.g. -150) so that the boss with the head/mouth 
        // aims at Sharkie instead of just the top edge
        if (this.y > character.y - 150) {
            this.y -= this.speed;
        } else if (this.y < character.y - 50) {
            this.y += this.speed;
        }

        // so that final boss can swim further up
        if (this.y < -200) {
            this.y = -200;
        }

        // so that final boss can swim further down
        if (this.y > 200) {
            this.y = 200;
        }
    }

}
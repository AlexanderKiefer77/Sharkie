
class Character extends MovableObject {
    width = 150;
    y = 0;
    speed = 10;
    otherDirection = false;
    currentImage = 0;
    world;

    offset = {
        top: 85,
        bottom: 40,
        left: 25,
        right: 25
    };

    state = 'IDLE'; // IDLE | IDLE_LONG | SLEEP
    idleStartTime = null;
    animationFrameCount = 0;


    IMAGES_IDLE = [
        './assets/img/1.Sharkie/1.IDLE/1.png',
        './assets/img/1.Sharkie/1.IDLE/2.png',
        './assets/img/1.Sharkie/1.IDLE/3.png',
        './assets/img/1.Sharkie/1.IDLE/4.png',
        './assets/img/1.Sharkie/1.IDLE/5.png',
        './assets/img/1.Sharkie/1.IDLE/6.png',
        './assets/img/1.Sharkie/1.IDLE/7.png',
        './assets/img/1.Sharkie/1.IDLE/8.png',
        './assets/img/1.Sharkie/1.IDLE/9.png',
        './assets/img/1.Sharkie/1.IDLE/10.png',
        './assets/img/1.Sharkie/1.IDLE/11.png',
        './assets/img/1.Sharkie/1.IDLE/12.png',
        './assets/img/1.Sharkie/1.IDLE/13.png',
        './assets/img/1.Sharkie/1.IDLE/14.png',
        './assets/img/1.Sharkie/1.IDLE/15.png',
        './assets/img/1.Sharkie/1.IDLE/16.png',
        './assets/img/1.Sharkie/1.IDLE/17.png',
        './assets/img/1.Sharkie/1.IDLE/18.png'
    ];

    IMAGES_IDLE_LONG = [
        './assets/img/1.Sharkie/2.Long_IDLE/i1.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i2.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i3.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i4.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i5.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i6.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i7.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i8.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i9.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i10.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i11.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i12.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i13.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i14.png'
    ];

    IMAGES_SLEEP = [
        './assets/img/1.Sharkie/2.Long_IDLE/i11.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i12.png',
        './assets/img/1.Sharkie/2.Long_IDLE/i13.png'
    ];

    IMAGES_SWIMM = [
        './assets/img/1.Sharkie/3.Swim/1.png',
        './assets/img/1.Sharkie/3.Swim/2.png',
        './assets/img/1.Sharkie/3.Swim/3.png',
        './assets/img/1.Sharkie/3.Swim/4.png',
        './assets/img/1.Sharkie/3.Swim/5.png',
        './assets/img/1.Sharkie/3.Swim/6.png'
    ];

    // IMAGES_ATTACK = [
    //     './assets/img/2_character_pepe/3_jump/J-31.png',
    //     './assets/img/2_character_pepe/3_jump/J-32.png',
    //     './assets/img/2_character_pepe/3_jump/J-33.png',
    //     './assets/img/2_character_pepe/3_jump/J-34.png',
    //     './assets/img/2_character_pepe/3_jump/J-35.png',
    //     './assets/img/2_character_pepe/3_jump/J-36.png',
    //     './assets/img/2_character_pepe/3_jump/J-37.png',
    //     './assets/img/2_character_pepe/3_jump/J-38.png',
    //     './assets/img/2_character_pepe/3_jump/J-39.png'
    // ];

    IMAGES_HURT_POISONEND = [
        './assets/img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        './assets/img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        './assets/img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        './assets/img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        './assets/img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];

    IMAGES_HURT_ELECTRIC = [
        './assets/img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        './assets/img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        './assets/img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];

    IMAGES_DEAD_POISONEND = [
        './assets/img/1.Sharkie/6.dead/1.Poisoned/1.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/2.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/3.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/4.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/5.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/6.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/7.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/8.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/9.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/10.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/11.png',
        './assets/img/1.Sharkie/6.dead/1.Poisoned/12.png',
    ];

    IMAGES_DEAD_ELECTRIC = [
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        './assets/img/1.Sharkie/6.dead/2.Electro_shock/10.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_SLEEP[2]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_HURT_POISONEND);
        this.loadImages(this.IMAGES_HURT_ELECTRIC);
        this.loadImages(this.IMAGES_DEAD_POISONEND);
        this.loadImages(this.IMAGES_DEAD_ELECTRIC);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                // "&& this.x < this.world.level.level_end_x" verhindert, das der Character nach rechts aus dem Bild laufen kann
                this.moveRight();
                this.otherDirection = false;
                // this.walking_sound.play();
            }

            if (this.world.keyboard.LEFT && this.x > this.world.level.level_start_x) {
                this.moveLeft();
                this.otherDirection = true;
                // this.walking_sound.play();
            }

            if (this.world.keyboard.UP && this.y > 0 - this.offset.top) {
                this.moveUp();
                // this.walking_sound.play();
            }

            if (this.world.keyboard.DOWN && this.y + this.height < canvas.height + this.offset.bottom) {
                this.moveDown();
                // this.walking_sound.play();
            }

            // if (this.world.keyboard.SPACE && !this.isAboveGround()) { // zum springen vom charakter, nur wenn er auf dem Boden ist
            //     this.jump();
            // }

            this.world.camera_x = -this.x + 100; // "+ 100" Positioniert den Character in der x-Achse
        }, 1000 / 60);

        setInterval(() => {
            const isMoving =
                this.world.keyboard.RIGHT ||
                this.world.keyboard.LEFT ||
                this.world.keyboard.UP ||
                this.world.keyboard.DOWN;

            this.animationFrameCount++;

            if (isMoving) {
                this.playAnimation(this.IMAGES_SWIMM);
                this.idleStartTime = null;
                return;
            }

            if (!this.idleStartTime) {
                this.idleStartTime = Date.now();
                this.state = 'IDLE';
                this.currentImage = 0;
            }

            let elapsed = Date.now() - this.idleStartTime;

            if (this.state === 'IDLE') {
                this.playAnimation(this.IMAGES_IDLE);

                if (elapsed > 3000) {
                    this.state = 'IDLE_LONG';
                    this.currentImage = 0;
                }
            }

            else if (this.state === 'IDLE_LONG') {
                this.playAnimation(this.IMAGES_IDLE_LONG);
                if (this.currentImage >= this.IMAGES_IDLE_LONG.length - 1) {
                    this.state = 'SLEEP';
                    this.currentImage = 0;
                }
            }

            else if (this.state === 'SLEEP') {
                this.playAnimation(this.IMAGES_SLEEP);
            }

        }, 150);


    }
}

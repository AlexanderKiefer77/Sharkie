
class Character extends MovableObject {
    width = 150;
    y = 0;
    speed = 10;
    otherDirection = false;
    currentImage = 0;
    world;

    offset = {
        top: 80,
        bottom: 40,
        left: 25,
        right: 25
    };

    idleStartTime = null;
    animationFrameCount = 0;

    state = 'IDLE';
    isAttacking = false;
    canAttack = true;

    attackType = null; // save 'FINSLAP' oder 'BUBBLE'
    hurtType = 'POISON';
    isShocked = false;

    IMAGES_IDLE = [
        './assets/img/Sharkie/IDLE/1.png',
        './assets/img/Sharkie/IDLE/2.png',
        './assets/img/Sharkie/IDLE/3.png',
        './assets/img/Sharkie/IDLE/4.png',
        './assets/img/Sharkie/IDLE/5.png',
        './assets/img/Sharkie/IDLE/6.png',
        './assets/img/Sharkie/IDLE/7.png',
        './assets/img/Sharkie/IDLE/8.png',
        './assets/img/Sharkie/IDLE/9.png',
        './assets/img/Sharkie/IDLE/10.png',
        './assets/img/Sharkie/IDLE/11.png',
        './assets/img/Sharkie/IDLE/12.png',
        './assets/img/Sharkie/IDLE/13.png',
        './assets/img/Sharkie/IDLE/14.png',
        './assets/img/Sharkie/IDLE/15.png',
        './assets/img/Sharkie/IDLE/16.png',
        './assets/img/Sharkie/IDLE/17.png',
        './assets/img/Sharkie/IDLE/18.png'
    ];

    IMAGES_IDLE_LONG = [
        './assets/img/Sharkie/Long_IDLE/i1.png',
        './assets/img/Sharkie/Long_IDLE/i2.png',
        './assets/img/Sharkie/Long_IDLE/i3.png',
        './assets/img/Sharkie/Long_IDLE/i4.png',
        './assets/img/Sharkie/Long_IDLE/i5.png',
        './assets/img/Sharkie/Long_IDLE/i6.png',
        './assets/img/Sharkie/Long_IDLE/i7.png',
        './assets/img/Sharkie/Long_IDLE/i8.png',
        './assets/img/Sharkie/Long_IDLE/i9.png',
        './assets/img/Sharkie/Long_IDLE/i10.png',
        './assets/img/Sharkie/Long_IDLE/i11.png',
        './assets/img/Sharkie/Long_IDLE/i12.png',
        './assets/img/Sharkie/Long_IDLE/i13.png',
        './assets/img/Sharkie/Long_IDLE/i14.png'
    ];

    IMAGES_SLEEP = [
        './assets/img/Sharkie/Long_IDLE/i11.png',
        './assets/img/Sharkie/Long_IDLE/i12.png',
        './assets/img/Sharkie/Long_IDLE/i13.png'
    ];

    IMAGES_SWIMM = [
        './assets/img/Sharkie/Swim/1.png',
        './assets/img/Sharkie/Swim/2.png',
        './assets/img/Sharkie/Swim/3.png',
        './assets/img/Sharkie/Swim/4.png',
        './assets/img/Sharkie/Swim/5.png',
        './assets/img/Sharkie/Swim/6.png'
    ];

    IMAGES_ATTACK_FINSLAP = [
        './assets/img/Sharkie/Attack/Fin slap/1.png',
        './assets/img/Sharkie/Attack/Fin slap/2.png',
        './assets/img/Sharkie/Attack/Fin slap/3.png',
        './assets/img/Sharkie/Attack/Fin slap/4.png',
        './assets/img/Sharkie/Attack/Fin slap/5.png',
        './assets/img/Sharkie/Attack/Fin slap/6.png',
        './assets/img/Sharkie/Attack/Fin slap/7.png',
        './assets/img/Sharkie/Attack/Fin slap/8.png'
    ];

    IMAGES_ATTACK_BUBBLETRAP = [
        './assets/img/Sharkie/Attack/Bubble trap/op1/1.png',
        './assets/img/Sharkie/Attack/Bubble trap/op1/2.png',
        './assets/img/Sharkie/Attack/Bubble trap/op1/3.png',
        './assets/img/Sharkie/Attack/Bubble trap/op1/4.png',
        './assets/img/Sharkie/Attack/Bubble trap/op1/5.png',
        './assets/img/Sharkie/Attack/Bubble trap/op1/6.png',
        './assets/img/Sharkie/Attack/Bubble trap/op1/7.png',
        './assets/img/Sharkie/Attack/Bubble trap/op1/8.png'
    ]

    IMAGES_HURT_POISONEND = [
        './assets/img/Sharkie/Hurt/Poisoned/1.png',
        './assets/img/Sharkie/Hurt/Poisoned/2.png',
        './assets/img/Sharkie/Hurt/Poisoned/3.png',
        './assets/img/Sharkie/Hurt/Poisoned/4.png'
    ];

    IMAGES_HURT_ELECTRIC = [
        './assets/img/Sharkie/Hurt/Electric shock/1.png',
        './assets/img/Sharkie/Hurt/Electric shock/2.png',
        './assets/img/Sharkie/Hurt/Electric shock/3.png'
    ];

    IMAGES_DEAD_POISONEND = [
        './assets/img/Sharkie/Dead/Poisoned/1.png',
        './assets/img/Sharkie/Dead/Poisoned/2.png',
        './assets/img/Sharkie/Dead/Poisoned/3.png',
        './assets/img/Sharkie/Dead/Poisoned/4.png',
        './assets/img/Sharkie/Dead/Poisoned/5.png',
        './assets/img/Sharkie/Dead/Poisoned/6.png',
        './assets/img/Sharkie/Dead/Poisoned/7.png',
        './assets/img/Sharkie/Dead/Poisoned/8.png',
        './assets/img/Sharkie/Dead/Poisoned/9.png',
        './assets/img/Sharkie/Dead/Poisoned/10.png',
        './assets/img/Sharkie/Dead/Poisoned/11.png',
        './assets/img/Sharkie/Dead/Poisoned/12.png',
    ];

    IMAGES_DEAD_ELECTRIC = [
        './assets/img/Sharkie/Dead/Electro_shock/1.png',
        './assets/img/Sharkie/Dead/Electro_shock/2.png',
        './assets/img/Sharkie/Dead/Electro_shock/3.png',
        './assets/img/Sharkie/Dead/Electro_shock/4.png',
        './assets/img/Sharkie/Dead/Electro_shock/5.png',
        './assets/img/Sharkie/Dead/Electro_shock/6.png',
        './assets/img/Sharkie/Dead/Electro_shock/7.png',
        './assets/img/Sharkie/Dead/Electro_shock/8.png',
        './assets/img/Sharkie/Dead/Electro_shock/9.png',
        './assets/img/Sharkie/Dead/Electro_shock/10.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_SLEEP[2]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_SWIMM);
        this.loadImages(this.IMAGES_ATTACK_FINSLAP);
        this.loadImages(this.IMAGES_ATTACK_BUBBLETRAP);
        this.loadImages(this.IMAGES_HURT_POISONEND);
        this.loadImages(this.IMAGES_HURT_ELECTRIC);
        this.loadImages(this.IMAGES_DEAD_POISONEND);
        this.loadImages(this.IMAGES_DEAD_ELECTRIC);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => { // Intervall for movements
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
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

            if (this.world.keyboard.SPACE && !this.isAttacking && this.canShoot && !this.isHurt()) {
                this.finSlap();
                this.canShoot = false;
            }

            if (this.world.keyboard.D && !this.isAttacking && this.canShoot && !this.isHurt()) {
                this.bubbleTrap();
                this.canShoot = false;
            }

            if (!this.world.keyboard.D && !this.world.keyboard.SPACE) {
                this.canShoot = true;
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => { // Intervall for Animation
            if (this.isDead()) {
                this.handleDeathAnimation();
            } else if (this.isShocked || this.isHurt()) {
                this.handleHurtAnimation();
            } else if (this.isAttacking) {
                return;
            } else if (this.isMoving()) {
                this.handleSwimAnimation();
            } else {
                this.handleIdleAnimation();
            }
        }, 150);
    }

    // Subfunctions for Intervall for Animation
    handleDeathAnimation() {
        // Hier kannst du später auch nach hurtType entscheiden
        this.playAnimation(this.IMAGES_DEAD_ELECTRIC);
    }

    handleHurtAnimation() {
        if (this.isShocked || this.hurtType === 'ELECTRIC') {
            this.playAnimation(this.IMAGES_HURT_ELECTRIC);
        } else {
            this.playAnimation(this.IMAGES_HURT_POISONEND);
        }
    }

    isMoving() {
        return this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN;
    }

    handleSwimAnimation() {
        this.playAnimation(this.IMAGES_SWIMM);
        this.idleStartTime = null;
    }

    handleIdleAnimation() {
        if (!this.idleStartTime) {
            this.setInitialIdleState();
        }

        let elapsed = Date.now() - this.idleStartTime;

        if (this.state === 'IDLE') {
            this.playAnimation(this.IMAGES_IDLE);
            if (elapsed > 3000) this.changeState('IDLE_LONG');
        }
        else if (this.state === 'IDLE_LONG') {
            this.playAnimation(this.IMAGES_IDLE_LONG);
            if (this.currentImage >= this.IMAGES_IDLE_LONG.length - 1) {
                this.changeState('SLEEP');
            }
        }
        else if (this.state === 'SLEEP') {
            this.playAnimation(this.IMAGES_SLEEP);
        }
    }

    setInitialIdleState() {
        this.idleStartTime = Date.now();
        this.state = 'IDLE';
        this.currentImage = 0;
    }

    changeState(newState) {
        this.state = newState;
        this.currentImage = 0;
    }
    // end of Subfunctions for Intervall for Animation

    //################
    // setInterval(() => {// Intervall for Animation
    //     if (this.isDead()) {
    //         this.playAnimation(this.IMAGES_DEAD_ELECTRIC); // Oder DEAD_POISONEND
    //         return;
    //     }

    //     if (this.isShocked) {
    //         this.playAnimation(this.IMAGES_HURT_ELECTRIC);
    //         return;
    //     }

    //     if (this.isHurt()) {
    //         if (this.hurtType === 'ELECTRIC') {
    //             this.playAnimation(this.IMAGES_HURT_ELECTRIC);
    //         } else {
    //             this.playAnimation(this.IMAGES_HURT_POISONEND);
    //         }
    //         return;
    //     }

    //     if (this.isAttacking) {
    //         return;
    //     }

    //     const isMoving =
    //         this.world.keyboard.RIGHT ||
    //         this.world.keyboard.LEFT ||
    //         this.world.keyboard.UP ||
    //         this.world.keyboard.DOWN;

    //     this.animationFrameCount++;

    //     if (isMoving) {
    //         this.playAnimation(this.IMAGES_SWIMM);
    //         this.idleStartTime = null;
    //         return;
    //     }

    //     if (!this.idleStartTime) {
    //         this.idleStartTime = Date.now();
    //         this.state = 'IDLE';
    //         this.currentImage = 0;
    //     }

    //     let elapsed = Date.now() - this.idleStartTime;

    //     if (this.state === 'IDLE') {
    //         this.playAnimation(this.IMAGES_IDLE);

    //         if (elapsed > 3000) {
    //             this.state = 'IDLE_LONG';
    //             this.currentImage = 0;
    //         }
    //     }

    //     else if (this.state === 'IDLE_LONG') {
    //         this.playAnimation(this.IMAGES_IDLE_LONG);
    //         if (this.currentImage >= this.IMAGES_IDLE_LONG.length - 1) {
    //             this.state = 'SLEEP';
    //             this.currentImage = 0;
    //         }
    //     }

    //     else if (this.state === 'SLEEP') {
    //         this.playAnimation(this.IMAGES_SLEEP);
    //     }

    // }, 150);






    finSlap() {
        if (this.isAttacking) return;

        this.isAttacking = true;
        this.attackType = 'FINSLAP';
        let slapFrame = 0;

        this.offset = { top: 70, bottom: 40, left: 30, right: 10 };

        let interval = setInterval(() => {
            let path = this.IMAGES_ATTACK_FINSLAP[slapFrame];
            this.img = this.imageCache[path];

            slapFrame++;

            if (slapFrame >= this.IMAGES_ATTACK_FINSLAP.length) {
                clearInterval(interval);

                this.isAttacking = false;
                this.idleStartTime = Date.now();
                this.state = 'IDLE';
                this.currentImage = 0;

                this.offset = { top: 80, bottom: 40, left: 25, right: 25 };
            }
        }, 50);
    }

    bubbleTrap() {
        if (this.isAttacking) return;

        this.isAttacking = true;
        this.attackType = 'BUBBLE';
        this.currentImage = 0;

        let interval = setInterval(() => {
            this.playAnimation(this.IMAGES_ATTACK_BUBBLETRAP);

            if (this.currentImage >= this.IMAGES_ATTACK_BUBBLETRAP.length) {
                clearInterval(interval);

                this.createBubble();

                this.isAttacking = false;
                this.state = 'IDLE';
                this.idleStartTime = Date.now();
            };

        }, 40);
    }

    createBubble() {
        if (this.world && this.world.bubbles) {
            let bubbleX = this.otherDirection ? this.x : this.x + this.width - 20;
            let bubbleY = this.y + this.height / 2;
            let type = 'normal';
            let canShoot = true;

            if (this.world.endboss) {
                let distance = Math.abs(this.x - this.world.endboss.x);
                if (distance < 300) {
                    if (this.world.collectBottles > 0) {
                        this.world.collectBottles--;
                        type = 'poison';
                    } else {
                        canShoot = false;
                    }
                }
            }

            if (canShoot) {
                this.world.bubbles.push(new Bubble(bubbleX, bubbleY, type));
            }
        }
    }

    hitByJellyfish() {
        if (!this.isHurt()) {
            this.isShocked = true;
            this.hurtType = 'ELECTRIC';
            this.world.healthCharacter -= 10;
            this.lastHit = new Date().getTime();

            setTimeout(() => {
                this.isShocked = false;
            }, 1000);
        }
    }

    updateAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD_ELECTRIC);
        } else if (this.isShocked) {
            this.playAnimation(this.IMAGES_HURT_ELECTRIC);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        }
        // ... restliche Animationen (Idle, Swim, etc.)
    }

}


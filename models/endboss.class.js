class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 0;
    x = 3900;
    speed = 7;

    state = 'WAITING';
    currentImage = 0;
    triggered = false;
    animationFrameThrottle = 0;
    isHurtCooldown = false;
    trapStartY = 0;
    isFalling = false;

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
        './assets/img/Fishes/final-fish/Dead/Mesa de trabajo 2 copia 10.png'
    ];

    constructor(world) {
        super();
        this.world = world;

        this.loadImage(this.IMAGES_INTRODUCE[0]);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.bubbleImage = new Image();
        this.bubbleImage.src = './assets/img/Sharkie/Attack/Bubble trap/Poisoned Bubble.png';
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.world || !this.world.character) return;

            // Logic & Movement (always execute for fluid movement)
            this.handleStateLogic();

            // 2. Throttle animation (images only change every 2nd run = every 140ms)
            // This makes the fin movements and biting more harmonious
            this.animationFrameThrottle++;
            if (this.animationFrameThrottle % 2 === 0) {
                this.updateAnimationImages();
            }
        }, 70);
    }

    handleStateLogic() {
        if (this.state === 'DEAD') {
            this.y -= 3; // Endboss slowly floats to the surface
            return;
        }

        if (this.state === 'TRAPPED') {
            this.applyTrappedPhysics();
            return;
        }

        let cameraRight = -this.world.camera_x + this.world.canvas.width;
        if (!this.triggered && this.x < cameraRight) {
            this.triggered = true;
            this.state = 'INTRODUCE';
            this.currentImage = 0;
        }

        if (this.state === 'FLOATING' || this.state === 'ATTACK') {
            this.checkAttackDistance();
            if (this.state === 'ATTACK') {
                this.moveTowardsCharacter();
            }
        }
    }

    updateAnimationImages() {
        if (this.state === 'DEAD') {
            this.playAnimation(this.IMAGES_DEAD);
            if (this.currentImage >= this.IMAGES_DEAD.length - 1) {
                this.currentImage = this.IMAGES_DEAD.length - 1;
            }
            return;
        }

        if (this.state === 'INTRODUCE') {
            this.playAnimation(this.IMAGES_INTRODUCE);
            if (this.currentImage >= this.IMAGES_INTRODUCE.length - 1) {
                this.state = 'FLOATING';
                this.currentImage = 0;
            }
        } else if (this.state === 'ATTACK') {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.state === 'FLOATING') {
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    checkAttackDistance() {
        let distance = Math.abs(this.x - this.world.character.x);
        if (distance < 450) {
            this.state = 'ATTACK';
        } else {
            this.state = 'FLOATING';
        }
    }

    moveTowardsCharacter() {
        let character = this.world.character;
        let diffX = Math.abs(this.x - character.x);
        let targetY = character.y - 150;

        if (diffX > 10) {
            if (this.x > character.x) {
                this.moveLeft();
                this.otherDirection = false;
            } else if (this.x < character.x) {
                this.x += this.speed;
                this.otherDirection = true;
            }
        }

        if (Math.abs(this.y - targetY) > 10) {
            if (this.y > targetY) {
                this.y -= this.speed;
            } else {
                this.y += this.speed;
            }
        }

        this.applyBoundaries();
    }

    applyBoundaries() {
        // move upper limit
        if (this.y < -200) {
            this.y = -200;
        }
        // move lower limit
        if (this.y > 200) {
            this.y = 200;
        }
    }

    hit() {
        if (!this.isHurtCooldown) {
            this.isHurtCooldown = true;
            this.state = 'HURT';
            this.currentImage = 0;

            setTimeout(() => {
                this.isHurtCooldown = false;
                if (this.state === 'HURT') {
                    this.state = 'FLOATING';
                }
            }, 1000);

            return true;
        }
        return false;
    }

    beTrapped() {
        this.state = 'TRAPPED';
        this.currentImage = 0;
        this.trapStartY = this.y;
        this.isFalling = false;
    }

    updateAnimationImages() {
        if (this.state === 'DEAD') {
            this.playDeadAnimation();
            return;
        } else if (this.state === 'TRAPPED') {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.state === 'INTRODUCE') {
            this.playAnimation(this.IMAGES_INTRODUCE);
            if (this.currentImage >= this.IMAGES_INTRODUCE.length - 1) {
                this.state = 'FLOATING';
                this.currentImage = 0;
            }
        } else if (this.state === 'HURT') {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.state === 'ATTACK') {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.state === 'FLOATING') {
            this.playAnimation(this.IMAGES_FLOATING);
        }
    }

    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        if (this.currentImage >= this.IMAGES_DEAD.length - 1) {
            this.currentImage = this.IMAGES_DEAD.length - 1;
        }
    }

    applyTrappedPhysics() {
        if (!this.isFalling) {
            this.y -= 7; // Geschwindigkeit des Aufsteigens
            if (this.y < -350) { // Wenn er oben aus dem Bild ist
                this.isFalling = true;
                // Sound-Effekt für bubble platzen abspielen:
                // this.bubblePopSound.play();
                if (this.state !== 'DEAD') {
                    this.isFalling = true;
                } else {
                    // Er ist tot und oben angekommen -> hier kann er gelöscht werden
                    // oder einfach außerhalb des Sichtfelds bleiben.
                }
            }
        } else {
            this.y += 12; // Er fällt schneller, als er aufsteigt
            if (this.y >= this.trapStartY) {
                this.y = this.trapStartY; // Zurück auf Startposition
                this.state = 'FLOATING'; // Wieder normal schwimmen
                this.isFalling = false;
            }
        }
    }

    draw(ctx) {
        super.draw(ctx); // Zeichnet den Endboss selbst

        if ((this.state === 'TRAPPED' || this.state === 'DEAD') && !this.isFalling) {
            this.drawBubble(ctx);
        }
    }

    drawBubble(ctx) {
        // Nur zeichnen, wenn das Bild existiert und geladen ist
        if (this.bubbleImage && this.bubbleImage.complete) {
            let size = Math.max(this.width, this.height) * 1.2;
            let x = this.x + (this.width / 2) - (size / 2);
            let y = this.y + (this.height / 2) - (size / 2);

            ctx.drawImage(this.bubbleImage, x, y, size, size);
        }
    }
}

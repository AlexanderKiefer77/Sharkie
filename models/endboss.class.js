
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
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
        './assets/img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];

    IMAGES_FLOATING = [
        './assets/img/2.Enemy/3 Final Enemy/2.floating/1.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/2.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/3.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/4.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/5.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/6.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/7.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/8.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/9.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/10.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/11.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/12.png',
        './assets/img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    constructor(world) {
        super();

        this.world = world;

        this.loadImage(this.IMAGES_INTRODUCE[0]);
        this.loadImages(this.IMAGES_INTRODUCE);
        this.loadImages(this.IMAGES_FLOATING);

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
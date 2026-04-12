
class Bubble extends MovableObject {
    width = 40;
    height = 40;
    speedY = 1.2;
    hasHit = false;
    type;
    intervalId;

    offset = {
        top: -5,
        bottom: -5,
        left: -5,
        right: -5
    };


    IMAGES_BUBBLE_JELLYFISH = ['./assets/img/Sharkie/Attack/Bubble trap/Bubble.png'];
    IMAGES_BUBBLE_WHALE = ['./assets/img/Sharkie/Attack/Bubble trap/Poisoned Bubble.png'];

    constructor(x, y, type) {
        super();
        this.x = x;
        this.y = y;
        this.type = type;

        if (type === 'poison') {
            this.loadImage(this.IMAGES_BUBBLE_WHALE[0]);
            this.width = 60;
            this.height = 60;
            this.speedY = 3;
        } else {
            this.loadImage(this.IMAGES_BUBBLE_JELLYFISH[0]);
        }

        this.rise();
    }

    rise() {
        this.intervalId = setInterval(() => {
            this.y -= this.speedY;

            if (this.type === 'poison' && this.width < 200) {
                this.width += 3;
                this.height += 3;
            }
        }, 1000 / 60);
    }

    remove() {
        clearInterval(this.intervalId);
    }
}

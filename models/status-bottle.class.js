
class StatusBottle extends DrawableObject {

    IMAGES_STATUS_BOTTLE = [
        './assets/img/Sonstiges/status-bottle.png'
    ];

    percentage;

    constructor() {
        super();
        this.loadImage(this.IMAGES_STATUS_BOTTLE[0]);
        this.loadImages(this.IMAGES_STATUS_BOTTLE);
        this.x = 185;
        this.y = 5;
        this.width = 50;
        this.height = 50;
    }

}

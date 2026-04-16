
class StatusCoin extends DrawableObject {

    IMAGES_STATUS_COIN = [
        './assets/img/Sonstiges/status-coin.png'
    ];

    percentage;

    constructor() {
        super();
        this.loadImage(this.IMAGES_STATUS_COIN[0]);
        this.loadImages(this.IMAGES_STATUS_COIN);
        this.x = 100;
        this.y = 18;
        this.width = 40;
        this.height = 40;
    }

}

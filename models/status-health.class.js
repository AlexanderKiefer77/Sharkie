
class StatusHealth extends DrawableObject {

    IMAGES_STATUS_HEALTH = [
        './assets/img/Sonstiges/status-health.png'
    ];

    percentage;

    constructor() {
        super();
        this.loadImage(this.IMAGES_STATUS_HEALTH[0]);
        this.loadImages(this.IMAGES_STATUS_HEALTH);
        this.x = 15;
        this.y = 15;
        this.width = 40;
        this.height = 40;
    }

}

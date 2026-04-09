
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
        // this.setPercentageHealth(100);  // initial value of the status bar health
    }

    // setPercentageHealth(percentage) {
    //     this.percentage = percentage;
    //     let path = this.IMAGES_STATUSBAR_HEALTH[this.resolveImageIndex()];
    //     this.img = this.imageCache[path];
    // }
}

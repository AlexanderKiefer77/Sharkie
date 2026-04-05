class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;

    x = 100;
    y = 250;
    height = 180;
    width = 80;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
        /* for troubleshooting: Uncaught TypeError: Failed to execute 'drawImage' on 'CanvasRenderingContext2D'
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch(e) {
            console.warn('Error loading image', e);
            console.log('Could not load image, ', this.img.src);            
        }
        */
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;

    x = 100;
    y = 250;
    height = 180;
    width = 80;

    // Default-Offset
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

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

    drawFrame(ctx) { // in drawable-object.class.js verschoben
        // Zeichnet Rechteck um die Elemente
        // if (this instanceof Character ||
        //     this instanceof PufferFish ||
        //     this instanceof JellyFishes ||
        //     this instanceof Bubble ||
        //     this instanceof Endboss) {
        // draw Frames around all Elements except background
        if (!(this instanceof BackgroundObject)) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = this.isHit ? 'red' : 'blue';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

}
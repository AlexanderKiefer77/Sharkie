
class MovableObject extends DrawableObject {


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage = (this.currentImage + 1) % images.length;
        // this.currentImage++;
    }



}
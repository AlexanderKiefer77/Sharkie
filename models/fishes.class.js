// class Fishes extends MovableObject {
//     y = 360;
//     height = 60;
//     width = 70;

//     IMAGES_SWIMMING_GREEN = [
//         './assets/img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
//     ];


//     constructor() {
//         super();
//         this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
//         this.loadImages(this.IMAGES_SWIMMING);

//         this.x = 300 + Math.random() * 380; // plaziert die Chicken in einem zufälligen Bereich
//         this.speed = 0.15 + Math.random() * 0.25; // zufällige Geschwindigkeit der einzelnen Chicken

//         this.animate();
//     }

//     animate() { // für Chicken zum laufen
//         // Bewegung nach links
//         setInterval(() => {
//             this.moveLeft(); // in movable-object.class.js
//         }, 1000 / 60); // entspricht 60 FPS

//         // Animation der Bilder Chicken
//         setInterval(() => {
//             // in eigenen Funktion in movable-object.class.js verschoben
//             // let path = this.IMAGES_WALKING[this.currentImage];
//             // this.img = this.imageCache[path];
//             // this.currentImage = (this.currentImage + 1) % this.IMAGES_WALKING.length;
//             this.playAnimation(this.IMAGES_SWIMMING);
//         }, 250);
//     }
// }
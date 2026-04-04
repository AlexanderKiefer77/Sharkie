let canvas;
let world;
// let keyboard;

function init() {
    canvas = document.getElementById('canvas');
    // showStartScreen();
    let currentLevel = initLevel();
    world = new World(canvas, currentLevel); //keyboard, 
}

function showStartScreen() {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = './assets/img/3. Background/Mesa de trabajo 1.png';
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}
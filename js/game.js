let canvas;

function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();
}

function showStartScreen() {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = './assets/img/3. Background/Mesa de trabajo 1.png';
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}
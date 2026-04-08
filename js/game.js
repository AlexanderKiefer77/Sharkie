let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    // showStartScreen();
    let currentLevel = initLevel();
    world = new World(canvas, keyboard, currentLevel);
}

function showStartScreen() {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = './assets/img/3. Background/Mesa de trabajo 1.png';
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}


// Keyboard Events
window.addEventListener('keydown', (e) => {
    // if (!gameStarted) return;
    // if (e.code === 'Escape') {
    //     togglePause();
    //     return;
    // }
    if (e.code === 'ArrowLeft') keyboard.LEFT = true;
    if (e.code === 'ArrowRight') keyboard.RIGHT = true;
    if (e.code === 'ArrowUp') keyboard.UP = true;
    if (e.code === 'ArrowDown') keyboard.DOWN = true;
    if (e.code === 'Space') keyboard.SPACE = true;
    if (e.code === 'KeyD') keyboard.D = true;
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowLeft') keyboard.LEFT = false;
    if (e.code === 'ArrowRight') keyboard.RIGHT = false;
    if (e.code === 'ArrowUp') keyboard.UP = false;
    if (e.code === 'ArrowDown') keyboard.DOWN = false;
    if (e.code === 'Space') keyboard.SPACE = false;
    if (e.code === 'KeyD') keyboard.D = false;
});

// --- Mobile Steering Visibility Control ---
// function showMobileSteering() {
//     const mobileSteering = document.querySelector('.mobile-steering');
//     if (mobileSteering) mobileSteering.classList.remove('hidden');
// }

// function hideMobileSteering() {
//     const mobileSteering = document.querySelector('.mobile-steering');
//     if (mobileSteering) mobileSteering.classList.add('hidden');
// }

// Mobile Touch Events
// function initMobileControls() {
//     const mobileSteering = document.querySelector('.mobile-steering');
//     if (!mobileSteering) return;

//     const icons = mobileSteering.querySelectorAll('img');

//     icons.forEach(icon => {
//         icon.addEventListener('touchstart', (e) => {
//             e.preventDefault();

//             const src = icon.src;
//             if (src.includes('break.png')) {
//                 if (world) togglePause();
//                 return;
//             }

//             if (!gameStarted) return;

//             if (src.includes('arrow_left.png')) {
//                 keyboard.LEFT = true;
//             } else if (src.includes('arrow_right.png')) {
//                 keyboard.RIGHT = true;
//             } else if (src.includes('arrow_drop_up.png')) {
//                 keyboard.UP = true;
//             } else if (src.includes('salsa_bottle.png')) {
//                 keyboard.SPACE = true;
//             }
//         });

//         icon.addEventListener('touchend', (e) => {
//             e.preventDefault();
//             const src = icon.src;
//             if (src.includes('arrow_left.png')) {
//                 keyboard.LEFT = false;
//             } else if (src.includes('arrow_right.png')) {
//                 keyboard.RIGHT = false;
//             } else if (src.includes('arrow_drop_up.png')) {
//                 keyboard.UP = false;
//             } else if (src.includes('salsa_bottle.png')) {
//                 keyboard.SPACE = false;
//             }
//         });
//     });
// }
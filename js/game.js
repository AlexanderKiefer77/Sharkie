let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isPaused = false;
let stoppableIntervals = [];


window.masterVolume = 0.5;
let masterVolume = window.masterVolume;


function init() {
    canvas = document.getElementById('canvas');
    showStartScreen();
}

function showStartScreen() {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = './assets/img/Sonstiges/Startbild.png';
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}

function startGame() {
    let currentLevel = initLevel();

    gameStarted = true;
    canvas = document.getElementById('canvas');

    world = new World(canvas, keyboard, currentLevel);
    hideOverlays();
    initMobileControls();
    // showMobileSteering();
}

function restartGame() {
    if (world) {
        world.stopGame();
    }

    clearAllIntervals();

    gameStarted = false;
    world = null;

    hideOverlays();
    document.getElementById('startOverlay').classList.remove('hidden');
    // hideMobileSteering();

    showStartScreen();
}

function setStoppableInterval(fn, time) {
    let id = setInterval(() => {
        if (!world || !world.isPaused) {
            fn();
        }
    }, time);

    stoppableIntervals.push(id);
    return id;
}

function clearAllStoppableIntervals() {
    stoppableIntervals.forEach(id => clearInterval(id));
    stoppableIntervals = [];
}

function clearAllIntervals() {
    for (let i = 1; i < 10000; i++) {
        window.clearInterval(i);
    }
}

function openHowToPlay() {
    document.getElementById('startOverlay').classList.add('hidden');
    document.getElementById('howToPlayOverlay').classList.remove('hidden');
}

function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').classList.add('hidden');
    document.getElementById('startOverlay').classList.remove('hidden');
}


function showWinOverlay() {
    const overlay = document.getElementById('winOverlay');
    if (overlay) overlay.classList.remove('hidden');
    // hideMobileSteering();
}

function showGameOverOverlay() {
    const overlay = document.getElementById('gameOverOverlay');
    if (overlay) overlay.classList.remove('hidden');
    // hideMobileSteering();
}

function hideOverlays() {
    const overlays = ['startOverlay', 'overlayContent', 'gameOverOverlay', 'winOverlay'];
    overlays.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });
}

function setMasterVolume(value) {
    window.masterVolume = value / 100;
    masterVolume = window.masterVolume;

    const volumeValue = document.getElementById('volumeValue');
    if (volumeValue) {
        volumeValue.textContent = value + '%';
    }
}

function togglePause() {
    if (!gameStarted || !world) return;

    isPaused = !isPaused;
    const pauseOverlay = document.getElementById('pauseOverlay');

    if (isPaused) {
        world.pauseGame();
        pauseOverlay.classList.remove('hidden');
        updateScoreboard();
    } else {
        world.resumeGame();
        pauseOverlay.classList.add('hidden');
    }
}

function updateScoreboard() {
    document.getElementById('bottle-value').textContent = world.pointsCollectBottle;
    document.getElementById('coin-value').textContent = world.pointsCollectCoins;
    document.getElementById('puffer-fish-value').textContent = world.pointsHitPufferFish;
    document.getElementById('jelly-fish-value').textContent = world.pointsHitJellyFish;
    document.getElementById('endboss-finslap-value').textContent = world.pointsHitEndbossFinslap;
    document.getElementById('endboss-bubble-value').textContent = world.pointsHitEndbossBubble;
    document.getElementById('injured-pufferfish-value').textContent = '-' + world.pointsHurtsCharacter;
    document.getElementById('injured-jellyfish-value').textContent = '-' + world.pointsHurtsCharacter;
}


// Keyboard Events
window.addEventListener('keydown', (e) => {
    if (!gameStarted) return;
    if (e.code === 'Escape') {
        togglePause();
        return;
    }
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

// --- Mobile Steering Visibility Control-- -
function showMobileSteering() {
    const mobileSteering = document.querySelector('.mobile-steering');
    if (mobileSteering) mobileSteering.classList.remove('hidden');
}

function hideMobileSteering() {
    const mobileSteering = document.querySelector('.mobile-steering');
    if (mobileSteering) mobileSteering.classList.add('hidden');
}


function initMobileControls() {
    const mobileSteering = document.querySelector('.mobile-steering');
    if (!mobileSteering) return;

    const controls = mobileSteering.querySelectorAll('[data-action]');

    controls.forEach(control => {

        const startAction = (e) => {
            e.preventDefault();

            const action = control.dataset.action;
            if (!action || !gameStarted) return;

            handleActionStart(action);
        };

        const endAction = (e) => {
            e.preventDefault();

            const action = control.dataset.action;
            if (!action) return;

            handleActionEnd(action);
        };

        control.addEventListener('touchstart', startAction, { passive: false });
        control.addEventListener('touchend', endAction, { passive: false });

    });
}

function handleActionStart(action) {
    switch (action) {
        case 'LEFT':
            keyboard.LEFT = true;
            break;

        case 'RIGHT':
            keyboard.RIGHT = true;
            break;

        case 'UP':
            keyboard.UP = true;
            break;

        case 'DOWN':
            keyboard.DOWN = true;
            break;

        case 'F':
            keyboard.SPACE = true;
            break;

        case 'D':
            keyboard.D = true;
            break;

        case 'PAUSE':
            togglePause();
            break;
    }
}

function handleActionEnd(action) {
    switch (action) {
        case 'LEFT':
            keyboard.LEFT = false;
            break;

        case 'RIGHT':
            keyboard.RIGHT = false;
            break;

        case 'UP':
            keyboard.UP = false;
            break;

        case 'DOWN':
            keyboard.DOWN = false;
            break;

        case 'F':
            keyboard.SPACE = false;
            break;

        case 'D':
            keyboard.D = false;
            break;
    }
}


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
//             } else if (src.includes('arrow_up.png')) {
//                 keyboard.UP = true;
//             } else if (src.includes('arrow_down.png')) {
//                 keyboard.DOWN = true;
//             } else if (src.includes('F')) {
//                 keyboard.SPACE = true;
//             } else if (src.includes('D')) {
//                 keyboard.KeyD = true;
//             }
//         });

//         icon.addEventListener('touchend', (e) => {
//             e.preventDefault();
//             const src = icon.src;
//             if (src.includes('arrow_left.png')) {
//                 keyboard.LEFT = false;
//             } else if (src.includes('arrow_right.png')) {
//                 keyboard.RIGHT = false;
//             } else if (src.includes('arrow_up.png')) {
//                 keyboard.UP = false;
//             } else if (src.includes('arrow_down.png')) {
//                 keyboard.DOWN = false;
//             } else if (src.includes('D')) {
//                 keyboard.SPACE = false;
//             } else if (src.includes('F')) {
//                 keyboard.KeyD = false;
//             }
//         });
//     });
// }
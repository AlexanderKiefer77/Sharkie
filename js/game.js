let canvas;
let world;
let keyboard = new Keyboard();
let gameStarted = false;
let isPaused = false;

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

    // Create the world
    world = new World(canvas, keyboard, currentLevel);
    hideOverlays();
    // showMobileSteering();
    // playBackgroundMusic();
}

function restartGame() {
    // Stop all
    // if (world && world.character) {
    //     world.character.stopGame();
    // }

    // Reset status
    gameStarted = false;
    world = null;

    // Stop/Reset Music
    // background_music.pause();
    // background_music.currentTime = 0;

    // Back to startscreen
    document.getElementById('gameOverOverlay').classList.add('hidden');
    document.getElementById('winOverlay').classList.add('hidden');
    document.getElementById('startOverlay').classList.remove('hidden');
    document.getElementById('description').classList.remove('hidden');
    hideMobileSteering();

    showStartScreen();
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
    const overlays = ['startOverlay', 'overlayContent']; // , 'description', 'gameOverOverlay', 'winOverlay'
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
        // background_music.pause();
    } else {
        world.resumeGame();
        pauseOverlay.classList.add('hidden');
        // background_music.play().catch(e => {
        // console.log("Musik-Resume verhindert:", e);
        // });
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
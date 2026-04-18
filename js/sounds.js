
const sounds = {
    coin: { audio: new Audio('./assets/audio/get-coin.wav'), vol: 0.25 },
    bottle: { audio: new Audio('./assets/audio/get-bottle.mp3'), vol: 0.8 },
    hurt: { audio: new Audio('./assets/audio/hurting.mp3'), vol: 0.7 },
    electric: { audio: new Audio('./assets/audio/electric-shock.mp3'), vol: 0.8 },
    finSlap: { audio: new Audio('./assets/audio/finslap.mp3'), vol: 0.5 },
    finSlapHit: { audio: new Audio('./assets/audio/finslap-hit.mp3'), vol: 0.6 },
    bubble: { audio: new Audio('./assets/audio/bubble.mp3'), vol: 0.5 },
    bubbleEndboss: { audio: new Audio('./assets/audio/bubble-endboss.mp3'), vol: 0.5 },
    whoosh: { audio: new Audio('./assets/audio/whoosh.mp3'), vol: 0.5 },
    dead: { audio: new Audio('./assets/audio/sharkiedead.mp3'), vol: 0.5 },
    gameOver: { audio: new Audio('./assets/audio/gameover.mp3'), vol: 0.9 },
    levelFinished: { audio: new Audio('./assets/audio/level-passed.mp3'), vol: 0.9 },
    win: { audio: new Audio('./assets/audio/win.mp3'), vol: 0.8 }
};

let active_shocks = [];
let shock_timeouts = [];
let winSoundPlayCount = 0;
let winSoundTimeout = null;


function playSound(key) {
    const sound = sounds[key];
    if (!sound) return;

    if (['hurt', 'electric'].includes(key) && world?.character?.isDead()) return;

    const masterVol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    sound.audio.currentTime = 0;
    sound.audio.volume = sound.vol * masterVol;
    sound.audio.play().catch(e => console.warn("Autoplay blocked or file missing", e));
}

function playElectrikShockSound() {
    if (world?.character?.isDead()) return;
    const masterVol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    
    shock_timeouts = [];
    for (let i = 0; i < 5; i++) {
        let timeoutId = setTimeout(() => {
            if (world?.character?.isDead()) return;
            let s = sounds.electric.audio.cloneNode();
            s.volume = sounds.electric.vol * masterVol;
            s.play();
            active_shocks.push(s);
            s.onended = () => active_shocks = active_shocks.filter(item => item !== s);
        }, i * 400);
        shock_timeouts.push(timeoutId);
    }
}

function playWinSound() {
    const s = sounds.win;
    const masterVol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    
    winSoundPlayCount = 0;
    s.audio.volume = s.vol * masterVol;
    s.audio.currentTime = 0;

    const onSoundEnded = () => {
        winSoundPlayCount++;
        if (winSoundPlayCount < 2) {
            s.audio.currentTime = 0;
            s.audio.play().catch(e => console.warn("Win sound replay failed", e));
        } else {
            s.audio.removeEventListener('ended', onSoundEnded);
        }
    };

    s.audio.removeEventListener('ended', onSoundEnded);
    s.audio.addEventListener('ended', onSoundEnded);
    s.audio.play().catch(e => console.warn("Win sound initial play failed", e));
}

function isAnyHurtSoundPlaying() {
    const h = sounds.hurt.audio;
    const e = sounds.electric.audio;
    const isPlaying = (a) => a && !a.paused && !a.ended;
    return isPlaying(h) || isPlaying(e) || active_shocks.length > 0;
}

function stopAllSounds() {
    shock_timeouts.forEach(clearTimeout);
    shock_timeouts = [];

    Object.values(sounds).forEach(s => {
        s.audio.pause();
        s.audio.currentTime = 0;
        s.audio.onended = null;
    });

    active_shocks.forEach(s => {
        s.pause();
        s.src = "";
    });
    active_shocks = [];
}


const get_coin_sound = new Audio('./assets/audio/get-coin.wav');
const get_bottle_sound = new Audio('./assets/audio/get-bottle.mp3');
const character_hurt_sound = new Audio('./assets/audio/hurting.mp3');
const character_eletric_shock_sound = new Audio('./assets/audio/electric-shock.mp3');
const finSlap_sound = new Audio('./assets/audio/finslap.mp3');
const finSlap_hit_sound = new Audio('./assets/audio/finslap-hit.mp3');
const bubble_sound = new Audio('./assets/audio/bubble.mp3');
const bubble_endboss_sound = new Audio('./assets/audio/bubble-endboss.mp3');
const whoosh_sound = new Audio('./assets/audio/whoosh.mp3');
const sharkis_dead_sound = new Audio('./assets/audio/sharkiedead.mp3');
const game_over_sound = new Audio('/assets/audio/gameover.mp3');
const win_sound = new Audio('/assets/audio/win.mp3');

let active_shocks = [];
let shock_timeouts = [];

function playHurtSound() {
    character_hurt_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    character_hurt_sound.volume = 0.7 * vol;
    character_hurt_sound.play();
}

function playElectrikShockSound() {
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;

    // Wir leeren die Arrays sicherheitshalber vor dem Start
    shock_timeouts = [];

    for (let i = 0; i < 5; i++) {
        // Wir speichern die ID jedes Timeouts
        let timeoutId = setTimeout(() => {
            let s = character_eletric_shock_sound.cloneNode();
            s.volume = 0.8 * vol;
            s.play();
            active_shocks.push(s);

            s.onended = () => {
                active_shocks = active_shocks.filter(item => item !== s);
            };
        }, i * 400);

        shock_timeouts.push(timeoutId);
    }
}

function playSharkieDeadSound() {
    sharkis_dead_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    sharkis_dead_sound.volume = 0.7 * vol;
    sharkis_dead_sound.play();
}

function playCoinSound() {
    get_coin_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    get_coin_sound.volume = 0.25 * vol;
    get_coin_sound.play();
};

function playBottleSound() {
    get_bottle_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    get_bottle_sound.volume = 0.8 * vol;
    get_bottle_sound.play();
};

function finSlapSound() {
    finSlap_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    finSlap_sound.volume = 0.5 * vol;
    finSlap_sound.play();
}

function finSlapHitSound() {
    finSlap_hit_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    finSlap_hit_sound.volume = 0.6 * vol;
    finSlap_hit_sound.play();
}

function bubbleSound() {
    bubble_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    bubble_sound.volume = 0.5 * vol;
    bubble_sound.play();
}

function bubbleEndbossSound() {
    bubble_endboss_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    bubble_endboss_sound.volume = 0.5 * vol;
    bubble_endboss_sound.play();
}

function whooshSound() {
    whoosh_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    whoosh_sound.volume = 0.5 * vol;
    whoosh_sound.play();
}

function gameOverSound() {
    game_over_sound.currentTime = 0;
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    game_over_sound.volume = 0.8 * vol;
    game_over_sound.play();
};

function winSound() {
    const vol = (typeof window.masterVolume !== 'undefined') ? window.masterVolume : 1;
    win_sound.volume = 0.8 * vol;
    win_sound.currentTime = 0;
    
    let playCount = 1;

    win_sound.play();

    win_sound.onended = function() {
        if (playCount < 2) {
            win_sound.currentTime = 0;
            win_sound.play();
            playCount++;
        } else {
            win_sound.onended = null;
        }
    };
}

function isAnyHurtSoundPlaying() {
    return (character_hurt_sound && !character_hurt_sound.paused && !character_hurt_sound.ended) ||
        (character_eletric_shock_sound && !character_eletric_shock_sound.paused && !character_eletric_shock_sound.ended);
};

function stopAllSounds() {
    shock_timeouts.forEach(id => clearTimeout(id));
    shock_timeouts = [];

    const allAudios = [
        get_coin_sound, get_bottle_sound, character_hurt_sound,
        character_eletric_shock_sound, finSlap_sound, finSlap_hit_sound,
        bubble_sound, bubble_endboss_sound, whoosh_sound,
        sharkis_dead_sound, win_sound, game_over_sound
    ];

    allAudios.forEach(audio => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    active_shocks.forEach(s => {
        s.pause();
        s.src = "";
    });
    active_shocks = [];
};

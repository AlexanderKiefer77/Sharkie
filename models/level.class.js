

class Level {
    // enemies;
    // coins;
    // bottlesToCollect;
    // clouds;
    // greenPufferFish;
    // orangePufferFish;
    // redPufferFish;


    backgroundObjects;
    fishes;
    // endboss;
    level_start_x = -600;
    level_end_x = 3600;


    constructor(backgroundObjects, fishes) {
        // this.enemies = enemies;
        // this.coins = coins;
        // this.bottlesToCollect = bottlesToCollect;
        // this.clouds = clouds;

        this.backgroundObjects = backgroundObjects;
        this.fishes = fishes;
        // this.endboss = endboss;
    }
}

class Level {
    backgroundObjects;
    fishes;
    bottles;
    coins;
    endboss;
    level_start_x = -260;
    level_end_x = 4150;

    constructor(fishes, backgroundObjects, bottles, coins, endboss) { 
        this.fishes = fishes;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endboss = endboss;
    }
}
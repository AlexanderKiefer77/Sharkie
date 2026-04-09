class Level {
    backgroundObjects;
    fishes;
    bottles;
    level_start_x = -600;
    level_end_x = 3600;

    constructor(fishes, backgroundObjects, bottles) { 
        this.fishes = fishes;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
    }
}
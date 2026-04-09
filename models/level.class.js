class Level {
    backgroundObjects;
    fishes;
    level_start_x = -600;
    level_end_x = 3600;

    constructor(fishes, backgroundObjects) { 
        this.fishes = fishes;
        this.backgroundObjects = backgroundObjects;
    }
}
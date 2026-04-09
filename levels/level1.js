function initLevel() {
    let numberOfGreenPufferFishes = 5;
    let numberOfOrangePufferFishes = 5;
    let numberOfRedPufferFishes = 5;
    let numberOfYellowJellyFishes = 5;
    let numberOfLilaJellyFishes = 5;

    // Helper-Function for random x-Position
    function randomPositionX() {
        return 300 + Math.random() * 3600; // x between 300 and 3900
    }

    // Helper-Function for random y-Position
    function randomPositionY() {
        return 20 + Math.random() * 400; // y between 50 and 450
    }

    // Pufferfishes
    const pufferFishesGreen = Array.from({ length: numberOfGreenPufferFishes }, () =>
        new PufferFish('Green', randomPositionX(), randomPositionY())
    );
    const pufferFishesOrange = Array.from({ length: numberOfOrangePufferFishes }, () =>
        new PufferFish('Orange', randomPositionX(), randomPositionY())
    );
    const pufferFishesRed = Array.from({ length: numberOfRedPufferFishes }, () =>
        new PufferFish('Red', randomPositionX(), randomPositionY())
    );

    // Jellyfishes (fix y = 400)
    const jellyFishesYellow = Array.from({ length: numberOfYellowJellyFishes }, () =>
        new JellyFish('Yellow', randomPositionX(), 400)
    );
    const jellyFishesLila = Array.from({ length: numberOfLilaJellyFishes }, () =>
        new JellyFish('Lila', randomPositionX(), 400)
    );

    const fishes = [
        ...pufferFishesGreen,
        ...pufferFishesOrange,
        ...pufferFishesRed,
        ...jellyFishesYellow,
        ...jellyFishesLila
    ];

    // Return of the level
    return new Level(
        fishes,
        createBackgroundObjects(),
        new Endboss()
    );

    function createBackgroundObjects() {
        let backgroundObjects = [];
        let layerOffsets = [-719, 0, 719, 719 * 2, 719 * 3, 719 * 4, 719 * 5];

        layerOffsets.forEach((offset, index) => {
            let suffix = index % 2 === 0 ? '2' : '1'; // change between L2 and L1
            backgroundObjects.push(
                new BackgroundObject(`./assets/img/3. Background/Layers/5. Water/L${suffix}.png`, offset),
                new BackgroundObject(`./assets/img/3. Background/Layers/1. Light/${suffix === '2' ? '2' : '1'}.png`, offset),
                new BackgroundObject(`./assets/img/3. Background/Layers/3.Fondo 1/L${suffix}.png`, offset),
                new BackgroundObject(`./assets/img/3. Background/Layers/4.Fondo 2/L${suffix}.png`, offset),
                new BackgroundObject(`./assets/img/3. Background/Layers/2. Floor/L${suffix}.png`, offset)
            );
        });
        return backgroundObjects;
    }
}



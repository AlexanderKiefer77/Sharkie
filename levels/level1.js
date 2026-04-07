function initLevel() {
    let numberOfGreenPufferFishes = 10;
    let numberOfOrangePufferFishes = 10;
    let numberOfRedPufferFishes = 10;
    let numberOfYellowJellyFishes = 5;
    let numberOfLilaJellyFishes = 5;

    const pufferFishesGreen = Array.from({ length: numberOfGreenPufferFishes }, () => new GreenPufferFishes());
    const pufferFishesOrange = Array.from({ length: numberOfOrangePufferFishes }, () => new OrangePufferFishes());
    const pufferFishesRed = Array.from({ length: numberOfRedPufferFishes }, () => new RedPufferFishes());
    const jellyFishesYellow = Array.from({ length: numberOfYellowJellyFishes }, () => new YellowJellyFishes());
    const jellyFishesLila = Array.from({ length: numberOfLilaJellyFishes }, () => new LilaJellyFishes());

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
        [
            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L2.png', -719),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', -719),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L2.png', -719),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L2.png', -719),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L2.png', -719),

            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L1.png', 0),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/1.png', 0),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L1.png', 0),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L1.png', 0),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L1.png', 0),

            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L2.png', 719),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', 719),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L2.png', 719),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L2.png', 719),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L2.png', 719),

            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L1.png', 719 * 2),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/1.png', 719 * 2),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L1.png', 719 * 2),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L1.png', 719 * 2),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L1.png', 719 * 2),

            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L2.png', 719 * 3),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', 719 * 3),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L2.png', 719 * 3),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L2.png', 719 * 3),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L2.png', 719 * 3),

            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L1.png', 719 * 4),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/1.png', 719 * 4),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L1.png', 719 * 4),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L1.png', 719 * 4),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L1.png', 719 * 4),

            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L2.png', 719 * 5),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', 719 * 5),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L2.png', 719 * 5),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L2.png', 719 * 5),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L2.png', 719 * 5),
        ],
        [
            new Endboss()
        ]
    );
}



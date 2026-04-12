function initLevel() {
    let numberOfGreenPufferFishes = 5;
    let numberOfOrangePufferFishes = 5;
    let numberOfRedPufferFishes = 5;
    let numberOfYellowJellyFishes = 5;
    let numberOfLilaJellyFishes = 5;

    const numberOfBottles = 8;
    const startX = 400;
    const maxX = 3300;

    let coins = [];
    const coinRadius = 80;

    // Helper-Function for random x-Position
    function randomPositionX() {
        return 300 + Math.random() * 3200; // x between 300 and 3500
    }

    // Helper-Function for random y-Position
    function randomPositionY() {
        return 20 + Math.random() * 400; // y between 20 and 420
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

    // 1. Place bottles evenly with a minimum distance between them
    const availableSpace = maxX - startX;
    const interval = availableSpace / (numberOfBottles - 1);

    const bottles = Array.from({ length: numberOfBottles }, (_, i) => {
        let xPos = startX + (i * interval) + (Math.random() * (interval / 2) - (interval / 4));
        xPos = Math.min(xPos, maxX);
        let yPos = 420 - Math.random() * 80;
        return new Bottle(xPos, yPos);
    });

    // 2. Place coins in an even radius around each bottle
    bottles.forEach(bottle => {
        const numberOfCoinsPerBottle = 5;
        const startAngle =  (200 * Math.PI) / 180;
        const endAngle = (340 * Math.PI) / 180;

        for (let i = 0; i < numberOfCoinsPerBottle; i++) {
            let angle = startAngle + (i * (endAngle - startAngle) / (numberOfCoinsPerBottle - 1));

            let centerX = (bottle.x + bottle.width / 2);
            let centerY = bottle.y + 20;

            let coinX = centerX + Math.cos(angle) * coinRadius;
            let coinY = centerY + Math.sin(angle) * coinRadius;

            coins.push(new Coin(coinX, coinY));
        }
    });

    // Return of the level
    return new Level(
        fishes,
        createBackgroundObjects(),
        bottles,
        coins,
        new Endboss()
    );

    function createBackgroundObjects() {
        let backgroundObjects = [];
        let layerOffsets = [-719, 0, 719, 719 * 2, 719 * 3, 719 * 4, 719 * 5];

        layerOffsets.forEach((offset, index) => {
            let suffix = index % 2 === 0 ? '2' : '1'; // change between 2 and 1
            backgroundObjects.push(
                new BackgroundObject(`./assets/img/Background/Water/L${suffix}.png`, offset),
                new BackgroundObject(`./assets/img/Background/Light/${suffix === '2' ? '2' : '1'}.png`, offset),
                new BackgroundObject(`./assets/img/Background/Fondo 2/L${suffix}.png`, offset),
                new BackgroundObject(`./assets/img/Background/Fondo 1/L${suffix}.png`, offset),
                new BackgroundObject(`./assets/img/Background/Floor/D${suffix}.png`, offset)
            );
        });
        return backgroundObjects;
    }
}



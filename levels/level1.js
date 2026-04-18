function initLevel1() {
    let numberOfGreenPufferFishes = 3;
    let numberOfOrangePufferFishes = 3;
    let numberOfRedPufferFishes = 3;
    let numberOfYellowJellyFishes = 2;
    let numberOfLilaJellyFishes = 2;

    const numberOfBottles = 4;
    const startX = 400;
    const maxX = 2000;

    let coins = [];
    const coinRadius = 60;

    // Helper-Function for random x-Position
    function randomPositionX() {
        return 300 + Math.random() * (maxX - 100);
    }

    // Helper-Function for random y-Position
    function randomPositionY() {
        return 20 + Math.random() * 400; // y between 20 and 40
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
        let layerOffsets = [-719, 0, 719, 719 * 2, 719 * 3];

        layerOffsets.forEach((offset, index) => {
            let suffix = index % 2 === 0 ? '2' : '1'; // change between 2 and 1
            backgroundObjects.push(
                new BackgroundObject(`./assets/img/Background/Floor/L${suffix}-komplett.png`, offset),
            );
        });
        return backgroundObjects;
    }
}



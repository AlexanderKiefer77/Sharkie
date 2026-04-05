function initLevel() {
    
    // Return of the level
    return new Level(
        // enemies,
        // coins,
        // bottlesToCollect,
        // [
        //     new Cloud(),
        //     new Cloud()
        // ],
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
           
            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L2.png', 719*3),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', 719*3),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L2.png', 719*3),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L2.png', 719*3),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L2.png', 719*3),

            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L1.png', 719 * 4),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/1.png', 719 * 4),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L1.png', 719 * 4),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L1.png', 719 * 4),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L1.png', 719 * 4),
           
            new BackgroundObject('./assets/img/3. Background/Layers/5. Water/L2.png', 719*5),
            new BackgroundObject('./assets/img/3. Background/Layers/1. Light/2.png', 719*5),
            new BackgroundObject('./assets/img/3. Background/Layers/3.Fondo 1/L2.png', 719*5),
            new BackgroundObject('./assets/img/3. Background/Layers/4.Fondo 2/L2.png', 719*5),
            new BackgroundObject('./assets/img/3. Background/Layers/2. Floor/L2.png', 719*5),
        ],
        [
            new Endboss()
        ]
    );
}



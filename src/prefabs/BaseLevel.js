class BaseLevel extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  // Override in subclass to configure level
  get mapKey() {
    return "level1";
  }
  get nextScene() {
    return "Win";
  }

  create() {
    // Capture keyboard
    this.keys = this.input.keyboard.createCursorKeys();

    // Create map
    this.map = this.add.tilemap(this.mapKey);

    // Add tileset
    const tileset = this.map.addTilesetImage("BaseTilemap", "tileset_img");

    // Create tile layers in render order (bottom to top)
    this.createLayers(tileset);

    // Get player start position from Locations layer
    let startPos = this.map
      .getObjectLayer("Locations")
      .objects.find((obj) => obj.name === "playerStart");

    // Create player
    this.player = new Player(this, startPos.x, startPos.y, "player", 0);

    // Set up player collisions with platforms
    if (this.platformLayer) {
      this.physics.add.collider(this.player, this.platformLayer);
    }

    // Create coins from object layer
    this.createCoins();

    // Create bombs from object layer
    this.createBombs();

    // Set up win zone
    this.createWinZone();

    // Follow player with camera
    this.cameras.main.startFollow(this.player, true, 1, 1, 0, 20);

    // Set zoom & camera bounds
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels,
    );

    // Set gravity and physics world bounds
    this.physics.world.gravity.y = 200;
    this.physics.world.bounds.setTo(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels,
    );
  }

  createLayers(tileset) {
    // Base layer - fixed background
    this.map.createLayer("Base", tileset, 0, 0);

    // Platform layer with one-way collision 
    this.platformLayer = this.map.createLayer("Platforms", tileset, 0, 0);
    if (this.platformLayer) {
      this.platformLayer.setCollisionByExclusion([-1]);
      this.platformLayer.forEachTile((tile) => {
        if (tile.index !== -1) {
          tile.collideDown = false;
          tile.collideLeft = false;
          tile.collideRight = false;
        }
      });
    }
  }

  createCoins() {
    const coinsLayer = this.map.getObjectLayer("Coins");
    if (!coinsLayer) return;

    this.coins = [];

    coinsLayer.objects.forEach((coinObj) => {
      const coin = new Coin(
        this,
        coinObj.x + coinObj.width / 2,
        coinObj.y - coinObj.height / 2,
        "tileset_sprites",
        coinObj.gid - 1,
      );
      this.coins.push(coin);
      this.physics.add.overlap(this.player, coin, () => coin.collect());
    });
  }

  createBombs() {
    const bombsLayer = this.map.getObjectLayer("Bombs");
    if (!bombsLayer) return;

    this.bombs = [];

    bombsLayer.objects.forEach((bombObj) => {
      const bomb = new Bomb(
        this,
        bombObj.x + bombObj.width / 2,
        bombObj.y - bombObj.height / 2,
        "tileset_sprites",
        bombObj.gid - 1,
      );
      this.bombs.push(bomb);
      this.physics.add.overlap(this.player, bomb, () => bomb.hit());
    });
  }

  createWinZone() {
    const winObj = this.map
      .getObjectLayer("Locations")
      .objects.find((obj) => obj.name === "win");

    if (!winObj) return;

    // Create invisible zone for win area
    this.winZone = this.add.zone(
      winObj.x + winObj.width / 2,
      winObj.y + winObj.height / 2,
      winObj.width,
      winObj.height,
    );
    this.physics.add.existing(this.winZone, true);

    this.physics.add.overlap(
      this.player,
      this.winZone,
      this.reachWin,
      null,
      this,
    );
  }

  reachWin(player, zone) {
    // Disable further collisions
    this.winZone.destroy();

    // Transition to next scene
    this.scene.start(this.nextScene);
  }

  update() {
    this.playerFSM.step();
  }
}

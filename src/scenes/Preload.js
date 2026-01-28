class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    let loadingBar = this.add.graphics();

    this.load.on("progress", (value) => {
      loadingBar.clear();
      loadingBar.fillStyle(0xffffff, 1);
      loadingBar.fillRect(0, this.cameras.main.centerY, value * this.cameras.main.width, 5);
    });

    this.load.path = "./assets/";

    // Load tilemaps
    this.load.tilemapTiledJSON("level1", "maps/Level1.json");
    this.load.tilemapTiledJSON("level2", "maps/Level2.json");

    // Load tileset as both image (for tilemap) and spritesheet (for object sprites)
    this.load.image("tileset_img", "tilesets/tileset.png");
    this.load.spritesheet("tileset_sprites", "tilesets/tileset.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // Create red ball for player
    const graphics = this.add.graphics();
    graphics.fillStyle(0xff0000, 1);
    graphics.fillCircle(12, 12, 12);
    graphics.generateTexture("player", 24, 24);
    graphics.destroy();

    this.load.on("complete", () => {
      loadingBar.destroy();
      this.scene.start("Level1");
    });
  }
}

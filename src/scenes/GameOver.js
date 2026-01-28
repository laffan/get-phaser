class GameOver extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Dark overlay
    this.add.rectangle(centerX, centerY, 500, 500, 0x000000, 0.7);

    // Game Over text
    this.add.text(centerX, centerY - 50, "TIDY DEATH", {
      fontSize: "42px",
      fontFamily: "monospace",
      color: "#ff0000",
    }).setOrigin(0.5);

    // Restart instruction
    this.add.text(centerX, centerY + 20, "SPACE to SPAWN", {
      fontSize: "16px",
      fontFamily: "monospace",
      color: "#ffffff",
    }).setOrigin(0.5);

    // Listen for space key to restart
    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("Level1");
    });
  }
}

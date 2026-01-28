class Win extends Phaser.Scene {
  constructor() {
    super("Win");
  }

  create() {
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    // Dark overlay
    this.add.rectangle(centerX, centerY, 500, 500, 0x000000, 0.7);

    // Win text
    this.add.text(centerX, centerY - 50, "YOU WIN!", {
      fontSize: "32px",
      fontFamily: "monospace",
      color: "#00ff00",
    }).setOrigin(0.5);

    // Restart instruction
    this.add.text(centerX, centerY + 20, "Press SPACE to play again", {
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

class Bomb extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this, true); // true = static body

    // Set collision size (slightly smaller for better gameplay feel)
    this.setSize(28, 28);

    // Add slow rotation tween
    scene.tweens.add({
      targets: this,
      angle: 360,
      duration: 3000,
      repeat: -1,
    });
  }

  hit() {
    // Trigger game over
    this.scene.scene.start("GameOver");
  }
}

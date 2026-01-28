class Coin extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    // Add to scene
    scene.add.existing(this);
    scene.physics.add.existing(this, true); // true = static body

    // Set collision size
    this.setSize(32, 32);
  }

  collect() {
    this.destroy();
  }
}

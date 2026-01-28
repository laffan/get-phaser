// This demo is a mashup of several of Nathan's, primarily
// https://github.com/nathanaltice/Mappy - Tiled integration and physics setup
// https://github.com/nathanaltice/FSM - Player movement & animations
//
// get() idea thanks to Claude 
// =================================================

const config = {
  parent: "phaser-game",
  type: Phaser.WEBGL,
  width: 500,
  height: 500,
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: [Preload, Level1, Level2, GameOver, Win],
};

const game = new Phaser.Game(config);

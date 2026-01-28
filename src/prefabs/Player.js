class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.runVelocity = 130;
    this.jumpVelocity = 270;

    // Add to scene
    scene.add.existing(this);
    this.setOrigin(0.5, 0.5);

    // Physics setup
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);

    // Set circular body for the ball
    const radius = 12;
    this.body.setCircle(radius);

    this.setGravityY(100);

    this.scene.playerFSM = new StateMachine(
      "idle",
      {
        idle: new IdleState(),
        move: new MoveState(),
        jump: new JumpState(),
      },
      [this.scene, this],
    );
  }
}

class IdleState extends State {
  enter(scene, player) {
    player.setVelocityX(0);
  }

  execute(scene, player) {
    const { left, right, up } = scene.keys;

    if (left.isDown || right.isDown) {
      this.stateMachine.transition("move");
      return;
    }

    if (up.isDown) {
      this.stateMachine.transition("jump");
      return;
    }
  }
}

class MoveState extends State {
  enter(scene, player) {}

  execute(scene, player) {
    const { left, right, up } = scene.keys;

    // transition to idle if not pressing movement keys
    if (!(left.isDown || right.isDown)) {
      this.stateMachine.transition("idle");
      return;
    }
    if (up.isDown) {
      this.stateMachine.transition("jump");
      return;
    }

    // Move player
    let moveDirection = new Phaser.Math.Vector2(0, 0);
    if (left.isDown) {
      moveDirection.x = -1;
    } else if (right.isDown) {
      moveDirection.x = 1;
    }

    // normalize movement
    moveDirection.normalize();

    player.setVelocityX(player.runVelocity * moveDirection.x);
  }
}

class JumpState extends State {
  enter(scene, player) {
    player.setVelocityY(-player.jumpVelocity);
  }

  execute(scene, player) {
    const { left, right } = scene.keys;

    if (player.body.blocked.down) {
      this.stateMachine.transition("idle");
      return;
    }

    // Allow mid-air movement
    let moveDirection = new Phaser.Math.Vector2(0, 0);
    if (left.isDown) {
      moveDirection.x = -1;
    } else if (right.isDown) {
      moveDirection.x = 1;
    }

    moveDirection.normalize();
    player.setVelocityX(player.runVelocity * moveDirection.x);
  }
}

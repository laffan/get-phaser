class Level1 extends BaseLevel {
  constructor() {
    super("Level1");
  }

  get mapKey() { return "level1"; }
  get nextScene() { return "Level2"; }
}

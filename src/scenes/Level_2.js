class Level2 extends BaseLevel {
  constructor() {
    super("Level2");
  }

  get mapKey() { return "level2"; }
  get nextScene() { return "Win"; }
}

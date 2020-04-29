class SceneLoad extends Phaser.Scene {
  constructor() {
    super("SceneLoad");
  }
  preload() {
    this.load.image("body", "assets/images/body.png");
    this.load.image("platform", "assets/images/platform.png");
    this.load.image("button1", "assets/images/button.png");
    this.load.image("ball", "assets/images/ball.png");
  }
  create() {
    this.scene.start("SceneMain");
  }
}

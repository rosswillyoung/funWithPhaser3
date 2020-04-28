class Button extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.config = config;
    this.scene = config.scene;
    this.back = this.scene.add.image(game.config.width / 2, 200, config.key);
    this.add(this.back);

    this.text = this.scene.add.text(game.config.width / 2, 200, config.text).setOrigin(0.5, 0.5);
    this.add(this.text);

    this.back.setInteractive();
    this.back.on('pointerdown', this.startSceneMain, this);
    this.scene.add.existing(this);
  }

  startSceneMain() {
    emitter.emit(this.config.event);
  }
}

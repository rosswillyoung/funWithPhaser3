class SceneOver extends Phaser.Scene {
  constructor() {
    super( { key: 'SceneOver' } );
  }
  create() {
    this.add.text(game.config.height / 2, game.config.width / 2, 'GAME OVER');
  }
}

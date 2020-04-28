class SceneOver extends Phaser.Scene {
  constructor() {
    super( { key: 'SceneOver' } );
  }

  preload() {
  }

  create() {
    // this.add.text(game.config.height / 2, game.config.width / 2, 'GAME OVER').setOrigin(0.5, 0.5);
    // this.button = this.add.button(game.config.width / 2, 300, 'Button', this.playAgain, this);
    this.gameStartButton = new Button({
      scene: this,
      key: 'button1',
      event: 'play_again',
      text: 'Play Again?'
    })

    emitter.on('play_again', this.playAgain, this);
  }

  playAgain() {
    this.scene.start('SceneMain');
  }
}

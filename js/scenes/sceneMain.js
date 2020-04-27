class SceneMain extends Phaser.Scene {
  constructor() {
    super ( {key: 'SceneMain'} );
  }

  preload() {
    this.load.image('body', 'assets/images/body.png');
  }

  create() {
    // this.head = this.add.image(150, 100, 'body');
    let body = this.physics.add.group();
    this.head = body.create(200, 200, 'body');
    body.create(300, 200, 'body');

    // this.head.body.setVelocity(10, 0);
  }
}

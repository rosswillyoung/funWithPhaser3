class SceneMain extends Phaser.Scene {
  constructor() {
    super ( {key: 'SceneMain'} );
  }

  preload() {
    this.load.image('body', 'assets/images/body.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('platform1', 'assets/images/platform1.png');
  }

  create() {
    // this.head = this.add.image(150, 100, 'body');
    this.player = this.physics.add.image(game.config.width / 2, game.config.height - 100, 'body');
    this.player.setBounce(.2);
    this.player.setCollideWorldBounds(true);

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(game.config.width / 2, game.config.height, 'platform');
    // this.head.body.setVelocity(10, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.platforms);

    this.createPlatform();
  }

  update() {
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-120);
    }
    if (this.cursors.left.isDown && !this.player.body.touching.down) {
      this.player.setVelocityX(-70);
    } else if (this.cursors.right.isDown && !this.player.body.touching.down) {
      this.player.setVelocityX(70);
    }
    if (this.player.body.touching.down){
      this.player.setVelocityX(0);
    }
  }

  createPlatform() {
    this.platform = this.platforms.create(300, 330, 'platform').setScale(.2, .4).refreshBody();

    this.platform1 = this.platforms.create(150, 350, 'platform');
    this.platform1.body.setSize(50, 10);
    this.platform1.setDisplaySize(50, 10);
  }
}

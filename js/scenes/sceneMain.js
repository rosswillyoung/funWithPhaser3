class SceneMain extends Phaser.Scene {
  constructor() {
    super ( {key: 'SceneMain'} );
  }

  preload() {
  }

  create() {
    emitter = new Phaser.Events.EventEmitter();
    // this.head = this.add.image(150, 100, 'body');
    this.player = this.physics.add.image(game.config.width / 2, game.config.height - 100, 'body');
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);

    this.points = 0;
    this.gameOver = false;

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(game.config.width / 2, game.config.height, 'platform');
    this.platforms.create(150, 330, 'platform').setScale(.2, .4).refreshBody();
    // this.head.body.setVelocity(10, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.platforms);
    this.gameStarted = false;
    this.createFirstPlatforms();
    this.pointText = this.add.text(game.config.width / 2, 25, 'Points: 0');
    this.pointText.setOrigin(0.5, 0.5);
  }

  update() {
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.gameStarted = true;
      this.player.setVelocityY(-150);
    }
    if (this.cursors.left.isDown && !this.player.body.touching.down) {
      this.player.setVelocityX(-70);
    } else if (this.cursors.right.isDown && !this.player.body.touching.down) {
      this.player.setVelocityX(70);
    }
    if (this.player.body.touching.down){
      this.player.setVelocityX(0);
    }

    if (this.gameStarted) {
      this.platforms.children.entries.forEach((platform) => {
        if (this.player.y > 390) {
          this.gameOver = true;
          this.scene.start('SceneOver');
        }
        if (this.player.y < 100) {
          platform.y += .7;
        }
        platform.y += .3;
        platform.refreshBody();
        if (platform.y > 420) {
          platform.destroy();
          // console.log(this.platforms.children.entries.length);
          if (this.platforms.children.entries.length <= 8) {
            this.createPlatforms();
          }
        }
      });
      // console.log(this.platforms);
    };
  }

  createFirstPlatforms() {
    let platformNumber = 10;
    let yRange = 280;
    for (let i = 0; i <= platformNumber; i++) {
      this.platforms.create(Phaser.Math.Between(25, 375), Phaser.Math.Between(yRange, yRange - 30), 'platform').setScale(.2, .4).refreshBody();
      yRange -= 50;
    }

    // this.platform = this.platforms.create(300, 330, 'platform').setScale(.2, .4).refreshBody();
    //
    // this.platform1 = this.platforms.create(150, 350, 'platform');
    // this.platform1.body.setSize(50, 10);
    // this.platform1.setDisplaySize(50, 10);
  }

  createPlatforms() {
    let platformNumber = 10;
    let yRange = 30;
    for (let i = 0; i <= platformNumber; i++) {
      this.platforms.create(Phaser.Math.Between(25, 375), Phaser.Math.Between(yRange, yRange - 30), 'platform').setScale(.2, .4).refreshBody();
      yRange -= 50;
    }
    this.points += 10;
    this.pointText.setText('Points: ' + this.points);
    console.log(this.points);
  }
}

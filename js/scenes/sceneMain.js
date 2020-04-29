class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }

  preload() {}

  create() {
    emitter = new Phaser.Events.EventEmitter();
    // this.head = this.add.image(150, 100, 'body');
    this.player = this.physics.add.image(
      game.config.width / 2,
      game.config.height - 100,
      "body"
    );
    this.player.setBounce(0);
    this.player.setCollideWorldBounds(true);
    this.player.setGravity(0, 0);

    this.points = 0;
    this.gameOver = false;
    this.moveSpeed = 0.3;

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(
      game.config.width / 2,
      game.config.height,
      "platform"
    );
    this.platforms
      .create(150, 330, "platform")
      .setScale(0.2, 0.4)
      .refreshBody();
    // this.head.body.setVelocity(10, 0);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.player, this.platforms);
    this.gameStarted = false;
    this.createFirstPlatforms();
    this.pointText = this.add.text(game.config.width / 2, 25, "Points: 0");
    this.pointText.setOrigin(0.5, 0.5);
  }

  update() {
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.gameStarted = true;
      this.player.setVelocityY(-300);
      this.player.setGravity(0, 0);
    }
    if (this.cursors.left.isDown && !this.player.body.touching.down) {
      this.player.setVelocityX(-90);
    } else if (this.cursors.right.isDown && !this.player.body.touching.down) {
      this.player.setVelocityX(90);
    }
    if (this.player.body.touching.down) {
      this.player.setVelocityX(0);
    }

    if (this.gameStarted) {
      this.platforms.children.entries.forEach((platform) => {
        if (this.player.y > 390) {
          this.gameOver = true;
          this.scene.start("SceneOver");
        }
        if (this.player.y < 100) {
          platform.y += this.moveSpeed + 0.3;
        }
        platform.y += this.moveSpeed;
        platform.refreshBody();
        if (platform.y > 420) {
          platform.destroy();
          // console.log(this.platforms.children.entries.length);
          if (this.platforms.children.entries.length <= 7) {
            this.createPlatforms();
          }
        }
      });
      // console.log(this.platforms);
    }
  }

  createFirstPlatforms() {
    let platformNumber = 10;
    let yRange = 280;
    let lastXValue = 0;
    for (let i = 0; i <= platformNumber; i++) {
      let xValue = Phaser.Math.Between(25, 375);
      let yValue = Phaser.Math.Between(yRange, yRange - 20);
      if (xValue < lastXValue + 30 && xValue > lastXValue - 30) {
        xValue = lastXValue + 30 ? lastXValue < 200 : lastXValue - 30;
      }

      this.platforms
        .create(xValue, yValue, "platform")
        .setScale(0.2, 0.4)
        .refreshBody();
      yRange -= 50;
      lastXValue = xValue;
    }

    // this.platform = this.platforms.create(300, 330, 'platform').setScale(.2, .4).refreshBody();
    //
    // this.platform1 = this.platforms.create(150, 350, 'platform');
    // this.platform1.body.setSize(50, 10);
    // this.platform1.setDisplaySize(50, 10);
  }

  createPlatforms() {
    this.moveSpeed += 0.1;
    let platformNumber = 10;
    let yRange = 20;
    let lastXValue = 0;
    for (let i = 0; i <= platformNumber; i++) {
      let xValue = Phaser.Math.Between(25, 375);
      let yValue = Phaser.Math.Between(yRange, yRange - 20);
      if (xValue < lastXValue + 30 && xValue > lastXValue - 30) {
        xValue = lastXValue + 50 ? lastXValue < 200 : lastXValue - 50;
      }

      this.platforms
        .create(xValue, yValue, "platform")
        .setScale(0.2, 0.4)
        .refreshBody();
      yRange -= 50;
      lastXValue = xValue;
    }
    this.points += 10;
    this.pointText.setText("Points: " + this.points);
    // console.log(this.points);
  }
}

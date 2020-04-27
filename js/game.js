let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    backgroundColor: '#bfcc00',
    physics: {
      default: 'arcade',
      arcade: {
        debug: true
      }
    },
    scene: [ SceneMain ]
};

let game = new Phaser.Game(config);

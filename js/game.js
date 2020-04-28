let emitter;

let config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,
    backgroundColor: '#bfcc00',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: {y: 300}
      }
    },
    scene: [ SceneLoad, SceneMain, SceneOver ]
};

let game = new Phaser.Game(config);

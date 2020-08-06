export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    //pegar nosso monstrinho chamado slime para aplicar no game
    super(scene, x, y, "enemyPNG", 0);
    this.scene = scene;

    // habilitando as fisicas do mundo
    this.scene.physics.world.enable(this);

    //adiciona nosso player na cena
    this.scene.add.existing(this);

    this.setDepth(1);
    this.setSize(30, 32, -32);

    //setting time to enemy moves
    this.timeEvent = this.scene.time.addEvent({
      delay: 3000,
      callback: this.move,
      loop: true,
      callbackScope: this,
    });
  }

  move() {
    const randNumber = Math.floor(Math.random() * 4 + 1);
    switch (randNumber) {
      case 1:
        this.setVelocityX(100);
        break;
      case 2:
        this.setVelocityX(-100);
        break;
      case 3:
        this.setVelocityY(100);
        break;
      case 4:
        this.setVelocityY(-100);
        break;
      default:
        this.setVelocityX(100);
    }

    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.setVelocity(0);
      },
      callbackScope: this,
    });
  }
}

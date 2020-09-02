export default class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, key, frame);
    this.scene = scene;
  }
}

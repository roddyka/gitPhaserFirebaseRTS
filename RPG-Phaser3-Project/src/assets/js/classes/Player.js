export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.velocity = 160;

    //enable physics
    this.scene.physics.world.enable(this);
    //set imovable if another object collider with your player
    this.setImmovable(false);

    //scale
    this.setScale(1);

    //square collider
    this.setSize(20, 32, -32);

    //collide with world bounds
    this.setCollideWorldBounds(true);

    //add the player to our existing scene
    this.scene.add.existing(this);
  }

  update(cursors) {
    this.body.setVelocity(0);

    if (cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity);
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(this.velocity);
    }

    if (cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity);
    } else if (cursors.down.isDown) {
      this.body.setVelocityY(this.velocity);
    }

    if (cursors.space.isDown) {
    }
  }
}

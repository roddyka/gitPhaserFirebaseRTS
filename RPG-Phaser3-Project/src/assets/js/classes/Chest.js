import {
  singIn,
  singInUser,
  singUp,
  userInfo,
  update,
} from "../lib/firebaseDB";

export default class Chest extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.coins = 5;

    //enable physics
    this.scene.physics.world.enable(this);
    ////add to this existing scene
    this.scene.add.existing(this);
  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
  }

  async makeInactive(user, score) {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
    this.saveMoney = await update(
      localStorage.getItem("token"),
      user.email,
      user.name,
      score,
      user.player.level,
      user.player.name,
      user.player.sex,
      user.player.skin
    );
  }
}

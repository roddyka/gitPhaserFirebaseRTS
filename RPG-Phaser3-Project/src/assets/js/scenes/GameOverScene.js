import Phaser from "phaser";
import UiButton from "../classes/UiButton";

import {
  singIn,
  singInUser,
  singUp,
  userInfo,
  update,
} from "../lib/firebaseDB";

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.user = data.user;
    this.heartValue = 1000;
  }

  create() {
    console.log(this.user);
    this.add.text(320, 270, this.user.player.money);
    this.add.text(320, 300, "GAME OVER");
    this.LoginGameButton = new UiButton(
      this,
      350,
      350,
      "button1",
      "button2",
      "Buy Coins",
      this.startScene.bind(this, "Game")
    );
    this.LoginGameButton.setDepth(1);
    this.LoginGameButton.setScale(1.5);
  }

  startScene(targetScene) {
    //this.scene.start(targetScene);
    this.loginverification(this, targetScene);
  }

  async loginverification(scene, targetScene) {
    let id = localStorage.getItem("token");
    this.userInf = this.user;
    console.log(this.userInf);
    console.log(id);
    if (id) {
      this.score = parseInt(this.userInf.player.money) - this.heartValue;

      console.log(this.score);
      this.saveMoney = await update(
        localStorage.getItem("token"),
        this.userInf.email,
        this.userInf.name,
        this.score,
        this.userInf.player.level,
        this.userInf.player.name,
        this.userInf.player.sex,
        this.userInf.player.skin,
        this.userInf.player.life
      );
    }
    this.userInfUp = await userInfo(id);
    if (this.userInfUp) {
      this.scene.start(targetScene, { user: this.userInfUp });
    }
  }
}

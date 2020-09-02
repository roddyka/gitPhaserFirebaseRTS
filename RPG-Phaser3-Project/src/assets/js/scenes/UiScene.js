import UiButton from "../classes/UiButton";
import {
  singIn,
  singInUser,
  singUp,
  userInfo,
  update,
} from "../lib/firebaseDB";

export default class UiScene extends Phaser.Scene {
  constructor() {
    super("Ui");
  }

  init(data) {
    this.user = data.user;
    console.log(this.user);
    //grab preferences to the game scene
    this.gameScene = this.scene.get("Game");
    //this.enemyScene = this.scene.get("enemyPNG");
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
    this.logoutButton(this.scene);
  }

  setupUiElements() {
    this.life = this.user.player.life;
    //create score text
    this.moneyText = this.add.text(40, 80, this.user.player.money);
    this.moneyText.setScrollFactor(0);

    //create level text
    this.levelText = this.add.text(40, 110, this.user.player.level);
    this.levelText.setScrollFactor(0);
    //create a player
    this.playerpng = this.add.image(20, 20, "characters");
    this.playerpng.setScale(1);
    this.playerpng.setScrollFactor(0);

    this.playerName = this.add.text(40, 20, this.user.player.name);
    this.playerName.setScrollFactor(0);

    this.levelIcon = this.add.sprite(20, 110, "items", 4);

    this.coinIcon = this.add
      .image(20, 80, "moneyPNG")
      .setVisible(true)
      .setScrollFactor(0);
    this.coinIcon.setScale(0.3);

    this.fullHeart = {
      0: this.add
        .image(20, 50, "heartPNG")
        .setScale(0.3)
        .setVisible(false)
        .setScrollFactor(0),
      1: this.add
        .image(50, 50, "heartPNG")
        .setScale(0.3)
        .setVisible(false)
        .setScrollFactor(0),
      2: this.add
        .image(80, 50, "heartPNG")
        .setScale(0.3)
        .setVisible(false)
        .setScrollFactor(0),
    };

    for (var i = 0; i < this.life; i++) {
      this.fullHeart[i].setVisible(true);
    }

    this.heartEmpty = {
      0: this.add
        .image(20, 50, "heartEmptyPNG")
        .setScale(0.3)
        .setVisible(true)
        .setScrollFactor(0),
      1: this.add
        .image(50, 50, "heartEmptyPNG")
        .setScale(0.3)
        .setVisible(true)
        .setScrollFactor(0),
      2: this.add
        .image(80, 50, "heartEmptyPNG")
        .setScale(0.3)
        .setVisible(true)
        .setScrollFactor(0),
    };
  }

  setupEvents() {
    this.gameScene.events.on("updateScore", (score) => {
      this.showMoney(this, String(score));
    });

    this.gameScene.events.on("hitEnemy", (life) => {
      //console.log(life);
      this.hitEnemy(this, life);
    });

    // this.enemyScene.events.on("distanceEnemy", (enemy) => {
    //   //console.log(life);
    //   Phaser.Math.Distance.BetweenPoints(this.player, enemy);
    // });
  }

  showMoney(game, values) {
    var i = 0;
    var distance = 20;
    console.log(values);
    this.moneyText.setText(values);
    // for (i == 0; i < values.length; i++) {
    //   distance += 30;
    //   console.log(distance);
    //   this.add
    //     .image(distance, 80, "hud" + values[i])
    //     .setScale(0.3)
    //     .setVisible(true)
    //     .setScrollFactor(0);
    // }
  }

  //tomorrow! player less life when touch the enemy
  hitEnemy(game, life) {
    //this.life--;
    //for (var i = life; i < life; i--) {

    this.fullHeart[life].setVisible(false);
    //}

    if (life <= 0) {
      this.scene.stop("Game");
      this.scene.start("GameOver", { user: this.user });
    }

    console.log(life);
  }

  logoutButton(scene) {
    console.log(scene);
    this.startGameButton = new UiButton(
      this,
      650,
      20,
      "button1",
      "button2",
      "X",
      this.logout.bind(this, scene)
    );
    this.startGameButton.setDepth(1);
  }

  logout(scene) {
    localStorage.removeItem("token");
    scene.stop("Game");
    scene.start("Title");
  }
}

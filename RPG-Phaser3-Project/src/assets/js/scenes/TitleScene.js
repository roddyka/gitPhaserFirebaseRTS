import UiButton from "../classes/UiButton";

import {
  singIn,
  singInUser,
  singUp,
  userInfo,
  update,
} from "../lib/firebaseDB";

export default class TileScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }
  init() {
    this.element;
    this.erroLoginText;
    this.loginHability = false;
  }

  preload() {
    //facebook
    // this.load.image("foto", FBInstant.player.getPhoto());
  }

  create() {
    //facebook
    // this.add.text(350, 200, FBInstant.player.getName()).setOrigin(0.5);

    // this.foto = this.add.image(350, 100, "foto");
    // this.foto.setScale(0.5);

    this.LoginGameButton = new UiButton(
      this,
      350,
      350,
      "button1",
      "button2",
      "Login",
      this.startScene.bind(this, "Login")
    );
    this.LoginGameButton.setDepth(1);
    this.LoginGameButton.setScale(1.5);

    this.RegisterGameButton = new UiButton(
      this,
      350,
      450,
      "button1",
      "button2",
      "Register",
      this.startScene.bind(this, "Register")
    );
    this.RegisterGameButton.setDepth(1);
    this.RegisterGameButton.setScale(1.5);

    this.LeaderboardGameButton = new UiButton(
      this,
      350,
      150,
      "button1",
      "button2",
      "Leaderboard",
      this.startScene.bind(this, "Leaderboard")
    );
    this.LeaderboardGameButton.setDepth(1);
    this.LeaderboardGameButton.setScale(1.5);

    // var contextID = FBInstant.context.getID();
    // console.log(contextID);

    // var contextType = FBInstant.context.getType();
    // console.log(contextType);
    // FBInstant.getLeaderboardAsync("No title RPG." + FBInstant.context.getID())
    //   .then((leaderboard) => leaderboard.getEntriesAsync(10, 0))
    //   .then((entries) => {
    //     for (var i = 0; i < entries.length; i++) {
    //       console.log(
    //         entries[i].getRank() +
    //           ". " +
    //           entries[i].getPlayer().getName() +
    //           ": " +
    //           entries[i].getScore()
    //       );
    //     }
    //   })
    //   .catch((error) => console.error(error));
  }

  addPlayerPhoto(key) {
    this.add.image(400, 200, key);
  }

  createBackground() {
    this.background = this.add.image(600, 600, "background");
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage(
      "medievalRTS_spritesheet@2",
      "tiles"
    );

    this.ground = this.map.createStaticLayer("ground", this.tileset, 35, 35);
    this.objectBottom = this.map.createStaticLayer(
      "objectbottom",
      this.tileset,
      35,
      35
    );
    this.objectTop = this.map.createStaticLayer(
      "objectTop",
      this.tileset,
      35,
      35
    );

    this.objectBottom.setCollisionByProperty({ collider: true }).setDepth(0);
    this.objectTop.setDepth(0);
  }

  login(scene, element) {
    //start login
    document.getElementById("submit").onclick = async function () {
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      if (username !== "" && password !== "") {
        const logged = await singIn(username, password);
        // preciso chamar a função para se logar

        if (logged) {
          console.log(logged);
          localStorage.setItem("token", logged);
          //  Tween the login form out because are logged
          element.scene.tweens.add({
            targets: element.rotate3d,
            x: 1,
            w: 90,
            duration: 3000,
            ease: "Power3",
          });

          element.scene.tweens.add({
            targets: element,
            scaleX: 2,
            scaleY: 2,
            y: 700,
            duration: 3000,
            ease: "Power3",
            onComplete: function () {
              element.setVisible(false);
            },
          });

          //this.erroLoginText.setText("aee");

          this.userInf = await userInfo(logged);
          console.log(this.userInf);
          if (this.userInf) {
            scene.start("Game", { user: this.userInf });
          } else {
            return false;
          }
        } else {
          console.log(element);
          //this.erroLoginText.setText("Error");
          //  Tween the login form out because are logged
          element.scene.tweens.add({
            targets: element,
            y: 350,
            duration: 0.01,
            ease: "Power2",
            yoyo: true,
            loop: 1,
          });
          console.log("usuario nao reconhecido");
        }
      }
    };

    //Login animation
    this.tweens.add({
      targets: this.element,
      y: 400,
      duration: 3000,
      ease: "Power3",
    });
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }

  async loginverification(scene) {
    let id = localStorage.getItem("token");
    this.userInf = await userInfo(id);
    console.log(id);
    if (id) {
      scene.start("Game", { user: this.userInf });
    }
  }
}

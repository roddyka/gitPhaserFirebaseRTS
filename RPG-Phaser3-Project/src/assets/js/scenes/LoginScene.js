import UiButton from "../classes/UiButton";

import {
  singIn,
  singInUser,
  singUp,
  userInfo,
  update,
} from "../lib/firebaseDB";

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super("Login");
  }
  init() {
    this.element;
    this.erroLoginText;
    this.loginHability = false;
  }

  create() {
    //start element login

    this.loginverification(this.scene);

    this.element = this.add.dom(700 / 2, 700).createFromCache("login");
    this.element.setPerspective(700);

    this.login(this.scene, this.element);
    //this.element.style.setBackgroundColor("#0000008a");
    //criate title text
    this.titleText = this.add.text(
      this.element.width,
      this.element.height / 2 + 15,
      "NO TITLE RPG",
      { fontSize: "64px", fill: "#fff" }
    );
    this.titleText.setOrigin(0.5);
    this.titleText.setDepth(1);

    this.erroLoginText = this.add.text(350, 550, "", {
      fontSize: "64px",
      fill: "#fff",
    });
    this.erroLoginText.setOrigin(0.5);
    this.erroLoginText.setDepth(1);
    //create buttons
    this.startGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.95,
      "button1",
      "button2",
      "Back",
      this.startScene.bind(this, "Title")
    );
    this.startGameButton.setDepth(1);

    this.createBackground();
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

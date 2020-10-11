export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //load tiledmap
    this.loadTiledMap();
    //images
    this.loadImages();
    //load spritesheets
    this.loadSpriteSheets();
    //load audio
    this.loadAudio();

    this.loadHtml();
  }

  loadHtml() {
    this.load.html("login", "src/assets/html/login.html");
    this.load.html("register", "src/assets/html/signup.html");
  }

  loadImages() {
    this.load.image("background", "src/assets/images/water.png");
    this.load.image("button1", "src/assets/images/ui/blue_button01.png");
    this.load.image("button2", "src/assets/images/ui/blue_button02.png");

    //preload image from HUD
    this.load.image("moneyPNG", "src/assets/images/ui/hudCoin.png");
    this.load.image("heartPNG", "src/assets/images/ui/hudHeart_full.png");
    this.load.image("heartEmptyPNG", "src/assets/images/ui/hudHeart_empty.png");

    this.load.image("enemyPNG", "src/assets/images/warrior.png");

    this.load.image("hud0", "src/assets/images/ui/numbers/hud0.png");
    this.load.image("hud1", "src/assets/images/ui/numbers/hud1.png");
    this.load.image("hud2", "src/assets/images/ui/numbers/hud2.png");
    this.load.image("hud3", "src/assets/images/ui/numbers/hud3.png");
    this.load.image("hud4", "src/assets/images/ui/numbers/hud4.png");
    this.load.image("hud5", "src/assets/images/ui/numbers/hud5.png");
    this.load.image("hud6", "src/assets/images/ui/numbers/hud6.png");
    this.load.image("hud7", "src/assets/images/ui/numbers/hud7.png");
    this.load.image("hud8", "src/assets/images/ui/numbers/hud8.png");
    this.load.image("hud9", "src/assets/images/ui/numbers/hud9.png");

    this.load.image("tiles", "src/assets/images/medievalRTS_spritesheet@2.png");

    this.load.image("foto", FBInstant.player.getPhoto());
  }

  loadTiledMap() {
    this.load.tilemapTiledJSON("map", "src/assets/map/map2.json");
  }

  loadSpriteSheets() {
    this.load.spritesheet("items", "src/assets/images/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("characters", "src/assets/images/FVillage.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  loadAudio() {
    this.load.audio("goldSound", ["src/assets/audio/Pickup.wav"]);
    this.load.audio("damage", ["src/assets/audio/PlayerDamage.wav"]);
    this.load.audio("playerattack", ["src/assets/audio/PlayerAttack.wav"]);
  }

  create() {
    let scene = this.scene;
    scene.start("Leaderboard");

    //facebook
    // FBInstant.initializeAsync()
    //   .then(function () {
    //     FBInstant.setLoadingProgress(100);
    //     FBInstant.startGameAsync().then(function () {
    //       console.log("carregando");
    //       scene.start("Title");
    //     });
    //   })
    //   .catch(function (error) {
    //     console.log(error.message);
    //     console.log("not a facebook instant game");
    //     scene.start("Title");
    //   });
    //start my tileset maps and object so collider
  }
}

import Player from "../classes/Player";
import Chest from "../classes/Chest";
import Enemies from "../classes/Enemies";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init(data) {
    this.user = data.user;
    this.scene.launch("Ui", { user: this.user });
    this.score = this.user.player.money;
    this.map;
    this.tileset;
    this.life = this.user.player.life;
    this.invincible = false;
  }

  create() {
    this.createAudio();

    //this.createChest();

    this.createPlayer();
    this.createWalls();
    this.addCollisions();

    this.createInput();
    this.createBackgroundImage();

    this.input.setDefaultCursor("url(src/assets/images/sword.png), pointer");
  }

  update() {
    this.player.update(this.cursors);
  }

  createAudio() {
    this.goldPickupAudio = this.sound.add("goldSound", {
      loop: false,
      volume: 1,
    });

    this.damage = this.sound.add("damage", {
      loop: false,
      volume: 1,
    });

    this.attack = this.sound.add("playerattack", {
      loop: false,
      volume: 1,
    });
  }
  createPlayer() {
    this.player = new Player(this, 32, 32, "characters", 0);
    this.player.setDepth(1);
  }

  createChest() {
    this.chests = this.physics.add.group();
    //possible positions array
    this.chestPositions = [
      [100, 100],
      [200, 200],
      [300, 300],
      [400, 400],
      [500, 500],
    ];
    //max numbers of chests
    this.maxNumberOfChests = 6;
    for (let i = 0; i < this.maxNumberOfChests; i += 1) {
      this.spawnChest();
    }
    this.chests.setDepth(1);
  }

  spawnChest() {
    const location = this.chestPositions[
      Math.floor(Math.random() * this.chestPositions.length)
    ];

    let chest = this.chests.getFirstDead();
    if (!chest) {
      const chest = new Chest(this, location[0], location[1], "items", 3);
      //add to chest group
      this.chests.add(chest);
    } else {
      chest.setPosition(location[0], location[1]);
    }
  }
  createWalls() {
    // this.wall = this.physics.add.image(500, 100, "button1");
    // this.wall.setImmovable();
  }
  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.wall);
    // this.physics.add.overlap(
    //   this.player,
    //   this.chests,
    //   this.collectChest,
    //   null,
    //   this
    // );
  }

  // collectChest(player, chest) {
  //   this.goldPickupAudio.play();
  //   //update our score
  //   this.score += chest.coins;
  //   //update score and UI
  //   this.events.emit("updateScore", this.score);
  //   //save score
  //   console.log(this.score);

  //   //destroy chest (make inactive)
  //   chest.makeInactive(this.user, this.score);
  //   //spawn a new chest
  //   this.time.delayedCall(1000, this.spawnChest, [], this);
  // }

  createBackgroundImage() {
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

    this.objectBottom.setCollisionByProperty({ collider: true });
    this.objectTop.setDepth(10);

    //spawn palayer map
    this.spawnPlayer = this.map.findObject(
      //player and not Player like your variable
      "player",
      (objects) => objects.name === "spawnPlayer"
    );

    this.player.setPosition(this.spawnPlayer.x, this.spawnPlayer.y);

    this.physics.add.collider(this.player, this.objectBottom);

    //enemy
    //secound enemy the name now to object
    this.enemies = this.map.createFromObjects("enemy", "spawnEnemy", {});
    this.enemiesGroup = new Enemies(
      this,
      this,
      [],
      this.enemies,
      this.player,
      this.attack,
      this.goldPickupAudio,
      this.score,
      this.user
    );

    this.physics.add.collider(
      this.enemiesGroup,
      this.player,
      //funcao para matar o inimigo
      this.hitEnemy,
      null,
      this
    );

    //enemy collider object
    this.physics.add.collider(this.enemiesGroup, this.objectBottom);
  }

  camera() {
    //the CAMERA
    this.camera = this.cameras.main;
    this.camera.startFollow(this.player);
    this.camera.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );
  }

  hitEnemy() {
    if (!this.invincible) {
      this.damage.play();
      this.invincible = true;
      this.events.emit("hitEnemy", --this.life);

      this.time.delayedCall(
        2000,
        () => {
          this.invincible = false;
        },
        null,
        this
      );
    }
  }
}

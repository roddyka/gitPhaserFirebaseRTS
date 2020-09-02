import Chest from "./Chest";
import UiScene from "../scenes/UiScene";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, player, playerattack, goldPickupAudio, score, user) {
    //pegar nosso monstrinho chamado slime para aplicar no game
    super(scene, x, y, "enemyPNG", 0);
    this.scene = scene;
    this.player = player;
    this.enemyLife = 3;
    this.playerattack = playerattack;
    this.goldPickupAudio = goldPickupAudio;
    this.score = score;
    this.user = user;
    console.log(user);
    // habilitando as fisicas do mundo
    this.scene.physics.world.enable(this);

    //adiciona nosso player na cena
    this.scene.add.existing(this);

    this.setDepth(1);
    this.setSize(30, 32, -32);
    this.setInteractive();
    this.on("pointerdown", this.hitEnemy, this);

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

  hitEnemy() {
    //this.scene.events.emit("distanceEnemy", this);
    console.log(this.x, this.y);
    let d = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      this.player.x,
      this.player.y
    );

    if (d <= 50) {
      console.log("fight");
      this.playerattack.play();
      if (--this.enemyLife <= 0) {
        this.setVisible(false);
        this.setActive(false);
        this.spawnChest(this.x, this.y, this.player);
        this.body.checkCollision.none = true;
      }
    } else {
      console.log("you cant fight from this distance");
      this.fightText = this.scene.make.text({
        x: 350,
        y: 100,
        text: "You cant fight from this distance.",
        origin: 0.5,
        style: {
          font: "bold 15px Arial",
          fill: "Red",
          wordWrap: { width: 300 },
        },
      });

      this.scene.time.addEvent({
        delay: 20,
        callback: () => {
          this.fightText.destroy();
        },
        callbackScope: this,
      });
    }
  }

  spawnChest(positionX, positionY, player) {
    this.chest = new Chest(this.scene, positionX, positionY, "items", 3);
    this.addCollisions(player, this.chest);
  }

  addCollisions(player, chest) {
    this.scene.physics.add.overlap(
      player,
      chest,
      this.collectChest,
      null,
      this
    );
  }

  collectChest(player, chest) {
    this.goldPickupAudio.play();
    //update our score
    this.score += chest.coins;
    //update score and UI
    //this.events.emit("updateScore", this.score);

    //save score
    console.log(this.score);

    //destroy chest (make inactive)
    this.chest.makeInactive(this.user, this.score);
  }
}

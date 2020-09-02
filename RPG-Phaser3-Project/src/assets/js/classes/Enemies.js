import Enemy from "./Enemy";

export default class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(
    world,
    scene,
    children,
    spriteArray,
    player,
    playerattack,
    goldPickupAudio,
    score,
    user
  ) {
    super(
      world,
      scene,
      children,
      {},
      player,
      playerattack,
      goldPickupAudio,
      score,
      user
    );
    this.scene = scene;

    this.createEnemies(
      scene,
      spriteArray,
      player,
      playerattack,
      goldPickupAudio,
      score,
      user
    );
  }

  createEnemies(
    scene,
    spriteArray,
    player,
    playerattack,
    goldPickupAudio,
    score,
    user
  ) {
    spriteArray.forEach((sprite) => {
      //create an enemy
      const enemy = new Enemy(
        scene,
        sprite.x,
        sprite.y,
        player,
        playerattack,
        goldPickupAudio,
        score,
        user
      );
      //add it to the group
      this.add(enemy);
      //destroy the sprite
      sprite.destroy();
    });
  }
}

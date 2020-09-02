import Player from "../classes/Player";
import Chest from "../classes/Chest";
import Enemies from "../classes/Enemies";

export default class GameLoadingScene extends Phaser.Scene {
  constructor() {
    super("Loading");
  }

  preload() {
    this.load.image("logo", "src/assets/images/Mage.png");
  }

  create() {
    const width = this.game.config.width;
    const height = this.game.config.height;
    this.add.image(width / 2, height / 2, "logo");
  }
}

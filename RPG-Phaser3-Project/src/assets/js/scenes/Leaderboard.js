import { users } from "../lib/firebaseDB";

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super("Leaderboard");
  }

  preload() {
    this.load.json("users", "src/assets/data/users.json");
  }

  create() {
    this.titleLeader = this.add.text(300, 80, "LEADERBOARD");
    this.titleLeader.setScrollFactor(0);

    this.users = this.cache.json.get("users");

    var space = 30;
    for (let index = 0; index < this.users.users.length; index++) {
      space = space + 30;

      let element = this.users.users[index];
      console.log(element.player.name);
      console.log(element.player.money);
      this.nameLeader = this.add.text(250, 150 + space, element.player.name);
      this.pointLeader = this.add.text(400, 150 + space, element.player.money);
    }
  }

  update() {}

  async createList() {
    await users();
  }
}

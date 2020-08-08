import Phaser from "phaser";

import BootScene from "./assets/js/scenes/BootScene";
import TitleScene from "./assets/js/scenes/TitleScene";
import GameScene from "./assets/js/scenes/GameScene";
import UiScene from "./assets/js/scenes/UiScene";

import LoginScene from "./assets/js/scenes/LoginScene";
import RegisterScene from "./assets/js/scenes/Register";

import Player from "./assets/js/classes/Player";
import Chest from "./assets/js/classes/Chest";
import UiButton from "./assets/js/classes/UiButton";
//import goldSound from "./assets/audio/Pickup.wav";
import "@babel/polyfill";
import "firebase/auth";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 700,
  height: 700,
  scale: {
    // Fit to window
    mode: Phaser.Scale.FIT,
    // Center vertically and horizontally
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
  scene: [BootScene, TitleScene, GameScene, UiScene, LoginScene, RegisterScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      },
    },
  },
};

const game = new Phaser.Game(config);

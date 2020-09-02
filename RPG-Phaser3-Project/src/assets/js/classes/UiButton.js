export default class UiButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key, hoverKey, text, targetCallback) {
    super(scene, x, y);
    this.scene = scene; //scene container will be added
    this.x = x; //x position of our container
    this.y = y; //y of our container
    this.key = key; //background image
    this.hoverKey = hoverKey; //image when hover
    this.text = text; //text display button
    this.targetCallback = targetCallback; //callback function to click and call

    //create our ui button
    this.createButton();
    this.scene.add.existing(this); //add this container of phaser scene
  }

  createButton() {
    this.button = this.scene.add.image(0, 0, "button1");
    this.button.setInteractive();
    this.button.setScale(0.5);

    this.buttonText = this.scene.add.text(0, 0, this.text, {
      fontSize: "26px",
      fill: "#fff",
    });
    //center the button text inside the ui button
    Phaser.Display.Align.In.Center(this.buttonText, this.button);

    //add the towgame objects to our container
    this.add(this.button);
    this.add(this.buttonText);

    this.button.on("pointerdown", async () => {
      console.log("pointer down");
      this.targetCallback();
    });

    this.button.on("pointerover", () => {
      this.button.setTexture(this.hoverKey);
      this.buttonText.setColor("#000");
    });

    this.button.on("pointerout", () => {
      this.button.setTexture(this.key);
      this.buttonText.setColor("#fff");
    });
  }
}

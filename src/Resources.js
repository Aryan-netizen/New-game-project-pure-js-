class Resources {
  constructor() {
    this.toload = {
      hero: "sprites/hero-sheet.png",
      sprite: "sprites/spritesheet.png",
      sky: "sprites/sky.png",
      ground: "sprites/ground.png",
      rod: "sprites/rod.png",
      shadow: "sprites/shadow.png",
    };

    this.images = {};

    Object.keys(this.toload).forEach((key) => {
      const img = new Image();
      img.src = this.toload[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

const resources = new Resources();
export default resources;

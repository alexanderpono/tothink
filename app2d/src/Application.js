import logoImg from "../assets/logo.svg";

export class Application {
    constructor() {
        this.view = document.createElement("canvas");
        this.view.width = 640;
        this.view.height = 480;

        this.image = new Image();
        this.image.src = logoImg;

        this.context = this.view.getContext("2d");
    }

    start() {
        this.phase = 0;
        const gameLoop = () => {
          this.phase += 0.01;
          this.render();
          requestAnimationFrame(gameLoop);
        };
        requestAnimationFrame(gameLoop);
      }    

    render() {
        const { width, height } = this.view;
        this.context.fillStyle = "blue";
        this.context.fillRect(0, 0, width, height);

        const imageWidth = 248;
        const imageHeight = 192;
    
        this.context.save();
        this.context.translate(width / 2, height / 2);
        this.context.scale(0.9, 0.9);
        this.context.rotate(this.phase);
    
        this.context.drawImage(this.image, -imageWidth / 2, -imageHeight / 2);
        this.context.restore();
    }
}

export default class Brick {
    constructor(game, position) {
        this.img = document.getElementById("imgBrick");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.position = position;

        this.width = 80;
        this.height = 24
    }

    update(deltaTime) {

    }

    draw(ctx) {
        ctx.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);        
    }
}
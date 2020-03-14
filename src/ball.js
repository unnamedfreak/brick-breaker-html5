export default class Ball {
    constructor(game) {
        this.img = document.getElementById("imgBall");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.position = {x: 10, y: 10};
        this.speed = {x: 4, y: 4};

        this.size = 16;
    }

    draw(ctx) {
        ctx.drawImage(imgBall, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        if(this.position.x > this.gameWidth-this.size || this.position.x < 0) this.speed.x = -this.speed.x;

        if(this.position.y > this.gameHeight-this.size || this.position.y < 0) this.speed.y = -this.speed.y;
    }
}
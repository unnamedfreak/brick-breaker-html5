import { detectCollision } from './collisionDetection.js';

export default class Ball {
    constructor(game) {
        this.img = document.getElementById("imgBall");

        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;

        this.game = game;

        this.position = {x: this.gameWidth/2, y: 550};
        this.speed = {x: 4, y: -2};

        this.size = 16;
    }

    draw(ctx) {
        ctx.drawImage(imgBall, this.position.x, this.position.y, this.size, this.size);
    }

    update(deltaTime) {
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;

        // Left or Right Wall
        if(this.position.x > this.gameWidth-this.size || this.position.x < 0) this.speed.x = -this.speed.x;

        // Top or Bottom Wall
        if(this.position.y > this.gameHeight-this.size || this.position.y < 0) this.speed.y = -this.speed.y;

        // Collision with Paddle
        let paddle = this.game.paddle;
        if(detectCollision(this, paddle)) {
            this.speed.y = -this.speed.y;
        }

    }

    reset() {
        this.position = {x: this.gameWidth/2, y: 550};
        this.speed = {x: 4, y: -2};   
    }
}
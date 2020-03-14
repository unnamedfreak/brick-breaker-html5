import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js'

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);

        this.gameObjects = [this.paddle, this.ball];

        new InputHandler(this.paddle);
    }

    update(deltaTime) {
        this.gameObjects.forEach(obj => obj.update(deltaTime));
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));
    }
}
import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';
import Brick from './brick.js';
import { buildLevel, level1 } from './levels.js'; 

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
    }

    start() {
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        let bricks = buildLevel(this, level1);

        this.gameObjects = [this.paddle, this.ball, ...bricks];

        new InputHandler(this.paddle);
    }

    update(deltaTime) {
        this.gameObjects.forEach(obj => obj.update(deltaTime));

        this.gameObjects = this.gameObjects.filter(obj => {
            // console.log('Brick Deleted');
            return !obj.markedForDeletion;
        })
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));
    }
}
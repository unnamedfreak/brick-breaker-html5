import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';
import { buildLevel, level1 } from './levels.js'; 

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

export default class Game {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gamestate = GAMESTATE.MENU;
        this.gameObjects = [];
        this.bricks = [];
        this.paddle = new Paddle(this);
        this.ball = new Ball(this);
        this.lives = 2;
        new InputHandler(this, this.paddle);
    }

    start() {
        if(this.gamestate !== GAMESTATE.MENU) return;
        let bricks = buildLevel(this, level1);
        this.gameObjects = [this.paddle, this.ball, ...bricks];

        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if(
            this.gamestate === GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER
        ) return;

        this.gameObjects.forEach(obj => obj.update(deltaTime));

        this.gameObjects = this.gameObjects.filter(obj => {
            return !obj.markedForDeletion;
        })

        if(this.lives === 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        if(this.ball.position.y + this.ball.size >= this.gameHeight) {
            this.lives--;
            if(this.lives != 0) {
                this.ball.reset();
                // this.paddle.reset();
            }
        }
    }

    draw(ctx) {
        this.gameObjects.forEach(obj => obj.draw(ctx));

        if(this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
            ctx.fill();
            ctx.font = "30px Arial",
            ctx.fillStyle = "white",
            ctx.textAlign = "center",

            ctx.fillText("Paused", this.gameWidth/2, this.gameHeight/2);
        }
        
        if(this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fill();
            ctx.font = "30px Arial",
            ctx.fillStyle = "white",
            ctx.textAlign = "center",

            ctx.fillText("Press SPACE BAR To Start", this.gameWidth/2, this.gameHeight/2);
        }

        if(this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "#a1271f";
            ctx.fill();
            ctx.font = "30px Arial",
            ctx.fillStyle = "white",
            ctx.textAlign = "center",

            ctx.fillText("GAME OVER", this.gameWidth/2, this.gameHeight/2);
        }
    }

    togglePause() {
        if(this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}
import Paddle from './paddle.js';
import Ball from './ball.js';
import InputHandler from './input.js';
import { buildLevel, level1, level2 } from './levels.js'; 

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3,
    NEXTLEVEL: 4,
    FINISHED: 5
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
        this.levels = [level1, level2];
        this.currLevel = 0;
        this.lives = 2;
        new InputHandler(this, this.paddle);
    }

    start() {
        console.log(`Level ${this.currLevel+1}`)
        this.ball.reset();
        this.paddle.reset();
        if(
            (this.gamestate !== GAMESTATE.MENU &&
             this.gamestate !== GAMESTATE.NEXTLEVEL
        )) {console.log("owo"); return;}
        // if(this.gamestate === GAMESTATE.RUNNING) {
        //     console.log("owo");
        //     return; 
        // }
        this.bricks = buildLevel(this, this.levels[this.currLevel]);
        this.gameObjects = [this.paddle, this.ball];
        this.gamestate = GAMESTATE.RUNNING;
    }

    update(deltaTime) {
        if(
            this.gamestate === GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER
        ) return;

        [...this.gameObjects, ...this.bricks].forEach(obj => obj.update(deltaTime));

        this.bricks = this.bricks.filter(brick => {
            return !brick.markedForDeletion;
        })

        if(this.lives === 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        if(this.ball.position.y + this.ball.size >= this.gameHeight) {
            this.lives--;
            if(this.lives != 0) {
                this.ball.reset();
            }
        }

        console.log(this.bricks.length);
        console.log(this.currLevel, this.levels.length-1);
        console.log(this.gamestate);

        if(this.bricks.length === 0) {
            if(this.currLevel == this.levels.length-1) {
                this.gamestate = GAMESTATE.FINISHED;
            } else {
                this.currLevel++;
                this.gamestate = GAMESTATE.NEXTLEVEL;
                this.start();
            }
        }
    }

    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach(obj => obj.draw(ctx));

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

        if(this.gamestate === GAMESTATE.FINISHED) {
            ctx.rect(0, 0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "#ffc038";
            ctx.fill();
            ctx.font = "30px Arial",
            ctx.fillStyle = "black",
            ctx.textAlign = "center",

            ctx.fillText("YOU WON!", this.gameWidth/2, this.gameHeight/2);
        }
    }

    togglePause() {
        if(this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else if(this.gamestate == GAMESTATE.RUNNING) {
            this.gamestate = GAMESTATE.PAUSED;
        } else {
            return;
        }
    }
}
export default class InputeHandler {
    constructor(game,  paddle) {
        document.addEventListener("keydown", event => {
            // alert(event.keyCode);
            switch(event.keyCode) {
                case 37: 
                    paddle.moveLeft();
                    break;
                case 39: 
                    paddle.moveRight();
                    break;
                case 27:
                    game.togglePause();
                    break;
                case 32:
                    if(game.gamestate == 1) return;
                    game.start();
                    break;
            }
        })

        document.addEventListener("keyup", event => {
            switch(event.keyCode) {
                case 37: 
                    if(paddle.speed < 0) paddle.stop();
                    break;
                case 39: 
                    if(paddle.speed > 0) paddle.stop();
                    break;
            }
        })

    }
}
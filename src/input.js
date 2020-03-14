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
                    if(game.gamestate == 5) {
                        return;
                    } else if(game.gamestate == 0 || game.gamestate == 1){
                        game.togglePause();
                        return;
                    }
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
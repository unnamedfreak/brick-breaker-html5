export function detectCollision(ball, gameObj) {
    let ballTop = ball.position.y;
    let ballBottom = ball.position.y + ball.size;
    let ballLeft = ball.position.x;
    let ballRight = ball.position.x + ball.size;

    let gameObjTop = gameObj.position.y;
    let gameObjBottom = gameObj.position.y+gameObj.height
    let gameObjLeft = gameObj.position.x;
    let gameObjRight = gameObj.position.x + gameObj.width;

    if(ballBottom >= gameObjTop && 
        ballTop <= gameObjBottom &&
        ballLeft >= gameObjLeft && 
        ballRight <= gameObjRight) {
        return true;
    } else {
        return false;
    }
}